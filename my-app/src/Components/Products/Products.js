import React, { Component } from 'react';
import axios from 'axios';
import './Products.css'


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            cartItems: [],
            

        }
        
        this.getProducts = this.getProducts.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.quantityInc = this.quantityInc.bind(this);
        this.quantityDec = this.quantityDec.bind(this);
        this.onAdd = this.onAdd.bind(this)
    }


    componentDidMount(){
        this.getProducts()
        this.getCartItems()
        
 
    }


    

     getProducts(){
        axios.get('/api/products')
        .then( res  => {
            this.setState({products: res.data})

        }).catch( err => {
            console.log(`Error:${err}`)
        })

        
    }

    getCartItems(){
        axios.get('/api/cartItems')
        .then( res => {
            this.setState({ cartItems : res.data})
        }).catch( err => {
            console.log(`Error:${err}`)
        })
    }

    quantityInc = (product) => {
        product.product_quantity += 1
        let copy = [...this.state.products]
        this.setState({ 
            products: copy
        })
        let button = document.getElementsByClassName('AddToCart')
        if  (product.product_quantity > 0){
            button[product.id - 1].style.display='inline-block'
            } 
        console.log(product, product.id)
      }


    quantityDec = (product) => {
        if(product.product_quantity > 0){
          product.product_quantity -= 1
          let copy = [...this.state.products]
            this.setState({ 
            products: copy
            })

        }
        let button = document.getElementsByClassName('AddToCart')
      
        if  (product.product_quantity === 0){
            button[product.id - 1].style.display='none'
            
            } 
        console.log(product)
        
    }

    onAdd = (product) => {
        
        const exist = this.state.cartItems.find(x => x.id === product.id);

        
        if (exist){

            axios.post('/api/updateExistingProduct', product)
            .then(()=> 
                console.log('axios post updated checkout products')
            )
        }
        
          
            axios.post('/api/inputProduct', product)
            .then(()=> {
                this.getCartItems()
                console.log('axios input Product added')
            })
        


        product.product_quantity = 0
        let button = document.getElementsByClassName('AddToCart')
        button[product.id-1].style.display='none'

            
        
        
    


    };
    





    render(){
        const {cartItems} = this.state;
        const itemsPrice = cartItems.reduce((a,c)=> a + c.price * c.price, 0)
        const totalPrice = itemsPrice;

        let array = this.state.products.map((product, index) => {
            
            return <div className = 'product' key={index}> 
                <img className = 'product-image' src= {product.product_image} alt='bro'/>

                <sub className = 'product-name'>{product.product_name} 
                
                <div className ="product-price"><center>{`$${product.product_price}`}</center></div>
                
                </sub>
                


                <div className ="product-button-container">

                <button className="quantity-" onClick={()=> this.quantityDec(product)}>Quantity -</button>

                <div className ="quantityCounter">{product.product_quantity}</div>
                
                <button className="quantity+" onClick={()=> this.quantityInc(product)}>Quantity +</button>

                </div>

                <button className="AddToCart" onClick = {()=> this.onAdd(product)}>Add To Cart</button>
                


            </div>
            
        })



        return (
            <div className = 'all-products-container'>
                <div className= 'products'>
                    {array}
                </div>
            </div>
        )
    }
}

export default Products;