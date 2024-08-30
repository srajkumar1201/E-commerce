// Import Joi for schema validation
const Joi = require('joi');

// Define the validation schema for product data
const productValidationSchema = Joi.object({
    // 'name' must be a string with at least 1 character and is required
    name: Joi.string().min(1).required(),
    
    // 'price' must be a positive number and is required
    price: Joi.number().positive().required(),
    
    // 'category' must be a string with at least 1 character and is required
    category: Joi.string().min(1).required(),
    
    // 'stock_quantity' must be an integer greater than or equal to 0 and is required
    stock_quantity: Joi.number().integer().min(0).required()
});

// Export the schema for use in other parts of the application
module.exports = productValidationSchema;
