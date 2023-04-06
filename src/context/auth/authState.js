import { useState } from "react";
import AuthContext from "./authContext";

import React from 'react'

const authState = () => {
    const host = "http://localhost:5000"
    const loginDetails = []
    const [Credential, setCredential] = useState(loginDetails)

    const getLogin = async (email,password) =>{
        //Api call
        const response=await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password })
        });
        const json = await response.json();
        setCredential(json)
    }

  return (
    <AuthContext.Provider value={{getLogin }}>
    {props.children}
</AuthContext.Provider>
  )
}

export default authState
