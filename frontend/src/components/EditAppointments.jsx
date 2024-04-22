import React from 'react'
import { useState, useEffect} from "react"
import {Form,Row,Col,Container, Button} from 'react-bootstrap';
import { BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';


function AppointmentEditForm() {

  const[loading, setLoading]= useState(false);
  const {id} = useParams()
  const navigate = useNavigate()

  const [staffId, setStaffId] = useState("");
  const [patientId, setPatientId] = useState("");
  const[staffs, setStaffs]= useState([])
  const [patients, setPatients]= useState([])
  const [appointment_date, setAppoinmentDate]=useState('')
  const [appointment_type, setAppoinmentType]=useState('')
  const [patient_name, setPatientName]= useState("")
  const [staff_name, setStaffName]= useState("")
  

  
    useEffect(() => {
        fetch(`${BASE_URL}/staff`)
            .then((r) => r.json())
            .then(setStaffs);
        }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/patient`)
            .then((r) => r.json())
            .then(setPatients);
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/patient/${patientId}`)
            .then((r) => r.json())
            .then(data => setPatientName(data.name));
    }, [patientId]);

    useEffect(() => {
        fetch(`${BASE_URL}/staff/${staffId}`)
            .then((r) => r.json())
            .then(data => setStaffName(data.name));
    }, [staffId]);

   

   

   



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            staff_id: parseInt(staffId),
            patient_id: parseInt(patientId),
            appointment_date,
            appointment_type,
            patient_name,
            staff_name,
        };

        console.log(formData);
        try {
            const response = await fetch(`${BASE_URL}/appointment/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate("/appointments")
            setLoading(false);
        } catch (error) {
            // Handle error
            setLoading(false);
        } finally {
            window.location.reload();
        }
    };

  if  (loading){
    return <h4>Loading...</h4>
  }

  return (
    <div>
        <Container className='mb-5'>
            <h3 className="text-center mt-3 mb-4">Update Appointment</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control name='appointment_date' value={appointment_date} onChange={(e) => setAppoinmentDate(e.target.value)} type='date' placeholder="Appointment Date" /><br/>
                        <Form.Select name='appointment_type' value={appointment_type} onChange={(e) => setAppoinmentType(e.target.value)} aria-label="Default select example">
                            <option>Appointment type</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Er Medic">Er Medic </option>
                            <option value="Reception">Reception</option>
                            <option value="Head Doctor">Head Doctor</option>
                        </Form.Select><br/>
                    </Col>
                    <Col>
                        <Form.Select name='patient_id' value={patientId} onChange={(e) => setPatientId(e.target.value)} aria-label="Default select example">
                        <option value="">Select patient</option>
                            {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name}
                            </option>
                            ))}
                        </Form.Select><br/>    
                        <Form.Select name='staff_id' value={staffId} onChange={(e) => setStaffId(e.target.value)} aria-label="Default select example">
                        <option value="">Select staff</option>
                            {staffs.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                                {staff.name}
                            </option>
                            ))}
                        </Form.Select><br/>   
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Update appointment
                </Button>
            </Form>
        </Container>
    </div>
  )
}

export default AppointmentEditForm