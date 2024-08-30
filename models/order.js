// Import mongoose
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total_amount: {
        type: Number,
        required: true
    }
});

// Create and export the Order model
module.exports = mongoose.model('Order', orderSchema);   

