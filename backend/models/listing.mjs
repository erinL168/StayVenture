

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ListingSchema = new Schema({
    owner:{
        type:String
    },
    title:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: true
    },
    prov_state:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    postalCode:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    geocode: {
        type: [Number], // Array of numbers
        required: true
    },
    comments: [
        {
          username: String,
          rating: Number,
          message: String
        }
      ],
      images:[
        {
            type: Object,
            require: true
        }
    ]
});


const Listing = model('Listing', ListingSchema);

export default Listing;