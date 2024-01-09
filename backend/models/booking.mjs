import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BookingSchema = new Schema({
    user:{
        type:String
    },
    property:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    totalCost:{
        type:Number
    }
});


const Booking = model('Booking', BookingSchema);

export default Booking;