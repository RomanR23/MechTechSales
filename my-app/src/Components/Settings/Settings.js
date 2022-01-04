import React, { Component } from 'react';
import './Settings.css'


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }








    render(){
        return (
        <div className = "settings-container">

                <div className="welcome-user">
                    <p className="username-text">Welcome to Settings, Roman!</p>
                </div>


            <div className = "settings">

                <div className="container">
                        <input placeholder='Username'></input>
                        <button className='button-settings'>Edit</button>
                    </div>

                    <div className="container"> 
                        <input placeholder="First Name"></input>
                        <button className='button-settings'>Edit</button>
                    </div>

                    <div className="container"> 
                        <input placeholder="Last Name"></input>
                        <button className='button-settings'>Edit</button>
                    </div>

                    <div className="container"> 
                        <input placeholder="Password"></input>
                        <button className='button-settings'>Edit</button>
                    </div>
            </div>
        </div>
        )
    }
}

export default Settings;