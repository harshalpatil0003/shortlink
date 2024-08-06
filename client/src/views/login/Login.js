import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const login = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
            email: email,
            password:password
        })
        if(response.data.success){
            toast.success(response.data.message)
            localStorage.setItem('currentUser',JSON.stringify(response.data.data))
    
            toast.loading('Redirecting to Dashboard...')
            setTimeout(()=>{
                window.location.href='/'
            },3000)
        }
        else{
            toast.error(response.data.message)
            }
    }
    return (
        <div>
            <form>
                <div class="mb-3">
                    <input type="email" class="form-control" id="exampleInputEmail1"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        id="exampleInputPassword1" />
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                </div>
                <button type="button"
                    onClick={login}
                    class="btn btn-primary">Submit</button>
                <Link to='/signup'>Not have account? SignUp</Link>
            </form>
            <Toaster/>
        </div>
    )
}

export default Login
