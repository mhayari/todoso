const express=require('express')
const cors=require('cors')
const userModel=require('./Modules/User')
const mongoose=require('mongoose')
const taskModel = require('./Modules/Task')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1/Todos')

app.listen(9000,()=>console.log('running 9000...'))

//log a user
app.post('/log',async(req,res)=>{
    const user=req.body
    try{
        const result=await userModel.findOne({Email:user.Email,Password:user.Password})
        if(result){
           
            res.send(result)
            // console.log(user,24)
    }else{
        res.send('you do not have account yest? please register')
        console.log('not dial not')
   }
    }catch(err){console.log(err,29)}
})

//Add a User
app.post('/addUser',async(req,res)=>{
    const user=req.body
    try{
        const result=await userModel.findOne({Email:user.Email})
        if(result){
            res.send('cet utilisateur existe deja')
            console.log('cet utilisateur existe deja')
        }else{
            const newUser= new userModel(user)
            const element=await newUser.save()
            console.log(newUser,43)
            res.send('Added')
        }
    }catch(err){console.log(err,46)}
})


//Add a Task
app.post('/addTask', async(req,res)=>{
    // add
    const task=req.body
    try{
    const newTask=new taskModel(task)
    console.log(task.user,task.rating,56)
    const element=await newTask.save()
    // console.log(element,58)
    // console.log(newTask)
    res.send('task added')
}catch(err){console.log(err,61)}

})
//Get a Task
app.get('/listTask',async(req,res)=>{//affichage
    try{
   const result= await taskModel.find()
        res.send(result)
    }catch(err){console.log(err.message,69)}
})

app.get('/userTask/user/:userId',async(req,res)=>{
    const id = req.params.userId

    const test = await userModel.findOne({_id : id})
    // console.log(test)
    if(test){
        const result = await taskModel.find({user : id})
        res.send(result)
        // console.log(result,80)
    }else{
        res.send("user doesn t")
        // console.log('no send')
    }
})

app.delete('/taskDelete/task/:taskId',async(req,res)=>{
    id=req.params.taskId
    const test = await taskModel.findOne({_id : id})
    if(test){
    const result = await taskModel.deleteOne({_id:id})
        res.send(id)
        console.log(req.body,94)
    }else{
        res.send("user doesn t exist")
        // console.log('no send')
    }
})
app.put('/taskUpdate/task',async(req,res)=>{
    const updateTask=req.body
    const test1 = await taskModel.findByIdAndUpdate(updateTask._id,updateTask)
    if(test1){
       await test1.save()
        res.send(updateTask)
        console.log(updateTask,104)
    }else{
        res.send("user doesn t exist")
        // console.log('no send')
    }
})



// app.post('/addTask', async(req,res)=>{
//     // add
//     const task=req.body
//     try{
//     const newTask=new taskModel(task)
//     console.log(newTask,56)
//     const element=await newTask.save()
//     // console.log(element,58)
//     // console.log(newTask)
//     res.send('task added')
// }catch(err){console.log(err,61)}