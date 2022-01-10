require('dotenv').config();
const express = require('express');
const {register, login, getUser, logout, updateUsername} = require('./controllers/user');
const {getProducts, getCartItems, inputProduct, updateExistingProduct, deleteProductCheckout, clearCheckout} = require('./controllers/products.js')
const massive = require('massive');
const session = require('express-session');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;



const app = express();

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
app.post('/api/checkoutCart', clearCheckout)
app.post('/api/updateUsername', updateUsername);



app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));