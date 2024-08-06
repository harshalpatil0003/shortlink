import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import {toast ,Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'


function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })
    const signup = async () => {
        const reaponse = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        })
        if(reaponse.data.success){
            toast.success(reaponse.data.message) 
            setUser({
                name: "",
                email: "",
                password: "",
                role: ""
            })
        }
        else{
            toast.error(reaponse.data.message)
        }
    }
    return (
        <div>
            <h2>Signup Form</h2>
            <form id="signup-form">

                <input type="text" id="username"
                    className='form-control'
                    placeholder='Name'
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })} />

                <input type="email" id="email"
                    value={user.email}
                    placeholder='Email'
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className='form-control' />

              
                <input type="password" id="password"
                placeholder='Password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className='form-control'/>

                <input type="text" id="confirm-password"
                placeholder='Job Role'
                    value={user.role}
                    className='form-control'
                    onChange={(e) => setUser({ ...user, role: e.target.value })}/>

                <button className='btn btn-success d-block' onClick={signup}>signup</button>
                <Link to='/login'>Already have an account? SignIn</Link>
            </form>
            <Toaster/>
        </div>
    )
}

export default Signup
