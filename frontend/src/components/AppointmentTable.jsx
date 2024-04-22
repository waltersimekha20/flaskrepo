import React from 'react'
import { useEffect, useState } from 'react'
import {Container, Table, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { BASE_URL } from '../config';

function AppointmentTable() {
  const  [appointments, setAppointments] = useState([])
    useEffect(()=>{
        async function fetchData(){
            try{
                await fetch(`${BASE_URL}/appointment`)
                .then(response => response.json())
                .then(data => setAppointments(data))
            }catch (error){
                console.log('Error: ', error)
            }
        }
        fetchData()
    },[])
    

    function handleDelete(id) {
        fetch(`${BASE_URL}/appointment/${id}`, {
            method: "DELETE",
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    window.location.reload()
                }
            });
            


      } 
    
  return (
    <div>
      <Container className='table-container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Appointment Date</th>
                    <th>Appointment Type</th>
                    <th>Patient Name</th>
                    <th>Staff Name</th>
                    
                    </tr>
                </thead>
                <tbody>
                {appointments.map(item => (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.appointment_date}</td>
                        <td>{item.appointment_type}</td>
                        <td>{item.patient_name}</td>
                        <td>{item.staff_name}</td>
                        
                        {/* <td><Link to={`/appointments/${item.id}`}>More</Link></td> */}
                        <td><Button variant='danger' onClick={() => handleDelete(item.id)}>Delete</Button></td>
                        <td><Button variant='success'><Link to={`/editappointments/${item.id}/`} className="link">Update</Link></Button></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
  )
}

export default AppointmentTable