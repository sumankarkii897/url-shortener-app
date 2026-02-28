import React from 'react'
import axios from '../api/axios'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom'
function Register() {
    const {register,handleSubmit,formState: { errors },} = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
           await axios.post('/auth/register',data);
           navigate('/login'); 
        } catch (error) {
            console.log(error.message);
            
            
        }
    }
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">

         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {
            ...register("username", {
                required: "Username is required",
                minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters"
                }}) }
                placeholder='Enter your username'
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
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
        <button type='submit'   className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Register</button>
    </form>
    <p>Already Have Account <span className='text-blue-500'><Link to="/login">Login</Link></span></p>
      </div>
    </>
  )
}

export default Register