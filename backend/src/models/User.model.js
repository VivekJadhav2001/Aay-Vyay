import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    avatar : {
        type: String,  // cloudinary url
        // default: null
    },
    refreshToken: {
        type: String,
    }

},
{
    timestamps: true
})

// Hash Password before saving to database

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// custom method to compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// custom method to generate Accesstoken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// custom method to generate Refreshtoken
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model('User', userSchema)