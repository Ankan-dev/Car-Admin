const Mongoose=require('mongoose');

const carSchema=Mongoose.Schema({
    model_id:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    color:{
        type:String,
        require:true
    }
});

const CarModel=Mongoose.model("CarModel",carSchema);

module.exports=CarModel;