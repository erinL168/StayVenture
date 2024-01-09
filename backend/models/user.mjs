//help from https://www.youtube.com/watch?v=QzgUb5uLBEc&list=PLw9dqMP7HQV77fkIZvUfsVJkM_WPvw-J-&index=6

import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// import findOrCreate from 'mongoose-findorcreate';

const { Schema, model } = mongoose;




const userSchema = new Schema({

   fname: {
       type: String,
       trim: true,
       required : [true, 'Please add your first name'],
       maxlength: 20
   },
   lname: {
    type: String,
    trim: true,
    required : [true, 'Please add last name'],
    maxlength: 20
    },

   email: {
       type: String,
       trim: true,
       required : [true, 'Please add a E-mail'],
       unique: true,
       match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
       ]

   
    }

    // bookings: [Booking]

//    password: {
//        type: String,
//        trim: true,
//        required : [true, 'Please add a Password'],
//        minlength: [8, 'password must have at least eight(8) characters'],
//        match: [
//             /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
//            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
//        ]
//    }



}, {timestamps: true});



// encrypting password before saving
// userSchema.pre('save', async function(next){

//    if(!this.isModified('password')){
//        next()
//    }
//    this.password = await bcrypt.hash(this.password, 10);
// });




// // verify password
// userSchema.methods.comparePassword = async function(yourPassword){
//     return await bcrypt.compare(yourPassword, this.password);
// }

// // get the token
// userSchema.methods.jwtGenerateToken = function(){
//     return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
//         expiresIn: 3600
//     });
// }

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);



export default User;