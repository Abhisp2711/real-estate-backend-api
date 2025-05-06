const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');


dotenv.config();
//Database connection
connectDB();

//Enables CORS 
const allowedOrigins = ['http://localhost:3000', 'http://192.168.86.31:30000','https://real-estate-parsunet.netlify.app',];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsers for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
   res.json({message: 'Welcom to real-estate-api'});
})

//Routes
app.use('/api/properties',propertyRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/test',testRoutes);


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
   console.log(`Server running on port http://localhost:${PORT}`);
})