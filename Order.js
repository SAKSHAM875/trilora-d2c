const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  products: [{ name:String, price:Number, qty:{type:Number, default:1} }],
  customer: { name:String, email:String, phone:String, address:String },
  amount: Number,
  status: { type:String, default:"pending" },
  createdAt: { type:Date, default:Date.now }
});
module.exports = mongoose.model("Order", OrderSchema);
