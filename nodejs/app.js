import express from 'express'
import { getAllProducts, getProduct, createProduct } from './database.js'

var app = express()
app.use(express.json())

// Returns a list of all products.
app.get('/api/products', async (req, res, next) => {
    try {
        var products = await getAllProducts();
        return res.json(products);
    } catch (err) {
        return next(err);
    }
});

// GET /api/product/:id
// Returns a single product
app.get('/api/product/:id', async (req, res, next) => {
    try {
        var id = req.params.id
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Invalid product id' })
        }
        var product = await getProduct(id)
        if (!product) return res.status(404).json({ error: 'Product not found' })
        return res.json(product)
    } catch (err) {
        return next(err)
    }
})

// CREATE product
app.post('/api/product', async (req, res, next) => {
    try {
        var { name, price, supplier_id } = req.body
        if (!name || !price || isNaN(price)) {
            return res.status(400).json({ error: 'Invalid product data' })
        }
        if (supplier_id && isNaN(supplier_id)) {
            return res.status(400).json({ error: 'Invalid supplier id' })
        }
        var product = await createProduct({ name, price, supplier_id })
        return res.status(201).json({
            message: 'Created product successfully',
            product_id: product.insertId
        })
    } catch (err) {
    
        return next(err)
    }
})


app.use((err, res,next) => {
    console.error(err && err.stack ? err.stack : err)
    res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})