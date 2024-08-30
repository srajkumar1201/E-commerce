// Import dependencies

const express = require('express');
const router = express.Router();
const orderController=require("../controllers/orderController");

// Set up routes for order management
router.post("/create",orderController.createOrder);
router.get("/get/:order_id",orderController.getOrderDetails)
router.get("/list/:customer_id",orderController.listOrders)
router.get("/total_sales",orderController.calculateTotalSales)
router.get("/popular",orderController.popularProduct)

// Export router
module.exports=router
