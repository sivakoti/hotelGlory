import axios from 'axios';
import React,{useState,useEffect} from 'react'


function UserMyBookings() {
  const [loading, saveloading] = useState();
  const [myownbookings, savemyownbookings] = useState([]);
    const currentuser = JSON.parse(localStorage.getItem('user')) ;

    useEffect(( ) => async function(){
      const my= await (await axios.post('/reservation/mybookings',{userid:currentuser._id})).data;
      savemyownbookings(my);
    },[])

    async function cancelroom(reserveid,roomid){
      saveloading(true);
      const deleteroom= await (await axios.post('/reservation/cancelreservation',{reserveid,roomid})).data; 
      saveloading(false);
      console.log(deleteroom);
      window.location.href="/mybooking"
    }

  return (
    <div className='container'>
      <div className='col mt-2'>
      <h1>My Bookings</h1>
        <div className='col-md-8'>
                {myownbookings && (myownbookings.map(book =>{
                 return <div> <div className='bsw'>
                  <h1>Room Number : {book.roomNumber}</h1>
                  <p>Booking Id : {book._id}</p>
                  <p>Checkin    : {book.checkin}</p>
                  <p>Checkout   : {book.checkout}</p>
                  <p>Payment(€) : {book.totalpayment}</p>
                  <p>Status     : {book.status == "reserved" ? "Reserved" : "Cancelled"}</p>
                  <div style={{float:"right"}}>
                    <button className='btn btn-danger' onClick={()=>(cancelroom(book._id,book.roomid))}>Cancel Room</button>
                  </div>
                 </div>
                 <br/>
                  <br/>
                  </div>
                }))}
        </div>
      </div>
    </div>
  )
}

export default UserMyBookings