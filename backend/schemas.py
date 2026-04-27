from pydantic import BaseModel
from pydantic import BaseModel, Field




# ************************ User Management ***********************

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "user"

class UserLogin(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True




# *********************** Product Management ***********************

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    sku: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    supplier: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

from pydantic import BaseModel

class Product(BaseModel):
    id: int
    name: str
    sku: str
    category: str
    price: float
    stock: int
    supplier: str
    status: str

    # class Config:
    #     orm_mode = True

    class Config:
        from_attributes = True



# *********************** Location Management ***********************

class LocationBase(BaseModel):
    name: str
    address: str

class LocationCreate(LocationBase):
    pass

class LocationUpdate(LocationBase):
    pass

class Location(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        from_attributes = True


# ************************ Supply Management ***********************

class SupplyBase(BaseModel):
    product_id: int
    location_id: int
    quantity: int

class SupplyCreate(SupplyBase):
    pass

class Supply(BaseModel):
    id: int
    product_id: int
    location_id: int
    quantity: int
    created_at: str

    class Config:
        from_attributes = True



# *********************** Alert Management ***********************

class Alert(BaseModel):
    id: int
    message: str
    product_id: int
    created_at: str

    class Config:
        from_attributes = True


# ************************ Branch Management ***********************


class BranchBase(BaseModel):
    name: str
    location: str

class BranchCreate(BranchBase):
    pass

class Branch(BranchBase):
    id: int

    class Config:
        orm_mode = True
