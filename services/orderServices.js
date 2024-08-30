/* Usage:
* Import this module into the controller to access the service functions
* and perform operations on order data.
*/

// Import required modules
const Order=require("../models/order")
const mongoose = require('mongoose');
const config=require('../config');

// Function to create a new order
const createOrder=async(customer_id,items,total_amount)=>{
    try {        
       const order= await Order.create({
            customer_id,
            items:items,
            total_amount
        })
        return {status:config.success_message,data:order }
    } catch (error) {
        return {status:config.error_message,message:error}
    }
}

// Function to get details of a specific order
const getOrderDetails=async(order_id)=>{
  try {
    const orderDetails=await Order.aggregate().match({
        $and:[{_id:new mongoose.Types.ObjectId(order_id)}]
    }).unwind({
        path:"$items"
    }).lookup({
        from:"customers",
        localField:"customer_id",
        foreignField:"_id",
        as:"customerDetails"
    }).lookup({
        from:"products",
        localField:"items.product_id",
        foreignField:"_id",
        as:"productDetails"
    }).project({
        _id:1,
        total_amount:1,
        customer:{
            customer_id:{$arrayElemAt:["$customerDetails._id",0]},
            name:{$arrayElemAt:["$customerDetails.name",0]},
            email:{$arrayElemAt:["$customerDetails.email",0]},
            address:{$arrayElemAt:["$customerDetails.address",0]}
        },
        product:{
        name:{$arrayElemAt:["$productDetails.name",0]},
        product_id:{$arrayElemAt:["$productDetails._id",0]},
        price:{$arrayElemAt:["$productDetails.price",0]},
        category:{$arrayElemAt:["$productDetails.category",0]},
        }
    }).group({
    _id:"$_id",
    customer: { $first: "$customer" },
    product: { $push: "$product" },
    total_amount: { $first: "$total_amount" }
    })
    return {status:config.success_message,data:orderDetails }

  } catch (error) {
    return {status:config.error_message,message:error}
  }
    
}

// Function to list all orders for a specific customer
const listOrders=async(id)=>{
    try {

        const listOrder = await Order.aggregate().match({
            $and:[{customer_id:new mongoose.Types.ObjectId(id)}]
        }).unwind({
                path:"$items"
            })
        .lookup({
            from:"products",
            localField:"items.product_id",
            foreignField:"_id",
            as:"productDetails"
        }).addFields({
            total_amount: {
                $multiply: [
                  "$items.quantity",
                  {$first:"$productDetails.price"}
                ]
              }
        })
        .project({
            _id:1,
            total_amount: 1,
            quantity:"$items.quantity",
            products:{
                name:{$arrayElemAt:["$productDetails.name",0]},
                product_id:{$arrayElemAt:["$productDetails._id",0]},
                price:{$arrayElemAt:["$productDetails.price",0]},
                category:{$arrayElemAt:["$productDetails.category",0]}

            }
        }).exec()
    
        return {status:config.success_message,data:listOrder }

    } catch (error) {        
        return {status:config.error_message,message:error}
    }
}

// Function to calculate total sales for products
const calculateTotalSales=async(id)=>{
    try {

        const calculateTotalSale = await Order.aggregate().unwind({
            path:"$items"
        })
    .lookup({
        from:"products",
        localField:"items.product_id",
        foreignField:"_id",
        as:"productDetails"
    }).addFields({
        total_amount: {
            $multiply: [
              "$items.quantity",
              {$first:"$productDetails.price"}
            ]
          }
    })
    .group({
        _id: "$items.product_id", // Group by product_id
        total_quantity: { $sum: "$items.quantity" }, // Sum of quantities
        total_amount: { $sum: "$total_amount" }, // Sum of total amounts
        product_name: {$first:{ $first: "$productDetails.name" }}, // Get product details
        product_price: { $first:{ $first: "$productDetails.price" }}, // Get product details
        product_category: { $first:{ $first: "$productDetails.category"}} // Get product details
    }).project({
        _id: 0, 
        product_id: "$_id",
        total_quantity: 1,
        total_amount: 1,
        product_name: 1,
        product_price: 1,
        product_category: 1
      }).sort({total_amount:-1}).exec()

    
        return {status:config.success_message,data:calculateTotalSale }

    } catch (error) {        
        return {status:config.error_message,message:error}
    }
}

// Function to get the most popular products
const popularProduct=async(id)=>{
    try {

        const popularProduct = await Order.aggregate().unwind({
            path:"$items"
        })
        .group({
            _id: "$items.product_id", 
            count: { $sum: 1 } 
          })
    .lookup({
        from:"products",
        localField:"_id",
        foreignField:"_id",
        as:"productDetails"
    }).unwind({
        path:"$productDetails"
    }).sort({count:-1}).limit(10)
  .project({
    _id: 0, // Exclude the default _id field from the output
    product_id: "$_id",
    count: 1,
    product_name: "$productDetails.name",
    product_price: "$productDetails.price",
    product_category: "$productDetails.category"
  }).limit(1).exec()

        return {status:config.success_message,data:popularProduct }
    } catch (error) {        
        return {status:config.error_message,message:error}
    }
}

// Export functions 
module.exports={
    createOrder,
    getOrderDetails,
    listOrders,
    calculateTotalSales,
    popularProduct
}