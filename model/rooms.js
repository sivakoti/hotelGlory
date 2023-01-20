const mongoose = require ("mongoose");

const roomsSchema = mongoose.Schema({
    roomNumber:{
        type : Number,
        required:true
    },
    maxPeople:{
        type : Number,
        required:true
    },
    roomPerDay:{
        type : Number,
        required:true
    },
    images: [],
    bookings: [],
    description:{
        type : String,
        required:true
    }
},{
    timestamps: true,
})

const roomsModel = mongoose.model('rooms',roomsSchema);
module.exports = roomsModel;