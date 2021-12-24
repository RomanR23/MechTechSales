import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser, logout, register } from '../../redux/reducer'
import './Nav.css';


class Nav extends Component {
    constructor(props) {
        super(props);


    }






    render(){
        return (
            <div className= 'nav'>
                <h1 className='nav-title'>|MECH TECH SALES|</h1>
                <div className= 'nav-profile-container'>
                    <div className= 'nav-profile-pic'>
                        <img src='https://robohash.org/$%7Busername%7D.png' alt='Profile Pic' width="100" height="100"></img>
                        <div className = 'login-container'>
                        <button className = 'login-button'>Login</button>
                        <button className='register-button'>Register</button>
                        </div>
                    </div>
                </div>

                <div className='nav-links'>
                        <Link to='/settings'><button className = 'nav-button'>Settings</button></Link>
                        <Link to='/products'><button className = 'nav-button'>Products</button></Link>
                        <Link to='/checkout'><button className = 'nav-button'>Checkout</button></Link>
                        <Link to='/home'><button className = 'nav-button'>Home</button></Link>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  }

  export default withRouter(connect(mapStateToProps, {logout, updateUser})(Nav));