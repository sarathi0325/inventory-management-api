require("dotenv").config()

//extract files
const express=require("express")
const cors=require("cors")
const connectDB = require("./src/config/db")
const stockRoutes=require('./src/routes/stockroutes')
const productRoutes=require("./src/routes/productRoutes")
const reportRoutes=require("./src/routes/reportRoutes");
const supplierRoutes=require("./src/routes/supplierRoutes")
const authRoutes=require("./src/routes/authRoutes")
const uploadRoutes = require("./src/routes/uploadRoutes");



const app=express();

//middlewares
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Inventory ManageMent API Running..")
});

app.use('/api/products',productRoutes)
app.use('/api/suppliers',supplierRoutes)
app.use('/api/stocks',stockRoutes)
app.use('/api/reports',reportRoutes)
app.use('/api/auth',authRoutes)
app.use("/api/upload", uploadRoutes);


const PORT =process.env.PORT || 4000;

const startServer=async()=>{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server Running on http://localhost:${PORT}`)
        })
 }

startServer();


