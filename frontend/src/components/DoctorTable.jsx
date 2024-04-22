import React from 'react'
import { useState, useEffect} from "react"
import {Container, Table} from 'react-bootstrap';
import { BASE_URL } from '../config';
import { Link } from 'react-router-dom';


function DoctorTable() {
    const  [doctors, setDoctors] = useState([])

    useEffect(()=>{
        async function fetchDoctors(){
            try{
                await fetch(`${BASE_URL}/staff`)
                .then(response => response.json())
                .then(data => setDoctors(data))
            }catch (error){
                console.log('Error: ', error)
            }
        }
        fetchDoctors()
    },[])
    // console.log(doctors)

    function handleDelete(id){
        fetch(`${BASE_URL}/staff/${id}`, {
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
                    <th>Specialization</th>
                    <th>Start Date</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                        {doctors.map((doctor)=>(
                            <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialisation}</td>
                            <td>{doctor.start_date}</td>
                            <td>{doctor.gender}</td>
                            <td>{doctor.contact_number}</td>
                            <td>{doctor.status}</td>
                            <td><button><Link to = {`/staffdetails/${doctor.id}`}>More</Link></button></td>
                            <td><button><Link to={`/staffs/${doctor.id}`}>Edit</Link></button></td>
                            <td><button onClick={() => handleDelete(doctor.id)}>Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
        
    </div>
  )
}

export default DoctorTable