require('dotenv').config();
const express = require('express');
const {register, login, getUser, logout, updateUsername,updateFirstname,updateLastname, updatePassword} = require('./controllers/user');
const {getProducts, getCartItems, inputProduct, updateExistingProduct, deleteProductCheckout, clearCheckout, updateExistingProductCheckout} = require('./controllers/products');
const massive = require('massive');
const session = require('express-session');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;



const app = express();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then(db => {
    console.log('DB SETUP SUCCESSFUL')
    app.set('db',db);
}).catch( err => {
    console.log('DB SETUP FAILED, ERROR:', err)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized:true,
    cookie : {
        maxAge: 1000*60*60*24
    }
}))

const storeItems = new Map([
    [1, {priceInCents: 54999, name: 'MSI GeForce RTX 2070'}],
    [2, {priceInCents: 44999, name: 'ASUS ROG Crosshair VIII'}],
    [3, {priceInCents: 98999, name: 'SAMSUNG Odyssey G9'}],
    [4, {priceInCents: 11099, name: 'Corsair iCUE 4000x RGB'}],
    [5, {priceInCents: 6999, name: 'AUKEY Mechanical Gaming Keyboard'}],
    [6, {priceInCents: 9499, name: 'Logitech G502 LIGHTSPEED Mouse'}],
    [7, {priceInCents: 13499, name: 'CORSAIR Vengeance RGB Pro 32GB'}],
    [8, {priceInCents: 2199, name: 'AUKEY RGB Gaming Mouse Pad'}],
    [9, {priceInCents: 12999, name: 'EVGA SuperNOVA 1000 GT'}],
    [10, {priceInCents: 4699, name: 'Dual Monitor Stand Mount Kit'}],
    [11, {priceInCents: 2999, name: 'TaoTronics LED Desk Lamp'}],
    [12, {priceInCents: 25999, name: 'AMD Ryzen 5 5600G Series'}],
    
])


app.use(express.json());
app.get('/api/products', getProducts);
app.get('/api/cartItems', getCartItems);
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', getUser);
app.post('/api/auth/logout', logout);
app.post('/api/inputProduct', inputProduct);
app.post('/api/updateExistingProduct', updateExistingProduct);
app.post('/api/deleteProductCheckout', deleteProductCheckout)
app.delete('/api/checkoutCart', clearCheckout)
app.post('/api/updateUsername', updateUsername);
app.post('/api/updateFirstname', updateFirstname);
app.post('/api/updateLastname', updateLastname);
app.post('/api/updatePassword', updatePassword);
app.post('/api/updateExistingProductCheckout', updateExistingProductCheckout);


app.post('/create-checkout-session', async (req,res) => {

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/home` ,
            cancel_url: `${process.env.CLIENT_URL}/checkout`,
        })
        res.json({url: session.url})
    } catch (e) {
        res.status(500).json({ error : e.message })
    }
})



app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));