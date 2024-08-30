// Import mongoose
const mongoose = require('mongoose');

// Define the customer schema
const customerSchema = new mongoose.Schema({

  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique:true
  },
  address: {
      street: {
          type: String,
          required: true
      },
      city: {
          type: String,
          required: true
      },
      state: {
          type: String,
          required: true
      },
      zip_code:   
{
          type: String,
          required: true
      }
  }
});

// Create and export the Customer model
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
