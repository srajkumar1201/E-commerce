// Import Joi for schema validation
const Joi = require('joi');

// Define schema for validating address information
const addressSchema = Joi.object({
    // 'street' must be a string with a minimum of 1 character and a maximum of 100 characters, and is required
    street: Joi.string().min(1).max(100).required(),
    
    // 'city' must be a string with a minimum of 1 character and a maximum of 50 characters, and is required
    city: Joi.string().min(1).max(50).required(),
    
    // 'state' must be a string with exactly 2 characters (e.g., US state abbreviation), and is required
    state: Joi.string().length(2).required(),
    
    // 'zip_code' must be a string matching the pattern for US ZIP codes (5 digits, optionally followed by a hyphen and 4 more digits), and is required
    zip_code: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required()
});

// Define schema for validating customer information
const customerSchema = Joi.object({
    // 'name' must be a string with a minimum of 3 characters and a maximum of 30 characters, and is required
    name: Joi.string().min(3).max(30).required(),
    
    // 'email' must be a valid email address and is required
    email: Joi.string().email().required(),
    
    // 'password' must be a string with a minimum of 6 characters, and is required
    password: Joi.string().min(6).required(),
    
    // 'address' must conform to the 'addressSchema' and is required
    address: addressSchema.required()
});

// Export the customer schema for use in other parts of the application
module.exports = customerSchema;
