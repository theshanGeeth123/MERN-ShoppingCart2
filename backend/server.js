import express from 'express';

import dotenv from 'dotenv';
import { connectDB } from './DBConnection/db.js';

import Product from './Models/Products.model.js';

import ProductRoutes from './Routes/Product.routes.js';

import CustomerRoutes from './Routes/Customer.route.js';

import AdminRoutes from './Routes/Admin.route.js';

import CardRoutes from './Routes/UserCardDetails.route.js';



import cors from 'cors';

//kLoS1e7fxVf99olg


//mongodb+srv://theshangeethanjana:<db_password>@cluster0.qo8beha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

dotenv.config();



const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/products',ProductRoutes);
app.use('/api/customers',CustomerRoutes);
app.use('/api/admin',AdminRoutes)
app.use("/api/card", CardRoutes);


app.listen(5000,()=>{

   connectDB();

    console.log("Server started at http://localhost:5000");

})