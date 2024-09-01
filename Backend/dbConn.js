const Mongoose=require('mongoose');

async function databaseConnect(){
    await Mongoose.connect('mongodb+srv://sample250824:FuskUzsdcrpEKa52@car-admin.r7az2.mongodb.net/')
    console.log("database connected")
}

module.exports=databaseConnect;

/*


Nodejs Naming                  Mongodb Naming

Database Setup                 Database creation
and connect

Model                          Collection

Schema                         Documents



*/