const express = require("express");
const router = express.Router();

const Reservation = require('../model/reservation');
const Rooms = require('../model/rooms');

router.post("/reservenow",async(req,res)=> {
    const {
        rooms,
        userid,
        checkin,
        checkout,
        totalpayment,
        totaldays}=req.body;
       try{
        const newreserve = new Reservation({
            roomNumber: rooms.roomNumber,
            roomid:rooms._id,
            userid,
            checkin,
            checkout,
            totalpayment,
            totaldays
        });
        const reser = await newreserve.save();
        const currentreservationdata = await Rooms.findOne({_id : rooms._id});
        currentreservationdata.bookings.push({reservationid:reser._id,checkin:checkin,checkout:checkout,userid:userid,roomstatus:reser.status});
        await currentreservationdata.save();
        res.send("room reservation done");     
    }
        catch(error){
            return res.status(400).json({error});
        }
});

router.get("/reservenow",async(req,res)=>{
    const reser = await Reservation.find();
    res.send(reser);
})

router.post("/mybookings",async(req,res)=>{
    const userid = req.body.userid;
    const reserv = await Reservation.find({userid:userid});
    res.send(reserv);
})

router.post("/cancelreservation",async(req,res)=>{
    const {reserveid,roomid} = req.body;
    const reserva = await Reservation.findOne({_id:reserveid});
    reserva.status="cancelled";
    await reserva.save()
    const room = await Rooms.findOne({_id:roomid})
    const booki =room.bookings;
    const tempo = booki.filter(reservat => reservat.reservationid.toString() !== reserveid)
    room.bookings=tempo;
    await room.save()
})

module.exports = router;