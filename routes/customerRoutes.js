// Sets up routes for handling customer-related HTTP requests.
// Import dependencies

const express = require('express');
const router = express.Router();
const customerController=require("../controllers/customerController");

// Set up route for customer creation
router.post("/create",customerController.createCustomer)

// Export router
module.exports=router