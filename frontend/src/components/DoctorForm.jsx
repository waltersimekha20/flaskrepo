import React from "react";
import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { BASE_URL } from "../config";

function DoctorForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [doctorData, setdoctorData] = useState({
    name: "",
    specialisation: "",
    start_date: "",
    gender: "",
    contact_number: "",
    status: "",
  });

  const handleInputChange = (e) => {
    setdoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
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
  if (loading) {
    return <h4>Loading...</h4>;
  }
  return (
    <div>
      <Container>
        <h3 className="text-center mt-3 mb-4">Staff Registration Form</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                name="name"
                value={doctorData.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Name"
              />
              <br />
              <Form.Select
                name="specialisation"
                value={doctorData.specialisation}
                onChange={handleInputChange}
                aria-label="Default select example"
              >
                <option>Specialisation</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Er Medic">Er Medic </option>
                <option value="Receptionist">Receptionist</option>
                <option value="Head Doctor">Head Doctor</option>
              </Form.Select>
              <br />
              <Form.Control
                name="start_date"
                value={doctorData.start_date}
                onChange={handleInputChange}
                type="date"
                placeholder="Starting Date"
              />
              <br />
            </Col>
            <Col>
              <Form.Select
                name="gender"
                value={doctorData.gender}
                onChange={handleInputChange}
                aria-label="Default select example"
              >
                <option>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <br />
              <Form.Control
                name="contact_number"
                value={doctorData.contact_number}
                onChange={handleInputChange}
                type="text"
                placeholder="Phone Number"
              />
              <br />
              <Form.Select
                name="status"
                value={doctorData.status}
                onChange={handleInputChange}
                aria-label="Default select example"
              >
                <option>Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On-leave">On-leave</option>
              </Form.Select>
              <br />
            </Col>
          </Row>
          <br />
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "tomato" }}
          >
            {loading ? "Adding Staff..." : "Add Staff"}
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>
      </Container>
    </div>
  );
}

export default DoctorForm;