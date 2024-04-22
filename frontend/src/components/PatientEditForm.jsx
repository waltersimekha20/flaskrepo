import React from 'react'
import { useState} from "react"
import {Form,Row,Col,Container, Button} from 'react-bootstrap';
import { BASE_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';

function PatientEditForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams()

    const navigate = useNavigate()
  const [patientData, setPatientData] = useState({
    name: '',
    date_of_birth: '',
    age: '',
    gender: '',
    contact_number: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'age' ? parseInt(value) : value;
    setPatientData({
      ...patientData,
      [name]: newValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(patientData)
    try {
      const response = await fetch(`${BASE_URL}/patient/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data updated successfully.', data);
      navigate("/patients")
    } catch (error) {
      setError(error.message);
      console.error('Error posting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3 mb-4">Patient Edit Form</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Control name="name" value={patientData.name} onChange={handleInputChange} type="text" placeholder="Name" /><br/>
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Select name="gender" value={patientData.gender} onChange={handleInputChange} aria-label="Default select example">
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select><br/>
              </Form.Group>
              <Form.Group controlId='formAge'>
                <Form.Control name='age' value={patientData.age} onChange={handleInputChange} type='number' placeholder="Age" /><br/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Control name='date_of_birth' value={patientData.date_of_birth} onChange={handleInputChange} type='date' placeholder="Date of Birth" /><br/>
              <Form.Control name='contact_number' value={patientData.contact_number} onChange={handleInputChange} type='text' placeholder="Phone Number" /><br/>
            
            </Col>
          </Row>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Updating Patient...' : 'Update Patient'}
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>
      </Container>
      
    </div>
  )
}

export default PatientEditForm