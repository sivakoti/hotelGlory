import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import Room from '../Component/Room';

const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };


const { RangePicker } = DatePicker;
function Home() {
    const [rooms, saverooms] = useState([]);
    const [temprooms, savetemprooms] = useState([]);
    const [loading, saveloading] = useState();
    const [error, saveerror] = useState();
    const [checkin, savecheckin] = useState();
    const [checkout, savecheckout] = useState();
    const [roomavail,saveroomavail]=useState([])
    useEffect(() => async function() {
        try {
            saveloading(true);
            const data = (await axios.get('/getroom/getRooms')).data;
            saverooms(data);
            savetemprooms(data);
            saveloading(false);
        } catch (error) {
            saveerror(true);
            console.log(error);
            saveloading(false);
        }
    }, [])
   
    function date(bookingdates) 
    {
        savecheckin(moment(bookingdates[0]).format('MMM Do YYYY, dddd'));
        savecheckout(moment(bookingdates[1]).format('MMM Do YYYY, dddd'));
        var avail = false;
        for (const rooms of temprooms) {
            if (rooms.bookings.length > 0) {
                for (const booking of rooms.bookings) {
                    if (!(moment(moment(bookingdates[0]).format('MMM Do YYYY, dddd')).isBetween(booking.checkin, booking.checkout)) && !(moment(moment(bookingdates[1]).format('MMM Do YYYY, dddd')).isBetween(booking.checkin, booking.checkout))) {
                        if (((moment(bookingdates[0]).format('MMM Do YYYY, dddd')) !== booking.checkin) && ((moment(bookingdates[0]).format('MMM Do YYYY, dddd')) !== booking.checkout) && ((moment(bookingdates[1]).format('MMM Do YYYY, dddd')) !== booking.checkin) && ((moment(bookingdates[1]).format('MMM Do YYYY, dddd')) !== booking.checkout)) {
                            avail = true;
                        }
                    }
                }
            }  if (avail == true || rooms.bookings.length == 0) {
                roomavail.push(rooms);
            }
            saverooms(roomavail);
        }
    }
   function filterguest(guest){
        const temp =temprooms.filter(rooms=>rooms.maxPeople == guest);
        saverooms(temp);
    }

    return (
        <div className='container'>
            <div className='row mt-2  bsw'>
                <div className='col-md-5'>
                    <RangePicker disabledDate={disabledDate} showTime format="MM-DD-YYYY" onChange={date} />
                </div>
                <div className='col-md-5' style={{float:'right'}}>
                    <label>Guests: </label>
                    <select onChange={(guest)=>{filterguest(guest.target.value)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
                    </select>
                </div>
            </div>
            <div className='row justify-content-centre'>
                {error ? (<h1>error</h1>) : rooms.map(room => {
                    return <div className='com-md-9'>
                        <Room room={room} checkin={checkin} checkout={checkout} />
                    </div>
                })}
            </div>
        </div>
    )
}
export default Home