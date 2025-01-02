// RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { handleRegistration } from './registerService';
import { toast } from 'react-toastify';
import loginimage from "../../assets/login.png";

function RegisterPage() {
    const navigate=useNavigate();
    const[register,setRegister]=useState(
        {
            username:'',
            email:'',
            password:'',
            maxFacultyAccounts:0,
        }
    )
    const handleRegister=async(e)=>{
        e.preventDefault();
        console.log(register);
        const resStatus=await handleRegistration(register);
        if(!resStatus){
            toast("Something went Wrong",{type:'error',autoClose: 2000,})
        }
        else{
            toast("Register Succesfully",{type:'success',autoClose: 2000,})
            navigate('/')
        }
        console.log(resStatus)
    }
    return (
        <div className=" d-flex">
        <div className='login-image-container'><img src={loginimage} alt="" className={"login-image"}/></div>
        <div className="container d-flex justify-content-center align-items-center register-page">
            <div className="card p-4 px-5 shadow-lg register-card">
                <h2 className="text-center mb-4">Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your name" onChange={(e)=>setRegister(prev=>({...prev,[e.target.id]:e.target.value}))}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e)=>setRegister(prev=>({...prev,[e.target.id]:e.target.value}))}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>setRegister(prev=>({...prev,[e.target.id]:e.target.value}))}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Maximum Faculty Account</label>
                        <input type="number" className="form-control" id="maxFacultyAccounts" placeholder="Enter your name" onChange={(e)=>setRegister(prev=>({...prev,[e.target.id]:Number(e.target.value) }))}/>
                    </div>
                    <button type="submit" className="btn btn-primary py-2 w-100" onClick={handleRegister}>Register</button>
                    <div className="text-center mt-3">
                        Already have an account? <Link to="/">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default RegisterPage;
