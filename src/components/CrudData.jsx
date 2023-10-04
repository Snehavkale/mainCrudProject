import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './CrudData.css'

const CrudData = () => {
    const [crudData, setCrudData] = useState([])

    const nav = useNavigate();

    useEffect(() => {
       let email= sessionStorage.getItem("Email")
       if (email==="" || email=== null){
        nav("/")
       }
        
        getData();
    }, [])

    async function getData() {
        axios.get(`http://localhost:8000/posts`)
            .then((x) => setCrudData(x.data))
    }


    function handleDelete(id) {
        const conf = window.confirm("Do you want to delete");
        if (conf) {
            axios.delete(`http://localhost:8000/posts/${id}`)
                .then(x => {
                    alert("record has deleted")
                    getData()
                    nav("/home")
                })

                .catch((err) => console.log(err))

        }
    }

    return (
        <Container>
            <div className="row mt-4">
                <div className="container">
                    <div className="card">
                        <div className="card-title text-center">
                            <h2 className='mt-2'>My All Expenses</h2>
                        </div>
                        <div style={{display:'flex', flexDirection:"row"}}>
                        <div style={{ margin: "auto" }}>
                            <Link to="/add"><Button style={{ width: "80px", height: "40px", padding: "5px", fontWeight: "bold" }} variant="success" >Add  (+)</Button></Link>
                        </div>
                        <div style={{ margin: "auto" }}>
                            <Link to="/"><Button style={{ width: "80px", height: "40px", padding: "5px", fontWeight: "bold" }} variant="success" >Logout</Button></Link>
                        </div>
                        </div>
                        <div className="card-body ">

                            <Table striped bordered hover >
                                <thead >
                                    <tr >
                                        <th>ID</th>
                                        <th> ToDos</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th className='action'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        crudData.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.amount}</td>

                                                    <td className='button'>
                                                        <Link to={`/edit/${item.id}`}><Button className='edit'>Edit</Button> </Link>
                                                        <Button className='delete' onClick={() => handleDelete(item.id)} style={{ marginLeft: "5px" }}>Delete</Button>


                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        </Container>

    )

}

export default CrudData
