const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/Akbar",{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false})
.then( () => console.log("connection successfull..."))
.catch( (err) => console.log(err)); 

const Schema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        trim :true, 
        minlength : 2 ,
        maxlength : [10,"maximum 10 latter allowed"]
    },
    city : {
        type : String,
        require : true,
        lowercase : true,
    }, 
    email :{
        type : String,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },   
    pincode : Number,
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
})

const Model = new mongoose.model('akbarabbas',Schema);

const createdata = async()=>{
    try{
        const firstmodel = new Model({
            name : "Mahedi",
            city : "chhapi",
            email : "mahedi@gmail.com",
            pincode : 385510,
            active : true
         })
    
        const secondmodel = new Model({
            name : "Migdad",
            city : "patan",
            email : "migdad@gmail.com",
            pincode : 385565,
            active : true
        })
    
        const thirdmodel = new Model({
            name : "Kurban",
            city : "mahesana",
            email : "kurban@gmail.com",
            pincode : 385541,
            active : true
        })
    
        const forthmodel = new Model({
            name : "Sabir",
            city : "unja",
            email : "sabir@gmail.com",
            pincode : 385562,
            active : true
         })
            
        const result = await Model.insertMany([firstmodel,secondmodel,thirdmodel,forthmodel]);
        console.log(result);
    }catch(err){
        console.log(err)
    }
}   
// createdata();    

const getdata = async(err,data)=>{
    try{
        const result = await Model.find()
        data = console.log(result);
        console.log(data)
    }catch(err){
        console.log(err);
    }
}
getdata();

const updatedata = async(_id)=>{
    try{
        
        const result = await Model.findByIdAndUpdate({_id},{
            $set : 
            { 
                pincode : 385510,
                new : true
            }
               
            })
        console.log(result);
    }catch(err){
        console.log(err);
    }   
}    
// updatedata('6155ae57ccc15e3e608c55c6');    

const deletedata = async(_id)=>{
    try{
        const result = await Model.findByIdAndDelete({_id});
        console.log(result);
    }catch(err){
        console.log(err);
    }  
}
deletedata('6155ae57ccc15e3e608c55c3');    

