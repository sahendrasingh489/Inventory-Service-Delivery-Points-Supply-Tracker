from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas
from sqlalchemy import func
from datetime import datetime
from sqlalchemy import func
from datetime import date
import models
from models import Product


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ******************* Authentication & User Management ***********************

# password hash
def hash_password(password: str):
    return pwd_context.hash(password)

# verify password
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# create user
def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)

    db_user = models.User(
        username=user.username,
        password=hashed_password,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# login
def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user




# ******************** Product Management ***********************


# CREATE
def create_product(db: Session, product: schemas.ProductCreate, user_id: int):
    db_product = models.Product(
        name=product.name,
        sku=product.sku,
        category=product.category,
        price=product.price,
        stock=product.stock,
        supplier=product.supplier,
        status=product.status
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    create_audit_log(db, user_id, "CREATE", "products", db_product.id)

    return db_product





def get_products(db: Session):
    return db.query(Product).all()



# UPDATE
def update_product(db: Session, product_id: int, product: schemas.ProductUpdate, user_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not db_product:
        return None

    db_product.name = product.name
    db_product.sku = product.sku
    db_product.category = product.category
    db_product.price = product.price
    db_product.stock = product.stock
    db_product.supplier = product.supplier
    db_product.status = product.status

    db.commit()
    db.refresh(db_product)

    create_audit_log(db, user_id, "UPDATE", "products", product_id)

    return db_product


# DELETE
def delete_product(db: Session, product_id: int, user_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not db_product:
        return None

    db.delete(db_product)
    db.commit()

    create_audit_log(db, user_id, "DELETE", "products", product_id)

    return {"msg": "Deleted"}


def get_audit_logs(db: Session):
    return db.query(models.AuditLog).all()





# ******************** Location Management ***********************


def create_location(db: Session, location: schemas.LocationCreate, user_id: int):
    db_location = models.Location(
        name=location.name,
        address=location.address
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    create_audit_log(db, user_id, "CREATE", "locations", db_location.id)
    return db_location

def get_locations(db: Session):
    return db.query(models.Location).all()

def update_location(db: Session, location_id: int, location: schemas.LocationUpdate, user_id: int):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()

    if not db_location:
        return None

    db_location.name = location.name
    db_location.address = location.address

    db.commit()
    db.refresh(db_location)
    create_audit_log(db, user_id, "UPDATE", "locations", location_id)
    return db_location

def delete_location(db: Session, location_id: int, user_id: int):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()

    if not db_location:
        return None

    create_audit_log(db, user_id, "DELETE", "locations", location_id)

    db.delete(db_location)
    db.commit()
    return {"msg": "Deleted"}




# ********************* Supply Management ***********************

def get_product_stock(db: Session, product_id: int):
    total_supply = db.query(func.sum(models.Supply.quantity))\
        .filter(models.Supply.product_id == product_id)\
        .scalar()

    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    return {
        "product": product.name,
        "initial_stock": product.quantity,
        "supplied": total_supply or 0,
        "remaining": product.quantity - (total_supply or 0)
    }


def create_supply(db: Session, supply: schemas.SupplyCreate, user_id: int):
# def create_supply(db: Session, supply: schemas.SupplyCreate):
    stock = get_product_stock(db, supply.product_id)

    # ❌ Over supply
    if supply.quantity > stock["remaining"]:
        create_alert(db, "Over supply attempted ❌", supply.product_id)
        raise Exception("Not enough stock")

    db_supply = models.Supply(
        product_id=supply.product_id,
        location_id=supply.location_id,
        quantity=supply.quantity
    )

    db.add(db_supply)
    db.commit()
    db.refresh(db_supply)

    # ⚠️ Low stock
    new_stock = stock["remaining"] - supply.quantity

    if new_stock < 10:
        create_alert(db, "Low stock warning ⚠️", supply.product_id)

    create_audit_log(db, user_id, "CREATE", "supplies", db_supply.id)

    return db_supply



def get_supplies(db: Session):
    return db.query(models.Supply).all()




# ********************* Alert Management ***********************

def create_alert(db: Session, message: str, product_id: int):
    alert = models.Alert(
        message=message,
        product_id=product_id,
        created_at=str(datetime.utcnow())
    )
    db.add(alert)
    db.commit()


def get_alerts(db: Session):
    return db.query(models.Alert).all()



def search_supplies(db: Session, product=None, location=None, start_date=None, end_date=None):
    query = db.query(models.Supply)\
        .join(models.Product)\
        .join(models.Location)

    if product:
        query = query.filter(models.Product.name.ilike(f"%{product}%"))

    if location:
        query = query.filter(models.Location.name.ilike(f"%{location}%"))

    if start_date and end_date:
        query = query.filter(models.Supply.created_at.between(start_date, end_date))

    return query.all()






def get_daily_report(db: Session):
    today = date.today()

    total = db.query(func.count(models.Supply.id))\
        .filter(func.date(models.Supply.created_at) == today)\
        .scalar()

    return {
        "total_supplies_today": total or 0
    }




def get_monthly_report(db: Session):
    now = datetime.now()

    total = db.query(func.count(models.Supply.id))\
        .filter(func.extract('month', models.Supply.created_at) == now.month)\
        .scalar()

    return {
        "total_supplies_month": total or 0
    }





def top_products(db):
    data = db.query(
        models.Product.name,
        func.sum(models.Supply.quantity)
    ).join(models.Supply, models.Product.id == models.Supply.product_id)\
     .group_by(models.Product.name)\
     .all()

    return [
        {"product": name, "total": total}
        for name, total in data
    ]


def create_audit_log(db: Session, user_id, action, table, record_id):
    log = models.AuditLog(
        user_id=user_id,
        action=action,
        table_name=table,
        record_id=record_id
    )
    db.add(log)
    db.commit()






from models import Branch

def get_branches(db: Session):
    return db.query(Branch).all()

def create_branch(db: Session, branch):
    db_branch = Branch(**branch.dict())
    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)
    return db_branch

def delete_branch(db: Session, id: int):
    branch = db.query(Branch).filter(Branch.id == id).first()
    if branch:
        db.delete(branch)
        db.commit()
        return True
    return False