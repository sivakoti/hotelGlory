import React, { useState, useEffect } from "react";
import axios from "axios";
import Sweet from "sweetalert2"
import hotelbackground from "../images/hotelbackground.png"
function Signup(){
  
  const [username,saveUserName] = useState();
  const [email,saveEmail] = useState();
  const [password,savePassword] = useState();
  async function signUp(){
    const register = {
        username,email,password   
       }
    const data = await (await axios.post('/users/signup',register)).data;
     console.log(data);

    Sweet.fire(" ","Success","Registered Successfully").then(data=>{
        window.location.href='/'
    });   
  }
  useEffect(() => async function () {
  try {
     
  } catch (error) {
     
  }
  }, [])
  
  return (
    
    <div className="row justify" style={{backgroundImage: `url(${hotelbackground})`,backgroundSize:'cover',width: '100vw',height: '100vh'}}>
      <div className="container">
            <div className="row justify-content-centre" style={{margin:'auto',width:'30%'}}>
              <h1  style={{fontSize:'20px',color:'white',marginTop:'5%'}}>Signup</h1>
              <input type="text" placeholder="User Name"  style={{marginTop:'2%'}} value={username} onChange={(newuser)=>{saveUserName(newuser.target.value)}}></input><br/>
              <input type="text" placeholder="Email"  style={{marginTop:'2%'}} value={email} onChange={(newuser)=>{saveEmail(newuser.target.value)}}></input><br/>
              <input type="text" placeholder="Password"  style={{marginTop:'2%'}} value={password} onChange={(newuser)=>{savePassword(newuser.target.value)}}></input><br/>
              <button className="btn btn-primary"  style={{width:'45%',marginTop:'4%',marginLeft:"25%"}} onClick={signUp}>Signup</button><br/>
            </div>
        </div>
      </div>
  );
  
};
export default Signup;

