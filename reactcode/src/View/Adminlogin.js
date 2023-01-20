import React, { useState, useEffect } from 'react'
import hotelbackground from "../images/hotelbackground.png"
import Sweet from "sweetalert2"

function Adminlogin() {
    const [email, saveEmail] = useState();
    const [password, savePassword] = useState();
    async function admin() {
      const req = {
        email, password
      }
     if(email == "admin@gmail.com" && password == "adminglory@123"){
        window.location.href='/admin';
     }
     else{
        Sweet.fire(" ","Invalid credentials").then(data=>{
            window.location.href='/Adminlogin';})
     }
    }
    function login()
    {
            window.location.href='/';
    }

  return (
    <div className="row justify" style={{backgroundImage: `url(${hotelbackground})`,backgroundSize:'cover',width: '100vw',height: '100vh'}}>
      <div className="container">
      <div className="row justify-content-centre" style={{margin:'auto',width:'30%'}}>
            <h1 style={{fontSize:'20px',color:'white',marginTop:'5%'}}>Admin Login</h1>
            <input type="text" placeholder="Email" style={{marginTop:'2%'}} value={email} onChange={(newuser) => { saveEmail(newuser.target.value) }}></input><br />
            <input type="text" placeholder="Password" style={{marginTop:'2%'}} value={password} onChange={(newuser) => { savePassword(newuser.target.value) }}></input><br />
            <button className="btn btn-primary" onClick={admin} style={{width:'45%',marginTop:'5%'}}>Admin login</button>
            <button className="btn btn-secondary" onClick={login} style={{width:'45%',marginTop:'5%',marginLeft:'10%'}}>User login</button>
          </div>
      </div>
      </div>
  )
}
export default Adminlogin