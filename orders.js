const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/create', async (req,res)=>{
  const order = new Order(req.body);
  await order.save();
  res.json({success:true, order});
});

router.get('/:id', async (req,res)=>{
  const order = await Order.findById(req.params.id);
  res.json(order);
});

module.exports = router;
