import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddData = () => {
  const [inpData, setInpData] = useState({
    name: "", date: "", amount: ""
  })
  let { name, date, amount } = inpData

 
  const nav = useNavigate();

  const navigat = useNavigate();
  const Nref = useRef(null);
  const Eref = useRef(null);
  const Pref = useRef(null);

  const handleInp = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value })
  }

  useEffect(()=>{
    let email= sessionStorage.getItem("Email")
    if (email==="" || email=== null){
     nav("/")
    }
  })
  async function handleSubmit(e) {
    e.preventDefault();
    if (amount.length ==="") {
      alert("Please enter amount")
    }
    else {
      await axios.post('http://localhost:8000/posts', inpData)
        .then((x) => alert(" data added succesfully"))
      navigat("/home")
        // .catch((err) => console.log(err));
    }
  }
  const xyz = () => {
    alert("All Fileds are Mandetory")
  }

  const handleBack = () => {
    const conf = window.confirm("Do you want to Erase Data & Go Back to Home")
    if (conf) {
      Nref.current.value = "";
      Eref.current.value = "";
      Pref.current.value = "";
      navigat("/home")
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 fw-bold" controlId="formBasicEmail">
          <Form.Label>Todo </Form.Label>
          <Form.Control type="text" name='name' value={name} placeholder="Enter your  plan" onChange={handleInp} ref={Nref} />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="formBasicEmail">
          <Form.Label>Date </Form.Label>
          <Form.Control type="date" name='date' value={date} placeholder="Enter email" onChange={handleInp} ref={Eref} />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="formBasicPassword">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" name='amount' value={amount} placeholder="Enter Amount" onChange={handleInp} ref={Pref} />
        </Form.Group>

        {
          (name.length == 0 || date.length == 0 || amount.length == 0) ? <Button onClick={xyz} variant='success'>Add Data</Button> :
            <Button variant="success" type="submit"> Add Data</Button>
        }

        {
          (name.length === 0 || date.length === 0 || amount.length === 0) ? <Link to="/home">  <Button variant="info" >Back</Button> </Link>
            :
            <Button className='ms-2' variant='success' onClick={handleBack}>Back</Button>
        }

      </Form>
    </Container>
  )
}

export default AddData
