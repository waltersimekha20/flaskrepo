import { useEffect, useState } from "react"
import { BASE_URL } from "../config"
import { useParams } from "react-router-dom"

export default function StaffDetails(){
    const  [doctors, setDoctors] = useState([])
    const {id} = useParams()
    useEffect(() => {
        async function fetchDoctors(){
            try{
                await fetch(`${BASE_URL}/staff/${id}`)
                .then(response => response.json())
                .then(data => setDoctors(data))
            }catch (error){
                console.log('Error: ', error)
            }
        }
        fetchDoctors()

    },[id])
    
    return(
        <div>
            <h3 className="text-center mt-3 mb-4">Staff Details</h3>
            <p>{doctors?.name}</p>
            <div>
                <h3>Appointments</h3>
                {doctors.appointments?.map(appointment => {
                    return(
                        <div key={appointment.id}>
                            <p>{appointment.appointment_date}</p>
                            <p>{appointment.appointment_type}</p>
                        </div>
                    )
                })}
            <h3>Patients</h3>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Gender</th>
                </thead>
                
                <tbody>
                    
                    {doctors.patients?.map(patient => (
                        
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                            </tr>
                        
                    ))}
                        
            </tbody>
         </table>

            </div>
            
        </div>
    )
}