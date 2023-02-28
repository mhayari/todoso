const mongoose=require('mongoose')

const Task=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }, 
    posterUrl:{
        type:String
    }, 
    rating:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})

const taskModel=mongoose.model('task',Task)
mongoose.set('strictQuery', true)

module.exports=taskModel
