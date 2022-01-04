import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser, logout} from '../../redux/reducer'
import './Nav.css';


class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            errorMsg: '',
            user:false
        }

        this.myFunctionLogin= this.myFunctionLogin.bind(this)
        this.myFunctionRegister = this.myFunctionRegister.bind(this)
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }


    componentDidMount(){
      this.getUser()
      axios.get('/api/auth/me')
      .then(res => {
        console.log(res.data)
        if(res.data){
          this.setState({user:true})
        }
      })

    }

    getUser() {
      axios.get('/api/auth/me')
      .then( ({data}) => this.props.updateUser(data) )
    }


    handleChange(prop, val) {
        this.setState({
          [prop]: val
        })
      }
    
      logout() {
        axios.post('/api/auth/logout')
          .then(_ => this.props.logout)
          
      }

      login() {
        axios.post('/api/auth/login', this.state)
          .then(res => {
            this.props.updateUser(res.data)
            this.myFunctionLogin()
            
          })
          .catch(err => {
            console.log(err)
            this.setState({errorMsg: 'Incorrect username or password!'})
          })
      }
    
      register() {
        axios.post('/api/auth/register', this.state)
          .then(res => {
            this.props.updateUser(res.data)
            if(res.data){
              this.myFunctionRegister()
            }
          
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



    
    myFunctionLogin() {

        this.setState({
        username: '',
        firstname: '',
        lastname: '',
        password: ''
        })

        var x = document.getElementById("myDropdownLogin")
        var y = document.getElementById("myDropdownRegister")
        console.log('myfunctionLogin fired off')
        
        
        if(x.style.display === "none"){
            x.style.display = "inline-block"
            y.style.display = "none"
        } else  x.style.display = "none"

    }

      myFunctionRegister() {

        this.setState({
            username: '',
            firstname: '',
            lastname: '',
            password: ''
        })

        var x = document.getElementById("myDropdownRegister")
        var y = document.getElementById("myDropdownLogin")
        console.log('myfunctionRegister fired off')
        
        if(x.style.display === "none"){
            x.style.display = "inline-block"
            y.style.display = "none"
        } 
        else x.style.display = "none"
      }


      
    render(){
        let { user} = this.state
        let userLogin = 

        <div className = 'login-container'>
        <button onClick={()=>this.myFunctionLogin()} className = 'login-button'>Login</button>
        <button onClick={()=> this.myFunctionRegister()}className='register-button'>Register</button>

        <div className="dropdownlogin">

            <div id="myDropdownLogin" className="dropdown-content-login">
                <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} className="username-login-input"placeholder="Username"></input>
                <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} className="password-login-input"placeholder="Password"></input>
                <button className = "dropdown-login-button" onClick={_ => this.setState({user:true},this.login)}>Log In</button>

            </div>


            <div id = "myDropdownRegister"className="dropdown-content-register">
            <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} className="username-register-input" placeholder ="Username"></input>
            <input value={this.state.firstname} onChange={e => this.handleChange('firstname', e.target.value)} className="fistname-register-input" placeholder ="First Name"></input>
            <input value={this.state.lastname} onChange={e => this.handleChange('lastname', e.target.value)} className="lastname-register-input" placeholder ="Last Name"></input>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} className="password-register-input" placeholder ="Password"></input>
            <button className = "dropdown-register-button" onClick={_ => this.setState({user:true}, this.register)}>Register</button>

            </div>

        </div>



    </div>



        return (
            <div className= 'nav'>
                <h1 className='nav-title'>|MECH TECH SALES|</h1>
                <div className= 'nav-profile-container'>
                    <div className= 'nav-profile-pic'>
                        <img src='https://robohash.org/$%7Busername%7D.png' alt='Profile Pic' width="100" height="100"></img>
                                {!user
                                    ?
                                    userLogin
                                   : <div className="welcome-user-logout-container">
                                   <p className="welcome-text-logout">{`Welcome, ${this.props.username}`}</p>
                                   <button className="logout-button" onClick ={_ => this.setState({user:false}, this.logout)}>Logout</button>
                               </div>

                                   }



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