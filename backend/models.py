from sqlalchemy import Column, Float, Integer, String
from database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import Column, DateTime
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float   


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="user")





class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    sku = Column(String)
    category = Column(String)
    price = Column(Float)
    stock = Column(Integer)
    supplier = Column(String)
    status = Column(String)




class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)





class Supply(Base):
    __tablename__ = "supplies"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    quantity = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow())

    product = relationship("Product")
    location = relationship("Location")



class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    product_id = Column(Integer)
    created_at = Column(String)




from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    action = Column(String)
    table_name = Column(String)
    record_id = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)  # ✅ IMPORTANT FIX





class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)