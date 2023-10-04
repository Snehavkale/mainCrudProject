import axios from 'axios';
import { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Edit = () => {
  const { id } = useParams();
  const [getdata, setGetData] = useState([])
 


  const navigate = useNavigate();

  const handleInp = (e) => {
    setGetData({ ...getdata, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get('http://localhost:8000/posts/' + id)
      .then((x) => setGetData(x.data))
      .catch((err) => console.log(err))
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    if (getdata.amount.length == "") {
      alert("please enter Amount")
    }
    else if (getdata.name.length == "") {
      alert("Name field should not be blank")
    }
    else if (getdata.date.length == "") {
      alert("date field should not be blank")
    }
    else {
      axios.put('http://localhost:8000/posts/' + id, getdata)
        .then((x) => alert("Data Updates Successfully"))
      navigate("/home")
    }

  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mt-4 fw-bold" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" disabled name='name' value={getdata.id} />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="formBasicEmail">
          <Form.Label>ToDos </Form.Label>
          <Form.Control type="text" name='name' value={getdata.name ||""} onChange={handleInp} />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="formBasicEmail">
          <Form.Label>date </Form.Label>
          <Form.Control type="date" name='date' value={getdata.date || ""} onChange={handleInp} />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="formBasicPassword">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" name='amount' value={getdata.amount || ""} onChange={handleInp} />
        </Form.Group>

        <Button type='submit'>Update Data</Button>

        <Link to="/home">  <Button variant="success" >Back</Button> </Link>
      </Form>
    </Container>
  )
}

export default Edit
