import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'



function Products() {

const [products, setProducts] = useState([]);
const [cartItems, setCartItems] = useState([]);




function getProducts(){
    console.log('getProdcutsFired')
    axios.get('/api/products')
    .then( res => {
        setProducts(res.data)
    }).catch( err => {
        console.log(`Error:${err}`)
    })
}



    function getCartItems(){
        console.log('getCartItemsFired')
        axios.get('/api/cartItems')
        .then( res => {
            setCartItems(res.data)
        }).catch( err => {
            console.log(`Error:${err}`)
        })
    }

    const quantityInc = (product) => {
        product.product_quantity += 1
        console.log(product.id, product.product_quantity)
        setProducts(current => [...current])
        let button = document.getElementsByClassName('AddToCart')
        if  (product.product_quantity > 0){
            button[product.id -1].style.display='inline-block'
            } 
        console.log(product, product.id)
    }


    const quantityDec = (product) => {
        if(product.product_quantity > 0){
            product.product_quantity -= 1
            setProducts(current => [...current])

        }
        let button = document.getElementsByClassName('AddToCart')
    
        if  (product.product_quantity === 0){
            button[product.id - 1].style.display='none'
            
            } 
        
        
    }

    const onAdd = (product) => {
        
        const exist = cartItems.find(x => x.product_id === product.id);



        if (exist){
            console.log(exist)
            
            product.product_quantity += exist.product_quantity
            
            axios.post('/api/updateExistingProduct', product)
            .then(()=>{
                getCartItems()
                console.log('axios post updated checkout products')
            })
        } else {
            axios.post('/api/inputProduct', product)
            .then(()=> {
                getCartItems()
                console.log('axios input Product added')
            })
        }
        


        product.product_quantity = 0
        let button = document.getElementsByClassName('AddToCart')
        button[product.id-1].style.display='none'

            
        
        
    


    };
    


    let array = products.map((product, index) => {
            
    return <div className = 'product' key={index}> 
                <img className = 'product-image' src= {product.product_image} alt='product-i'/>

                <sub className = 'product-name'>{product.product_name} 
                
                <div className ="product-price"><center>{`$${product.product_price}`}</center></div>
                
                </sub>
                


                <div className ="product-button-container">

                <button className="quantity-" onClick={()=> quantityDec(product)}>Quantity -</button>

                <div className ="quantityCounter">{product.product_quantity}</div>
                
                <button className="quantity+" onClick={()=> quantityInc(product)}>Quantity +</button>

                </div>

                <button className="AddToCart" onClick = {()=> onAdd(product)}>Add To Cart</button>
                


            </div>
            
        })


    useEffect(()=> {
        getCartItems()
        getProducts()
        console.log(cartItems)
    },[])





        return (
            <div className = 'all-products-container'>
                <div className= 'products'>
                    {array}
                </div>
            </div>
        )
    
}

export default Products;