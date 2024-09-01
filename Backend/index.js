//importing all the files and packages

const express=require('express');
const db=require('./dbConn.js')
const UserModel=require('./userSchema.js')
const cors=require('cors');

//all the constants

const app=express();
const port=3000

//In which form the data is send from the frontend

app.use(express.json())
app.use(cors());

//database function call

db();

//routes

app.get('/',function(req,res){
    res.send("welcome to car Admin")
})

//User routes


//createUser

app.post('/admin/create-user',async function(req,res){
    const name=req.body.name
    const email=req.body.email
    const phone=req.body.phone

    if(!name || !email || !phone){
        res.json({
            message:"Missing details",
            success:false
        })
    }else{

        try {
            const response=await UserModel.create({name,email,phone});
            
            if(response){
                res.json({
                    message:"Successfully Created",
                    success:true
                })
            }
        } catch (error) {
            console.log(error.message)
            
        }
        
    }

})

//all user

app.get('/admin/all-user',async function (req,res) {
    try {
        const response= await UserModel.find();
        if(response){
            res.json({
                data:response,
                success:true
            })
        }else{
            res.json({
                message:"something went wrong",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})


//find all users with a particular condition

app.get('/admin/all-conditioned-user',async function (req,res) {

    const name=req.params.name

    try {
        const response= await UserModel.find({name});
        if(response){
            res.json({
                data:response,
                success:true
            })
        }else{
            res.json({
                message:"something went wrong",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

//get particular user

app.post('/admin/user',async function (req,res) {

    const email=req.body.email
    
    try {
        const response= await UserModel.findOne({email});
        if(response){
            res.json({
                data:response,
                success:true
            })
        }else{
            res.json({
                message:"email is missing",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

//update user

app.put('/admin/update-user',async function (req,res) {
    const email=req.body.email
    const name=req.body.name;
    const phone=req.body.phone;
    try {
        if(email){
            let response;
            if(name && phone){
                response=await UserModel.findOneAndUpdate({email:email},{name:name,phone:phone},{new:true});
                if(response){
                    res.json({
                        message:"data updated successfully",
                        success:true
                    })
                }
            }else if(name){
                response=await UserModel.findOneAndUpdate({email:email},{name:name},{new:true});
                if(response){
                    res.json({
                        message:"data updated successfully",
                        success:true
                    })
                } 
            }else if(phone){
                response=await UserModel.findOneAndUpdate({email:email},{phone:phone},{new:true});
                if(response){
                    res.json({
                        message:"data updated successfully",
                        success:true
                    })
                }
            }else{
                res.json({
                    message:"name or phone is missing",
                    success:false
                })
            }
        }else{
            res.json({
                message:"email is missing",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})


//delete user

app.delete('/admin/delete-user', async function(req,res){
    const email=req.body.email
    if(!email){
        return res.json({
            message:"email is missing",
            success:false
        })
    }
    try {
        const response= await UserModel.deleteOne({email})
        if(response){
            res.json({
                message:"Data deleted Successfully",
                success:true
            })
        }
        else{
            res.json({
                message:"email is missing",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})



//server listening

app.listen(port)


