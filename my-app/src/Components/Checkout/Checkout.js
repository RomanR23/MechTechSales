import React, { useState, useEffect } from 'react';
import './Checkout.css'
import axios from 'axios';



function Checkout(){

const [ cartItems, setCartItems ] = useState([]);
const [ cartPrice, setCartPrice ] = useState([]);




  // const checkoutInc = (product) => {
  //       const exist = this.cartItems.find((x) => x.id === product.id);
      
  //       if(exist){
  //         this.setState({ cartItems:
  //           this.cartItems.map((x) =>
  //             x.id === product.id ? { ...exist, quantity: exist.quantity += 1 } : x
  //           )
  //         });
  //       }
  //   }

  // const checkoutDec = (product) => {
  //       const exist = this.cartItems.find((x) => x.id === product.id);
        
      
  //       if(exist && product.quantity > 0){
  //         this.setState({ cartItems:
  //           this.cartItems.map((x) =>
  //             x.id === product.id ? { ...exist, quantity: exist.quantity -= 1 } : x
  //           )
  //         });
  //       }
  //       if(exist && product.quantity === 0){
  //         let copy = this.cartItems;
  //         copy.splice(copy.indexOf(product), 1)
  //         this.setState({ cartItems:
  //           this.cartItems.map((x) =>
  //             x.id === product.id ? { copy } : x
  //           )
  //         });
  //       }
  //   }


  const checkoutClear = () => {
  axios.post('/api/checkoutCart')
  .then(_ => {
    alert("Items Purchased! Please Come Again!")
    console.log('checkoutClear fired')
  })
  }


  const checkoutRemove = (product) => {
          axios.post('/api/deleteProductCheckout', product)
          .then(_ => console.log('checkoutremove api hit!'))
        
        console.log(product)
  }


  const cartArray = cartItems.map((product, index) => {
    return <div className="product-checkout" key={index}>

          <div className="logo-product-checkout">

            <img className="product-image-checkout"src={product.product_image} alt="product-image"></img>
            <sub>{product.product_name}</sub>

          </div>

          <div className="product-counter-checkout">
            <button className="product-quantity-button">-</button>
            <div>{product.product_quantity}</div>
            <button className="product-quantity-button">+</button>
            <button className="remove-item" onClick = {() => checkoutRemove(product)}>Remove Item</button>
          </div>
            

    </div>
  })

  const itemsPrice = cartItems.reduce((a,c) => a + c.product_quantity * c.product_price, 0);


  useEffect(()=> {
    axios.get('/api/cartItems')
    .then( res => {
      setCartItems(res.data)
    }).catch( err => {
      console.log(`Error:${err}`)
    })
  })




return (
            <div className = "Checkout-container">
                <p className="welcome-to-checkout">Welcome to Checkout, Roman!</p>

                <div className="checkout-products-container">
                    
                    <div className="checkout-products">
                        {cartArray}
                        
                    </div>
                


                    <div className="checkout-price-container">
                        <h1>Shopping Cart Total</h1>
                        <p>Shipping Cost: * FREE PROMO *</p>
                        <p>Cart Total: {itemsPrice.toFixed(2)}</p>
                        <button onClick ={()=> checkoutClear()}>Checkout & Pay</button>

                    </div>

                </div>
            </div>
        )
    
}

export default Checkout;