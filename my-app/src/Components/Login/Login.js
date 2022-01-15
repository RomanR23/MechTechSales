import React, { useState} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Login.css';

function Login(){


const [username, setUsername] = useState("");
const [password, setPassword] = useState("")


const history = useHistory();



function login() {

        axios.post('/api/auth/login', {username,password})
        .then(res => {
        if(res.data.username){
                history.push('/')
        }
        })
        .catch(err => {
                console.log(err)
                alert('Username or Password Incorrect!')
        })
        
}







        return (

                <div className = 'login-auth-container'>
                        <div className='login-auth-box'>
                        <h1 className ='login-login-text'>Welcome, Login Here!</h1>
                        <div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="login-username-input" placeholder ="Username"></input>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="login-password-input" placeholder ="Password"></input>
                        </div>
                        
                        <div className ='login-auth-button-container'>
                        <button className='login-auth-button' onClick={()=> login()}>Log In</button>
                        </div>
                        
                        
                        

                        </div>
                </div>
                
            
        )
    
}

export default Login;