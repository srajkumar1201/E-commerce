// Import required modules
const express = require('express');  
const mongoose = require('mongoose'); 
const app = express(); 
const server = require('http').createServer(app);  
const morgan = require('morgan');  
const customerRoutes = require('./routes/customerRoutes.js');  
const orderRoutes = require('./routes/orderRoutes.js');  
const productRoutes = require('./routes/productRoutes.js');  

var bodyParser = require('body-parser');  // Middleware to parse request bodies
let fileupload = require('express-fileupload');  // Middleware for handling file uploads
let cors = require('cors');  // Middleware for enabling Cross-Origin Resource Sharing
require('dotenv').config();  // Load environment variables from a .env file
let corsOptions = {};  // Options for CORS

// Connect to MongoDB using the connection string from environment variables
const dbURI = process.env.DATABASE_URL;
mongoose
  .connect(dbURI)
  .then(() => console.log('DB connected')) 
  .catch((err) => console.log(err));  

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => console.log('Server is running on port:', process.env.PORT));

// Middleware setup
app.use(bodyParser.json({ limit: '50mb' }));  // Parse JSON bodies with a 50MB size limit
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));  // Parse JSON with extended options
app.use(express.text({ limit: '50mb', type: 'text/html' }));  // Parse text bodies with a 50MB size limit

app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Parse URL-encoded bodies with extended options
app.use(morgan('dev'));  // Log HTTP requests in 'dev' format
app.use(fileupload());  // Enable file uploads

// Set up routes with CORS enabled
app.use('/product', cors(corsOptions), productRoutes); 
app.use('/customer', cors(corsOptions), customerRoutes);  
app.use('/order', cors(corsOptions), orderRoutes);  

// Handle server shutdown
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose connection closed successfully');  
    process.exit(0);  // Exit the process
  });
});
