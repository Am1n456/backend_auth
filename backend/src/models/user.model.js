import mongoose,{Schema} from "mongoose"

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type:String,
    },
    password:{
        type:String,
        required: true,
        minlength: 6,
    }
},{timestamps: true})

const User = mongoose.model("User",userSchema)

export default User