import React from "react";
import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { BASE_URL } from "../config";

function PatientForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [staffId, setStaffId] = useState("");
  // const [patientId, setPatientId] = useState("");
  // const[staffs, setStaffs]= useState([])

  const [patientData, setPatientData] = useState({
    name: "",
    date_of_birth: "",
    age: "",
    gender: "",
    contact_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "age" ? parseInt(value) : value;
    setPatientData({
      ...patientData,
      [name]: newValue,
    });
  };
  // console.log(patientData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(patientData);
    try {
      const response = await fetch(`${BASE_URL}/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data posted successfully:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3 mb-4">Patient Registration Form</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Control
                  name="name"
                  value={patientData.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Name"
                />
                <br />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Select
                  name="gender"
                  value={patientData.gender}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
                <br />
              </Form.Group>
              <Form.Group controlId="formAge">
                <Form.Control
                  name="age"
                  value={patientData.age}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Age"
                />
                <br />
              </Form.Group>
            </Col>
            <Col>
              <Form.Control
                name="date_of_birth"
                value={patientData.date_of_birth}
                onChange={handleInputChange}
                type="date"
                placeholder="Date of Birth"
              />
              <br />
              <Form.Control
                name="contact_number"
                value={patientData.contact_number}
                onChange={handleInputChange}
                type="text"
                placeholder="Phone Number"
              />
              <br />
            </Col>

            {/* <Form.Select name='staff_id' value={patientId} onChange={(e) => setStaffId(e.target.value)} aria-label="Default select example">
              <option value="">Select doctor</option>
                  {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                      {patient.name}
                  </option>
                  ))}
              </Form.Select><br/>  */}
          </Row>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "tomato" }}
          >
            {loading ? "Adding Patient..." : "Add Patient"}
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>
      </Container>
    </div>
  );
}

export default PatientForm;
