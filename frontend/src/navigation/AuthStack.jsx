import { Routes, Route } from "react-router-dom"
import Login from "../components/Login"
import SignUp from "../components/Signup"

export default function AuthStack(){
    return(
       <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
       </Routes>
    )
}