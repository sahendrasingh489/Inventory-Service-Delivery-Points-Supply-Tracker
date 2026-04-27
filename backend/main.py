from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import models
import crud, schemas
from jose import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware

from models import Product



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token ❌")



app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# JWT config
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=2)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



# ********************* User Management ***********************

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, form_data.username, form_data.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({
        "sub": db_user.username,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }



# *********************** Dashboard ***********************

from sqlalchemy import func
import models

@app.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    total_products = db.query(models.Product).count()
    low_stock = db.query(models.Product).filter(models.Product.stock <= 20).count()
    out_of_stock = db.query(models.Product).filter(models.Product.stock == 0).count()
    in_stock = total_products - low_stock - out_of_stock

    return {
        "total_products": total_products,
        "low_stock": low_stock,
        "out_of_stock": out_of_stock,
        "in_stock": in_stock
    }






# ********************** Product Management ***********************

# ➕ CREATE
@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    user_id = 1
    return crud.create_product(db, product, user_id)


# 📦 GET ALL
@app.get("/products", response_model=list[schemas.Product])
def get_products(db: Session = Depends(get_db)):
    return crud.get_products(db)


# ✏️ UPDATE
@app.put("/products/{id}", response_model=schemas.Product)
def update_product(id: int, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    user_id = 1
    updated = crud.update_product(db, id, product, user_id)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated


# ❌ DELETE
@app.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    user_id = 1
    deleted = crud.delete_product(db, id, user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}




# *********************** Location Management ***********************

@app.post("/locations")
def create_location(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    return crud.create_location(db, location)

@app.get("/locations")
def get_locations(db: Session = Depends(get_db)):
    return crud.get_locations(db)

@app.put("/locations/{id}")
def update_location(id: int, location: schemas.LocationUpdate, db: Session = Depends(get_db)):
    return crud.update_location(db, id, location)

@app.delete("/locations/{id}")
def delete_location(id: int, db: Session = Depends(get_db)):
    return crud.delete_location(db, id)




# ************************ Supply Management ***********************

@app.post("/supplies")
def create_supply(supply: schemas.SupplyCreate, db: Session = Depends(get_db)):
    return crud.create_supply(db, supply)

@app.get("/supplies")
def get_supplies(db: Session = Depends(get_db)):
    return crud.get_supplies(db)



# ************************ Alert Management ***********************

@app.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return crud.get_alerts(db)



# *********************** Search & Reports ***********************
@app.get("/search")
def search(
    product: str = None,
    location: str = None,
    start_date: str = None,
    end_date: str = None,
    db: Session = Depends(get_db)
):
    return crud.search_supplies(db, product, location, start_date, end_date)



@app.get("/reports/daily")
def daily_report(db: Session = Depends(get_db)):
    return crud.get_daily_report(db)



@app.get("/reports/monthly")
def monthly_report(db: Session = Depends(get_db)):
    return crud.get_monthly_report(db)


@app.get("/reports/top-products")
def top(db: Session = Depends(get_db)):
    return crud.top_products(db)



@app.get("/audit-logs")
def get_logs(db: Session = Depends(get_db)):
    return crud.get_audit_logs(db)




# **************** Branch Management ***********************

@app.get("/branches", response_model=list[schemas.Branch])
def get_branches(db: Session = Depends(get_db)):
    return crud.get_branches(db)


@app.post("/branches", response_model=schemas.Branch)
def create_branch(branch: schemas.BranchCreate, db: Session = Depends(get_db)):
    return crud.create_branch(db, branch)


@app.delete("/branches/{id}")
def delete_branch(id: int, db: Session = Depends(get_db)):
    success = crud.delete_branch(db, id)

    if not success:
        raise HTTPException(status_code=404, detail="Branch not found")

    return {"message": "Deleted"}