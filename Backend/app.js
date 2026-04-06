const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes/route'); 
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require("./routes/taskRoutes");

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/ai_data";

console.log("Mongo URI:", mongoURI);

connectDB(mongoURI);


app.use(cors());   
app.use(express.json());
app.use('/api', route);
app.use("/apii", taskRoutes);

//route
app.get('/',(req,res)=>{
    res.send("Get all record")
})


app.listen (port,() =>{
    console.log(`server is running at port : ${port}`)
})