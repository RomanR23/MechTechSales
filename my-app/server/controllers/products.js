module.exports = {
    getProducts: async (req, res) => {
        const db = req.app.get('db')
        const result = await db.products.getProducts();
        res.status(200).send(result)
    },

    getCartItems: async (req,res) => {
        const db = req.app.get('db')
        const cartItems = await db.products.getCartItems();
        res.status(200).send(cartItems)
    },

    inputProduct: async (req,res)=> {
        const { product_name , product_price , product_quantity, product_image } = req.body
        const db = req.app.get('db')
        const date = new Date();
        const { id } = req.session.user || 0
        const newItem = await db.products.inputProduct([product_name , product_price , product_quantity, product_image, id, date]);
        res.status(200).send(newItem)
    },

    updateExistingProduct: async (req,res) => {
        const { id, product_quantity } = req.body
        const db = req.app.get('db')
        const updatedProduct = await db.products.updateExistingProduct([ id, product_quantity])
        res.status(200).send(updatedProduct)
    }
}