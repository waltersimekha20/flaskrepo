
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios"
import { BASE_URL } from './config';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setuserToken] = useState(null)
  const [userData, setuserData] = useState(null)
  

  const loginUser = (email, password) => {
    setIsLoading(true)
    axios.post(`${BASE_URL}/login`, {
        email,
        password
    })
   
    .then(res => {
        // console.log(res)
        let userdata = res.data
        setuserData(userdata)
        setuserToken(userdata.access_token)
        // console.log(userdata.access_token)
        localStorage.setItem('userInfo', JSON.stringify(userdata))
        localStorage.setItem('userToken', userdata.access_token)
    })
   
    .catch(error => console.log(error))
    setIsLoading(false)

  }


  const logoutUser = () => {
    // setIsLoading(true)
    setuserToken(null)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userToken')
    setIsLoading(false)
    
    
  }

  const isLoggedIn = async () =>{
    try{
        setIsLoading(true)
        let usertoken = await localStorage.getItem('userToken') 
        let userinfo = await localStorage.getItem('userInfo')
        userinfo = JSON.parse(userinfo)
        if (userinfo){
            setuserToken(usertoken)
            setuserData(userinfo)
        }
        setIsLoading(false)
    }
    catch(error){
        console.log(`isLogged in error ${error}`)
    }
    
  }

  useEffect(() => {
    isLoggedIn()

  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, loginUser, logoutUser, userToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };