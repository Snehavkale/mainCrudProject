import React, { useEffect, useState } from 'react'
import "./login.css"
import { TextField, Container, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [inputData, setIData] = useState({
        Email: "", password: ""
    })
    let { Email, password } = inputData
    let navigate = useNavigate()

    function dataGrab(e) {
        setIData({ ...inputData, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        sessionStorage.clear();
    })
    const Validation = () => {
        let result = true;
        if (Email === "" || Email === null) {
            result = false
            toast.warning("please enter username")
        }
        if (password === "" || password === null) {
            result = false
            toast.warning("please enter Password")
        }
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (Validation()) {
            fetch(`http://localhost:8001/posts/` + Email)
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error("Please enter valid EmailId")
                    }
                    else {
                        if (resp.password === password) {
                            sessionStorage.setItem("Email", Email)
                            navigate("/home")
                        }else {
                            toast.error("Please enter valid password")
                        }
                    }
                })
                .catch((error) => {
                    toast.error("Login Failed due to :" + error)
                })
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         fetch("http://localhost:3000/posts/" + userName)
    //             .then((res) => {
    //                 return res.json();
    //             })
    //             .then((resp) => {
    //                if(Object.keys(resp).length ===0){
    //                 toast.error("please enter valid Username")
    //                }
    //                else{
    //                 if(resp.password === pass){
    //                     toast.success("success")
    //                     sessionStorage.setItem("userName",userName)
    //                     navigate("/header")
    //                 }else {
    //                     toast.error("Please enter valid password")
    //                 }
    //                }

    //             })
    //     }
    // }




    return (
        <Container id='container'>

            <h2 style={{ textAlign: "center", marginTop: "30px", fontSize: "35px", fontFamily: "sans-serif" }} >Login</h2>

            <div className='right'>
                <form onSubmit={handleSubmit}>
                    <h5>Email</h5>
                    <TextField sx={{ mt: "1px" }}
                        fullWidth
                        id="outlined-password-input"
                        type="text"
                        autoComplete="current-password"
                        value={Email}
                        name='Email'
                        onChange={dataGrab}
                    /><br />

                    <h5 style={{ marginTop: "5px" }}>Password</h5>
                    <TextField sx={{ mt: "2px" }}
                        fullWidth
                        id="outlined-password-input"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        name='password'
                        onChange={dataGrab}
                    />
                    <Button type='submit' fullWidth sx={{ mt: "18px", padding: "8px" }} variant="contained">Submit</Button>
                </form>

                <div style={{ textAlign: "center", marginTop: "10px", fontSize: "17px" }}>
                    <Link to={"/reset"} >Forgot Password?</Link>
                </div>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Link to={"./register"}>
                        <Button variant="contained" color="success"> Create New Account </Button>
                    </Link>
                </div>



            </div>

            <ToastContainer />
        </Container>
    )
}

export default Login
