// Import Joi for schema validation
const Joi = require('joi');

// Define schema for validating individual items in an order
const itemSchema = Joi.object({
  // 'product_id' must be a string, alphanumeric, exactly 24 characters long (common for MongoDB ObjectId), and is required
  product_id: Joi.string().alphanum().length(24).required(),
  
  // 'quantity' must be an integer, greater than or equal to 1 (positive integer), and is required
  quantity: Joi.number().integer().min(1).required()
});

// Define schema for validating an entire order
const orderSchema = Joi.object({
  // 'customer_id' must be a string, alphanumeric, exactly 24 characters long (common for MongoDB ObjectId), and is required
  customer_id: Joi.string().alphanum().length(24).required(),
  
  // 'items' must be an array of item objects validated by 'itemSchema', and the array must contain at least one item
  items: Joi.array().items(itemSchema).min(1).required()
});

// Define schema for validating order ID parameter
const orderIdSchema = Joi.object({
  // 'order_id' must be a string, alphanumeric, and is required
  order_id: Joi.string().alphanum().required() // Adjust validation as needed (e.g., length or pattern constraints)
});

// Define schema for validating customer ID parameter
const customerIdSchema = Joi.object({
  // 'customer_id' must be a string, alphanumeric, and is required
  customer_id: Joi.string().alphanum().required() // Adjust validation as needed
});

// Export the schemas for use in other parts of the application
module.exports = { orderSchema, orderIdSchema, customerIdSchema };
