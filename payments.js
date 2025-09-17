const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const router = express.Router();

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/razorpay/create-order', async (req,res)=>{
  const { amount, orderRef } = req.body;
  const options = { amount, currency:"INR", receipt:orderRef };
  const order = await razor.orders.create(options);
  res.json({success:true, order});
});

router.post('/razorpay/verify', async (req,res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if(generated_signature === razorpay_signature){
    await Order.findByIdAndUpdate(orderId, {
      status:"paid", paymentId: razorpay_payment_id
    });
    return res.json({success:true});
  } else {
    return res.status(400).json({success:false, message:"Invalid signature"});
  }
});

module.exports = router;
