module.exports = {
    getProducts: async (req,res) => {
        const db = req.app.get('db')
        const result = await db.products.getProducts();
        return res.status(200).send(result)
    }
}