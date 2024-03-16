import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    is_admin:{
        type:Number,
        default:0
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;

