import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' })
})

app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);

const server = app.listen(port,()=>{
    connectDB();
    connectCloudinary();
    console.log(`Server started at http://localhost:${port}`)
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Stop the running process or set a different PORT in .env.`)
        process.exit(1)
    }
    throw err
})