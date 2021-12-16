import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser, logout } from '../../redux/reducer'
import './Nav.css';


class Nav extends Component {
    constructor(props) {
        super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    }


    componentDidMount() {
    this.getUser()
    }


    getUser() {
        axios.get('/api/auth/me')
        .then( ({data}) => this.props.updateUser(data) )
    }
    
    logout() {
        axios.post('/api/auth/logout')
        .then(_ => this.props.logout)
    }






    render(){
        return (
            <div className= 'nav'>
                <div className= 'nav-profile-container'>
                    <div className= 'nav-profile-pic'>
                        <img src='https://robohash.org/$%7Busername%7D.png' alt='Profile Picture' width="100" height="100"></img>
                        <p className='nav-username'>Username</p>
                        
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