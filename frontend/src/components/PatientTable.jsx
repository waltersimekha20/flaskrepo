import React from 'react'
import { useState, useEffect} from "react"
import {Container, Table} from 'react-bootstrap';
import { BASE_URL } from '../config';
import { Link } from 'react-router-dom';
function PatientTable() {
    const  [patients, setPatients] = useState([])
   
    useEffect(()=>{
        async function fetchPatients(){
            try{
                await fetch(`${BASE_URL}/patient`)
                .then(response => response.json())
                .then(data => setPatients(data))
            }catch (error){
                console.log('Error: ', error)
            }
        }
        fetchPatients()
    },[])

    function handleDelete(id){
        fetch(`${BASE_URL}/patient/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
  
        })
        .then(response => {
             if (response.status === 200){
                window.location.reload()
             }
         })
    }

  return (
    <div className='mt-5'>
        <Container className='table-container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    {/* <th>Edit</th> */}
                   
                    </tr>
                </thead>
                <tbody>
                {patients.map(item => (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.date_of_birth}</td>
                        <td>{item.contact_number}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td><button><Link to={`/patientdetails/${item.id}`}>More</Link></button></td>
                        <td><button><Link to={`/patients/${item.id}`}>Edit</Link></button></td>
                        <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        
    </div>
  )
}

export default PatientTable