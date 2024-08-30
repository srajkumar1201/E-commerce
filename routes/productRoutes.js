// Import dependencies
const express = require('express');
const router = express.Router();
const productController=require("../controllers/productController");
// Set up route for product creation
router.post("/create",productController.createProduct)

// Export router
module.exports=router