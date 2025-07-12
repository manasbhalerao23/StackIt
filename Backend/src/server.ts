import app from './app';
import dotenv from "dotenv"
import mongoose from 'mongoose';
dotenv.config()
const PORT = process.env.PORT || 3000;
async function main() {
    
    await mongoose.connect("mongodb+srv://dbUser:Password123@cluster0.lyzd4gp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(3000);
}

main()
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log("Server Running on "+ PORT);
        
    })
    
})
.catch((err) => {
    console.error("can't connect to Database", err);
  });
