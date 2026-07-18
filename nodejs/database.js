import mysql from 'mysql2'
import dotenv from 'dotenv'


// Load .env variables
dotenv.config()

const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise()


/**
 * Fetch all products from the database.
 */
export async function getAllProducts() {
    try {
        const [products] = await database.query(`
            SELECT product_id, product_name, price
            FROM products
        `)
        return products
    } catch (err) {
        console.error('getAllProducts error:', err)
        throw err;
    }
}


/**
 * Fetch a single product by id.
 */
export async function getProduct(productId) {
    try {
        const [product] = await database.query(
            `SELECT product_id, product_name, price
             FROM products 
             WHERE product_id = ?`,
            [productId]
        )
        return product
    } catch (err) {
        console.error('getProduct error:', err)
        throw err;
    }
}
export async function createProduct({ name, price, supplier_id }) {
    try {
        const [result] = await database.query(
            `INSERT INTO products (product_name, price, supplier_id)
             VALUES (?, ?, ?)`,
            [name, price, supplier_id]
        )
        return result
    } catch (err) {
        console.error('createProduct error:', err)
        throw err;
    }
}