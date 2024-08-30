// Import required modules
const Customer=require("../models/customer")
const mongoose = require('mongoose');
const config=require('../config');

// Function to create a new customer
const createCustomer=async(name,email,street, city,state ,zip_code)=>{    
    try {        
       const customer=  await Customer.create({
        name,
        email,
        address:{
            street,
            city,
            state,
            zip_code
        }     
    })
        return {status:config.success_message,data:customer }
    } catch (error) {
        return {status:config.error_message,message:error}
    }
}

// Function to get a specific customer by ID
const getCustomer=async(id)=>{
    try {
        const customer = await Customer.findById(id)
        return {status:config.success_message,data:customer }

    } catch (error) {
        return {status:config.error_message,message:error}
    }
}

// Export functions
module.exports={
    createCustomer,
    getCustomer,
}