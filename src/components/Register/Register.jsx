import React, { useState } from 'react'
import "./Register.css"
import { TextField, Container, Box, Button, InputAdornment, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [inputData, setIData] = useState({
        name: "", surname: "", phone: '', id: "", password: "", cpassword: "", gender: "female"
    })
    let { name, surname, phone, id, password, cpassword, gender } = inputData

    const [showhide, setshowhide] = useState(false)
    const [showhide1, setshowhide1] = useState(false)
    const navigate = useNavigate()

    function dataGrab(e) {
        setIData({ ...inputData, [e.target.name]: e.target.value })
    }

    const Validation = () => {
        let result = true;
        if (name === "" || name === null) {
            result = false
            toast.warning("please enter name", { position: "top-center" })
        }
        if (surname === "" || surname === null) {
            result = false
            toast.warning("please enter surname", { position: "top-center" })
        }
        if (phone === "" || phone === null) {
            result = false
            toast.warning("please enter phoneNumber", { position: "top-center" })
        }
        if (phone.length !== 10) {
            result = false
            toast.warning("please enter 10 digit phoneNumber ", { position: "top-center" })
        }
        if (id === "" || id === null) {
            result = false
            toast.warning("please enter EmailId", { position: "top-center" })
        }
        if (password === "" || password === null) {
            result = false
            toast.warning("please enter password", { position: "top-center" })
        }
        if (password.length <= 5 || password.length > 15) {
            result = false
            toast.warning("please enter password more than 5 digit or less than 15 digit", { position: "top-center" })
        }
        if (cpassword === "" || cpassword === null) {
            result = false
            toast.warning("please enter Confirm password", { position: "top-center" })
        }
        if (password !== cpassword) {
            result = false
            toast.warning("Passowrd not match", { position: "top-center" })
        }
        return result;
    }


    async function handleSubmit(e) {
        e.preventDefault()
        if (Validation()) {
            await axios.post(`http://localhost:8001/posts`, inputData)
                .then((x) => {
                    (x.data)
                    alert("Registration succefully")
                    navigate("/")
                })

                .catch((err) => {
                    console.log(err)
                    if (err.status = 500) {
                        alert("This Email is Alredy exist")
                    }
                })

        }
    }

    return (
        <Container className='sneha'>

            <h2 style={{ marginTop: "25px", textAlign: "center", fontFamily: "sans-serif", fontSize: "35px" }}>Register</h2>

            <form onSubmit={handleSubmit}>
                <h5 className=' space'>Name</h5>
                <TextField sx={{ mt: "3px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter your Name'
                    type="text"
                    autoComplete="current-password"
                    value={name}
                    name='name'
                    onChange={dataGrab}
                />

                <br />

                <h5 className='space'>Surname</h5>
                <TextField sx={{ mt: "5px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter your Surname'
                    type="text"
                    autoComplete="current-password"
                    value={surname}
                    name='surname'
                    onChange={dataGrab}
                />

                <h5 className='space'>Mobile</h5>
                <TextField sx={{ mt: "5px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter Mobile Number'
                    type="number"
                    autoComplete="current-password"
                    value={phone}
                    name='phone'
                    onChange={dataGrab}
                />

                <h5 className='space'>Email</h5>
                <TextField sx={{ mt: "5px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter your EmailId '
                    type="email"
                    autoComplete="current-password"
                    value={id}
                    name='id'
                    onChange={dataGrab}
                />

                <h5 className='space'>Password</h5>
                <TextField sx={{ mt: "5px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter your password'
                    type={showhide ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    name='password'
                    onChange={dataGrab}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setshowhide(!showhide)}>
                                    {!showhide ? <VisibilityOffIcon /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <h5 className='space'>Confirm Password</h5>
                <TextField sx={{ mt: "2px" }}
                    fullWidth
                    id="outlined-password-input"
                    placeholder='Enter confirm password'
                    type={showhide1 ? "text" : "password"}
                    autoComplete="current-password"
                    value={cpassword}
                    name='cpassword'
                    onChange={dataGrab}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setshowhide1(!showhide1)}>
                                    {!showhide1 ? <VisibilityOffIcon /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <FormControl>
                    <h5 className='space'>Gender</h5>
                    <RadioGroup sx={{ display: "flex", flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel name='gender' value="female" control={<Radio />} label="Female" onChange={dataGrab} />
                        <FormControlLabel name='gender' value="male" control={<Radio />} label="Male" onChange={dataGrab} />
                        <FormControlLabel name='gender' value="other" control={<Radio />} label="Other" onChange={dataGrab} />
                    </RadioGroup>
                </FormControl>

                <Button sx={{ mt: "15px", padding: "10px", fontWeight: "bold", fontSize: "15px", borderRadius: "15px" }} fullWidth variant="contained" color="success" type='submit'>Submit</Button>
            </form>
            <div style={{ textAlign: "center" }}>
                <Link to={"/"}>
                    <Button sx={{ width: "100px", mt: "15px", padding: "10px", fontWeight: "bold", fontSize: "15px", borderRadius: '18px' }} variant="contained" type='submit'>Login</Button>
                </Link>
            </div>


            <ToastContainer />
        </Container>
    )
}

export default Register