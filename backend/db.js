const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"

const conectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connect to mongo successfully!");
    })
}

module.exports=conectToMongo;