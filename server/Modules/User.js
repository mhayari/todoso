const mongoose=require('mongoose')

const User=mongoose.Schema({
    Nom:{
        type:String,
        required:true
    },
    Prenom:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        Unique:true
    },
    Password:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model('user',User)

mongoose.set('strictQuery', true)

module.exports=userModel
