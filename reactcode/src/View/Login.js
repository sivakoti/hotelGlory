import React, { useState, useEffect } from "react";
import axios from "axios";
import Sweet from "sweetalert2"
import hotelbackground from "../images/hotelbackground.png"


function Login() {
  const [loading, saveloading] = useState();
  const [error, saveerror] = useState();
  const [email, saveEmail] = useState();
  const [password, savePassword] = useState();
  async function login() {
    const req = {
      email, password
    }
    try{
    saveloading(true);
    const data = await (await axios.post('/users/login', req)).data;
    saveloading(false);
    localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/home';
  }
  catch(err){
      saveerror(true);
      saveloading(false);

      Sweet.fire(" ","Invalid credentials").then(data=>{
        window.location.href='/';
  })
  }
  }
  function register(){
    window.location.href ="/signup";
  }
  function admin(){
    window.location.href ="/Adminlogin";
  }
  return (
    <div className="row justify" style={{backgroundImage: `url(${hotelbackground})`,backgroundSize:'cover',width: '100vw',height: '100vh'}}>
      <div className="container">
      <div className="row justify-content-centre" style={{margin:'auto',width:'30%'}}>
            <h1 style={{fontSize:'20px',color:'white',marginTop:'5%'}}>User Login</h1>
            <input type="text" placeholder="Email" style={{marginTop:'2%'}} value={email} onChange={(newuser) => { saveEmail(newuser.target.value) }}></input><br />
            <input type="text" placeholder="Password" style={{marginTop:'2%'}} value={password} onChange={(newuser) => { savePassword(newuser.target.value) }}></input><br />
            <button className="btn btn-primary" onClick={login} style={{width:'45%',marginTop:'5%'}}>login</button>
            <button className="btn btn-secondary" onClick={register} style={{width:'45%',marginTop:'5%',marginLeft:'10%'}}>Signup here</button>
            <button className="btn btn-info" onClick={admin} style={{width:'50%',marginTop:'5%',marginLeft:'25%'}}>Hotel Admin</button>
          </div>
      </div>
      </div>
  );

};
export default Login;


