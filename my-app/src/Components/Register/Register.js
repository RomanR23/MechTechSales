import React, { useState} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Register.css';

function Register(){


    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    function register() {
        axios.post('/api/auth/register', {username, firstname, lastname, password})
        .then(res => {
            
            alert('You Have Been Registered Successfully!')
            if(res.data.username){
                history.push('/')
                document.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    return (
        <div className ="register-auth-container">
            <div className = 'register-auth-box'>
                <h1 className='register-auth-text'>Welcome, Register Here!</h1>

                    <div className='register-input-box'>
                        <div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="register-username-input" placeholder ="Username"></input>
                        </div>
                        <div>
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className="register-firstname-input" placeholder ="First Name"></input>
                        </div>
                        <div>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} className="register-lastname-input" placeholder ="Last Name"></input>
                        </div>
                        <div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="register-password-input" placeholder ="Password"></input>
                        </div>
                        
                    </div>    
                        
                        <button className='register-auth-button' onClick={()=> register()}>Register</button>
            </div>
        </div>
    )
}

export default Register;