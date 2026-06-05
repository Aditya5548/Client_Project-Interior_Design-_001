require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./config/db.js");
connectDB();
const PORT = process.env.PORT || 8005;
app.get('/',(req,res)=>{
    console.log("API Hitting")
    res.send({success:true,status:'Backend Running'})
})

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});