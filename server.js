require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("✅ MongoDB Connected"))
.catch(err=>console.error(err));

app.use('/api/payments', paymentsRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`🚀 Backend running on ${PORT}`));
