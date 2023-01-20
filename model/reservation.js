const mongoose = require ("mongoose");

const reservationSchema = mongoose.Schema({
    roomNumber:{
        type : Number,
        required:true
    },
    roomid:{
        type : String,
        required:true
    },
    userid:{
        type : String,
        required:true
    },
    checkin:{
        type : String,
        required:true
    },
    checkout:{
        type : String,
        required:true
    },
    totalpayment:{
        type : Number,
        required:true
    },
    totaldays:{
        type : Number,
        required:true
    },
    status:{
        type : String,
        required:true,
        default:'reserved'
    }
},{
    timestamps: true,
})

const reservationModel = mongoose.model('reservations',reservationSchema);
module.exports = reservationModel;