import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Sweet from "sweetalert2"

function Reserve() {
  const [rooms, saverooms] = useState([]);
  const [loading, saveloading] = useState(true);
  const [error, saveerror] = useState();
  const {roomid,checkin,checkout}= useParams();
  const checkinn =moment(checkin,'MMM Do YYYY, dddd');
  const checkoutt =moment(checkout,'MMM Do YYYY, dddd');
  const totaldays=checkoutt.diff(checkinn,'days');
  const [totalpayment, savetotalpayment] = useState();
  const [images, saveimages] = useState([]);

  useEffect(() => async function() {
      try {
          saveloading(true);
          const data = (await axios.post('/getroom/getroombyid', {roomid:roomid})).data;
          savetotalpayment(data.roomPerDay*totaldays);
          saverooms(data);
          saveloading(false);
      } catch (error) {
          saveerror(true);
          console.log(error);
          saveloading(false);
      }
  }, [])

  async function reservenow(){
      const reserveDetails={
        rooms,
        userid:JSON.parse(localStorage.getItem('user'))._id,
        checkin,
        checkout,
        totaldays,
        totalpayment,
      }
      const reservesend = await (await axios.post('/reservation/reservenow',reserveDetails)).data;
      
      Sweet.fire(" ","Room is reserved").then(data=>{
        window.location.href='/home';
  })}

  return (
    <div className='m-1'>
        {error ? (<h1>error</h1>) :(<div className="row justify-content-center boxshadow">
                <div className='col-md-11'>
                  <div>
                      <h1>Reservation details</h1>
                      <p>Room Number : {rooms.roomNumber}</p>
                      <p>Name :{JSON.parse(localStorage.getItem('user')).username} </p>
                      <p>Checkin : {checkin}</p>
                      <p>Checkout : {checkout}</p>
                      <p>Max Guests : {rooms.maxPeople}</p>
                  </div>
                  <div>
                      <h1>Payment</h1>
                      <p>Total Days : {totaldays}</p>
                      <p>cost per day (€) :{rooms.roomPerDay} </p>
                      <p>Total payment (€) : {totalpayment}</p>
                  </div>
                <div style={{float:'right'}}>
                      <button className='btn btn-primary' onClick={reservenow}>Reserve Now</button> 
                </div> 
                </div>   
                </div>)}
    </div>
  )
}

export default Reserve