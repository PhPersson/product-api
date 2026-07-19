
from flask import Flask, jsonify, request
from product import Product, ProductType
app = Flask(__name__)

products = [
    Product(1, "Laptop", 1200, ProductType.TECH, True),
    Product(2, "Banana", 12, ProductType.FOOD, True),
    Product(3, "Bobby Cart", 500, ProductType.TOY, False),
]

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = next((product for product in products if product.id == id), None)

    if product is None:
        return jsonify({"error": "Product not found"}), 404

    return jsonify(product.to_dict())


@app.route('/products/', methods=['POST'])
def create_product():
    data = request.get_json()
    
    product = Product(
        id=len(products) + 1,
        name=data["name"],
        price=data["price"],
        productType=ProductType[data["productType"]],
        isInStock=data["isInStock"]
    )

    products.append(product)

    return jsonify(product.to_dict()), 201


@app.route('/products/', methods=['GET'])
def get_products():
    return jsonify([product.to_dict() for product in products])

if __name__ == '__main__':
    app.run(debug=True)