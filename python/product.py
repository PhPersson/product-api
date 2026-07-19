
class Product:
    def __init__(self,id, name, price, productType, isInStock):
        self.id = id
        self.name = name
        self.price = price
        self.productType = productType
        self.isInStock = isInStock

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price
        }

from enum import Enum
class ProductType(Enum):
    TECH = 1
    FOOD = 2
    TOY = 3