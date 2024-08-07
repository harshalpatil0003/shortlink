import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
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
        if (reaponse.data.success) {
            toast.success(reaponse.data.message)
            setUser({
                name: "",
                email: "",
                password: "",
                role: ""
            })
        }
        else {
            toast.error(reaponse.data.message)
        }
    }
    return (
        <div className='input'>
            <h2 className='my-3'>Signup</h2>
            <form className="signup-form mx-auto rounded-3">
                <div>

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
                        className='form-control' />

                    {/* <input type="dropdown" id="role"
                    placeholder='Job Role'
                    value={user.role}
                    className=' btn btn-secondary dropdown-toggle'
                    onChange={(e) => setUser({ ...user, role: e.target.value })} /> */}
                    <div class="dropdown">

                        <select class="dropdown-menu dropdown-toggle">
                            <option>Job Role</option>
                            <option>Developer</option>
                            <option>Student</option>
                            <option>Organization</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <button className='btn login-btn btn-success d-block form-control' onClick={signup}>signup</button>
                    <p className='links'>Already have an account? <Link to='/signin'> SignIn</Link></p>
                </div>
            </form >
            <Toaster />
        </div >
    )
}

export default Signup
