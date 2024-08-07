import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
            email: email,
            password: password
        })
        if (response.data.success) {
            toast.success(response.data.message)
            localStorage.setItem('currentUser', JSON.stringify(response.data.data))

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
        <div>
            <h2 className='my-3'>Signin</h2>
            <form className=' login-form'>
                <div className='d-block mx-auto inputs'>
                    <input type="email" class="form-control" id="exampleInputEmail1"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp" />


                    <input type="password" class="form-control"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="button"
                        onClick={login}
                        class="btn login-btn btn-success form-control">Login</button>
                    <p className='links'>Not have account?  <Link to='/signup'>SignUp</Link > </p>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default Login
