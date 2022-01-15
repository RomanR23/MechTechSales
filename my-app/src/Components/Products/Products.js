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
        setProducts(current => [...current])
        let button = document.getElementsByClassName('AddToCart')
        if  (product.product_quantity > 0){
            button[product.id -1].style.display='inline-block'
            } 
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

            product.product_quantity += exist.product_quantity
            axios.post('/api/updateExistingProduct', product)
            .then(()=>{
                getCartItems()
            })
        } else {
            axios.post('/api/inputProduct', product)
            .then(()=> {
                getCartItems()
            })
        }
        
        product.product_quantity = 0
        let button = document.getElementsByClassName('AddToCart')
        button[product.id-1].style.display='none'

    };
    


    let array = products.map((product, index) => {
            
    return <div className = 'indv-product-div' key={index}>

                <div>
                <img className = 'product-image-products' src= {product.product_image} alt='product-i'/>
                </div>

                <div className = 'product-name-prodcuts'>{product.product_name} </div>
                
                <div className ="product-price-products">{`$${product.product_price}`}</div>
                
                
                


                    <div className ="indv-product-button-container">

                        <button className="indv-quantity" onClick={()=> quantityDec(product)}>-</button>

                        <div className ="quantityCounter">{product.product_quantity}</div>
                
                        <button className="indv-quantity" onClick={()=> quantityInc(product)}>+</button>
                    </div>

                <div>
                <button className="AddToCart" onClick = {()=> onAdd(product)}>Add To Cart</button>
                </div>
                
                


            </div>
            
        })


    useEffect(()=> {
        getCartItems()
        getProducts()
    },[])





        return (
            <div className = 'all-products-container'>
                <div className= 'products-all-return'>
                    {array}
                </div>
            </div>
        )
    
}

export default Products;