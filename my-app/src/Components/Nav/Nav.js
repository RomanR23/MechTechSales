import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Nav.css';


function Nav(){

const [user, setUser] = useState(false)
const [username, setUsername] = useState("")


function logout(){
    axios.post('/api/auth/logout')
    .then(_ => {
      alert("You Have Been Logged Out!")
      setUser(false)
    }).catch(err => {
    console.log(`Error: ${err}`)
    })
}

function getUser(){
  axios.get('/api/auth/me')
    .then(res => {
      if(res.data.username){
        setUser(true)
        setUsername(res.data.username)
      }
    }).catch(err => {
        console.log(`Error: ${err}`)
    })
}


  let userLogin = 
      <div className = 'login-container'>
          <Link to ='/login'><button className = 'login-button'>Login</button></Link>
          <Link to='/register'><button className='register-button'>Register</button></Link>
      </div>


  useEffect(() => {
    getUser()
  }, [username])


        return (
            <div className= 'nav'>
              <div classname='nav-title-box'>
              <h1 className='nav-title'>|MECH TECH SALES|</h1>
              </div>

                <div className='nav-links'>
                        <Link to='/settings'><button className = 'nav-button'>Settings</button></Link>
                        <Link to='/products'><button className = 'nav-button'>Products</button></Link>
                        <Link to='/checkout'><button className = 'nav-button'>Checkout</button></Link>
                        <Link to='/home'><button className = 'nav-button'>Home</button></Link>
                </div>


                <div className= 'nav-profile-container'>
                    <div>
                        <img className='nav-profile-pic'src='https://robohash.org/$%7Busername%7D.png' alt='Profile Pic' width="100" height="100"></img>
                          </div>
                                {!user
                                    ?
                                    userLogin
                                  : <div className="welcome-user-logout-container">
                                    <div>
                                  <p className="welcome-text-logout">{`Welcome, ${username}`}</p>
                                  </div>
                                  <button className="logout-button" onClick ={()=> logout()}>Logout</button>
                                    </div>
                                }
                    </div>
                </div> 
            
        )
    
}



const mapStateToProps = (state) => {
    return state;
  }

  export default withRouter(connect(mapStateToProps)(Nav));