import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Home.css';



class Home extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            products: []
        }
        
    }


    


    render(){
        return ( 
            <div className = 'Home-container'>
                <div className='escape-container'>
                    <div className='escape-text'>Escape...</div> 
                    <div className='escape-2nd-text'><span>into amazing tech sales!!!</span></div>
                </div>
                <div className = 'preview-image-container'>
                <img src = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/958135/d4cb66f4d75b0b751877b380db2df096bd461741.jpg" className = 'preview-pic2' alt ='pic1'></img>
                <img src = "https://cdn.pocket-lint.com/r/s/1200x/assets/images/158992-gadgets-news-save-big-on-portable-power-stations-with-ecoflow-s-christmas-sale-image22-6k2herpvw3.jpg" className = 'preview-pic1' alt='pic2'></img>
                </div>
                <div className = "products-container">
                    <h1 className='featured-items'>Featured Items</h1>
                    <div className='featured-products'>{this.products}</div>

                </div>
                <Link to='/products'><button className = 'more-items-button'>SHOP MORE ↓</button></Link>
                

                
            </div>
        )
    }
}

export default Home