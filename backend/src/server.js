import dotenv from "dotenv"
import connectDB from "./db/db.js";
import {app} from './app.js'


const port = process.env.PORT || 8000

dotenv.config({
    path:'./env'
})


connectDB()
.then(() => {
    app.listen(port,() => {
        console.log(` Server Is  Running at ${port}`);
    })
})
.catch((err)=>{
    console.log(`MONGODB connection failled!!!`, err)
})


//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users",userRouter)



