import { Routes, Route } from "react-router-dom"
import Home from "../components/Home"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Patient from "../pages/Patient"
import Doctor from "../pages/Doctor"
import PatientEditForm from "../components/PatientEditForm"
import DoctorEditForm from "../components/DoctorEditForm"
import Appointment from "../pages/Appointment"
import StaffDetails from "../components/DoctorDetails"
import PatientDetails from "../components/PatientDetails"
import AppointmentEditForm from "../components/EditAppointments"



export default function AppStack(){
    
    return(
        <div>
            <Header/>
            <Menu/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path = "patients" element = {<Patient />} />
                <Route path = "/staffs" element = {<Doctor />}/>
                <Route path="/patients/:id" element = {<PatientEditForm/>}/>
                <Route path="/staffdetails/:id" element = {<StaffDetails/>}/>
                <Route path="/patientdetails/:id" element = {<PatientDetails />}/>
                <Route path="/staffs/:id" element = {<DoctorEditForm />}/>
                <Route path="/appointments" element={<Appointment />} />
                <Route path="/editappointments/:id" element={<AppointmentEditForm />}/>
            </Routes>
            {/* <Footer/> */}
        </div>
        
        
    )
}