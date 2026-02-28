import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from "../api/axios"
import {AuthContext} from "../context/AuthContext"
function Login() {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
     const { register, handleSubmit , formState : {errors}} = useForm();
     const onSubmit = async (data) => {
        try {
            const response = await axios.post('/auth/login',data);
            login(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
     }
  return (
   <>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {
            ...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                }}) }
                placeholder='Enter your email'
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input {
            ...register("password", {
                required: "Password is required",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                }}) }
                type='password'
                placeholder='Enter your password'
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        <button type='submit'   className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login</button>
<p>Don't Have Account <span className='text-blue-500'><Link to="/register">Register</Link></span></p>
    </form>
      </div>
   </>
  )
}

export default Login