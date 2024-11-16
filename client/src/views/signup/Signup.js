import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import toast, {Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const signup = async () => {
        const { name, email, password } = user
        if (!name || !email || !password) {
            toast.error("Please fill all the fields")
            return
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
            name: name,
            email: email,
            password: password
        })
        
        if (response.data.success) {
            toast.success(response.data.message)
           
            setUser({
                name: "",
                email: "",
                password: ""
            })
            
            toast.loading('Redirecting to Dashboard...')
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        }

        else {
            toast.error(response.data.message)
        }
    }
    return (
        <div className='input'>
            <h2 className='text-center my-3'>Signup</h2>
            <form className="signup-form mx-auto rounded-3">
                <div>

                    <input type="text" id="username"
                        className='form-control'
                        placeholder='Name'
                        required
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })} />

                    <input type="email" id="email"
                        value={user.email}
                        required
                        placeholder='Email'
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className='form-control' />


                    <input type="password" id="password"
                        placeholder='Password'
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className='form-control' />

                    
                    <button className='btn login-btn btn-success d-block form-control' onClick={signup}>signup</button>
                    <p className='links'>Already have an account? <Link to='/signin'> SignIn</Link></p>
                </div>
            </form >
            <Toaster />
        </div >
    )
}

export default Signup
