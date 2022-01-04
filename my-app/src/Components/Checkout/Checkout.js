import React, { Component } from 'react';
import './Checkout.css'
import axios from 'axios';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []

        }

        this.getCartItems = this.getCartItems.bind(this);
    }

    componentDidMount(){
        this.getCartItems()
    }

    getCartItems(){
        axios.get('/api/getCartItems')
        .then( res => {
            this.setState({ cartItems : res.data})
        }).catch( err => {
            console.log(`Error:${err}`)
        })
    }

    checkoutInc = (product) => {
        const exist = this.cartItems.find((x) => x.id === product.id);
      
        if(exist){
          this.setState({ cartItems:
            this.cartItems.map((x) =>
              x.id === product.id ? { ...exist, quantity: exist.quantity += 1 } : x
            )
          });
        }
    }

    checkoutDec = (product) => {
        const exist = this.cartItems.find((x) => x.id === product.id);
        
      
        if(exist && product.quantity > 0){
          this.setState({ cartItems:
            this.cartItems.map((x) =>
              x.id === product.id ? { ...exist, quantity: exist.quantity -= 1 } : x
            )
          });
        }
        if(exist && product.quantity === 0){
          let copy = this.cartItems;
          copy.splice(copy.indexOf(product), 1)
          this.setState({ cartItems:
            this.cartItems.map((x) =>
              x.id === product.id ? { copy } : x
            )
          });
        }
    }


    checkoutClear = () => {
        this.setState({
            cartItems: []
        })
    }


    checkoutRemove = (product) => {
        const exist = this.cartItems.find((x) => x.id === product.id);
      
        if(exist){
          let copy = this.cartItems;
          copy.splice(copy.indexOf(product), 1)
          console.log(copy)
          this.setState({ cartItems:
            this.cartItems.map((x) =>
              x.id === product.id ? {copy}  : x
            )
          });
        }
        console.log(this.cartItems)
    }







    render(){
        return (
            <div className = "Checkout-container">
                <p className="welcome-to-checkout">Welcome to Checkout, Roman!</p>

                <div className="checkout-products-container">
                    
                    <div className="checkout-products">
                        <p>products list</p>
                        
                    </div>
                


                    <div className="checkout-price-container">
                        <p>checkout price table</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Checkout;