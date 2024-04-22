import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config"


export default function PatientDetails({getStaff, setStaffId}){
    const {id} = useParams()
    const [patients, setPatients] = useState([])
    const [staff, setStaff] = useState([])
    let staffId = 0

    useEffect(() => {
        async function fetchPatients(){
            try{
                await fetch(`${BASE_URL}/patient/${id}`)
                .then(response => response.json())
                .then(data => {
                    setPatients(data)
                    
                })
            }catch (error){
                console.log('Error: ', error)
            }

        
        }

        async function getStaff(id){
            console.log(staffId)
            
                fetch(`${BASE_URL}/staff/${id}`)
                .then(response => response.json())
                .then(data => setStaff(data))

        }

      
        
        fetchPatients()
        getStaff()
        

    },[id, staffId])
    console.log(staff)
   
    return(
        <div>
            <p>Patient Name: {patients.name}</p>
            <p>Doctor Name: {staff.name}</p>
            <table>
                <thead>
                    <th>Appointment Type</th>
                    <th>Appointment Date</th>
                </thead>
                <tbody>
                    
                        {patients.appointments?.map(appointment =>{
                            
                            return (
                                <tr>
                                
                                <td>{appointment.appointment_type}</td>
                                <td>{appointment.appointment_date}</td>
                                
                                </tr>

                            )
                           
                            

                })}
                    
                </tbody>
            </table>
            
        </div>
    )
}