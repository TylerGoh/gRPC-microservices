import {React, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, Navigate } from "react-router-dom"
import './Login.css'
import axios from 'axios'

function Login(props){

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const setField = (field,value) =>{
        setForm({
        ...form,
        [field]:value});

        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("/user/login",form).then((res)=>{
            if(res.status === 202){
                props.setUsernameGlobal(form.username)
                props.setPasswordGlobal(form.password)
            }
            }).catch((err)=>{
                console.log(err)
                if(err.response.status === 401)
                    setErrors({
                        username: "Invalid username or password"
                    })
            })
    }
    //Prevent users from entering the page if logged in
    if(props.usernameGlobal !== ""){
        console.log("redirecting")
        return <Navigate to="/"/>;
    }

    return(
        <div className='color-overlay d-flex justify-content-center align-items-center'>
            <Form className='rounded login-form p-4 p-sm-3'>
                <Form.Group className='mb-3' controlId='formUsername'>
                    <Form.Label className='login-label'>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder='Enter username'
                        onChange={(e)=>setField('username',e.target.value)}
                        isInvalid={!!errors.username}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label className='login-label'>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder='Enter password'
                        onChange={(e)=>setField('password',e.target.value)}/>
                    <Form.Text className='text-muted'>
                    Don't have an account yet?&nbsp;
                    <Link to="/register">
                        Sign up
                    </Link>
                    </Form.Text>
                </Form.Group>
                <Button variant ="primary" type="submit" onClick={handleSubmit}>Login</Button>
            </Form>
        </div>
    )
}

export default Login