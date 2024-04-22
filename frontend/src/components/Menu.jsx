import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context";
const navStyles = {
  display: "flex",
  backgroundColor: "tomato",
  padding: "10px",
};

const linkStyles = {
  textDecoration: "none",
  color: "white",
  margin: "0 10px",
  padding: "8px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

const activeLinkStyles = {
  background: "#007bff",
};

function Menu() {
  const { logoutUser, userData } = useContext(AuthContext);
  return (
    <div style={navStyles} className="menu">
      <NavLink to="/" style={linkStyles} activestyle={activeLinkStyles}>
        Home
      </NavLink>
      <NavLink to="/staffs" style={linkStyles} activestyle={activeLinkStyles}>
        Staffs
      </NavLink>
      <NavLink to="/patients" style={linkStyles} activestyle={activeLinkStyles}>
        Patients
      </NavLink>
      <NavLink
        to="/appointments"
        style={linkStyles}
        activestyle={activeLinkStyles}
      >
        Appointment
      </NavLink>
      <NavLink
        to="/logout"
        style={linkStyles}
        activestyle={activeLinkStyles}
        onClick={() => logoutUser()}
      >
        Log Out
      </NavLink>
      <div>
        <NavLink aria-disabled="true" style={linkStyles}>
          {userData.username}
        </NavLink>
        <NavLink aria-disabled="true" style={linkStyles}>
          {userData.email}
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
