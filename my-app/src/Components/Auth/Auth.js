import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Auth.css';
import { updateUser } from '../../redux/reducer';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login() {
        axios.post('/api/auth/login', this.state)
        .then(res => {
            this.props.history.push('/')
            this.props.updateUser(res.data)
        })
        .catch(err => {
            console.log(err)
            this.setState({errorMsg: 'Incorrect username or password!'})
        })
    }

    register() {
        axios.post('/api/auth/register', this.state)
        .then(res => {
            this.props.history.push('/')
            this.props.updateUser(res.data)
        })
        .catch(err => {
            console.log(err)
            this.setState({errorMsg: 'Username taken!'})
        })
    }

    closeErrorMessage = () => {
        this.setState({
        errorMsg: false, 
        username: '', 
        password: ''
        })
    }





    render(){
        return (
            <div className = 'auth'>
                <div className = 'auth-container'>

                </div>
                
            </div>
        )
    }
}

export default connect(null, { updateUser})(Auth);