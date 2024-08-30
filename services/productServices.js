// Import required modules
const Product = require("../models/product");  
const mongoose = require('mongoose');
const config = require('../config'); 
// Function to create a new product
const createProduct = async (name, price, category, stock_quantity) => {
    try {
        const product = await Product.create({
            name,
            price,
            category,
            stock_quantity
        });
        return { status: config.success_message, data: product };
    } catch (error) {
        return { status: config.error_message, message: error };
    }
};

// Function to calculate the total amount of products based on order items
const productsTotalAmount=async(items)=>{
try { 
    const idsAndQuantities = items.map(item => ({
        product_id: new mongoose.Types.ObjectId(item.product_id),
        quantity: item.quantity
    }));
    const totalAmount = await Product.aggregate().match({
        _id: { $in: idsAndQuantities.map(item => item.product_id) }
    }).addFields({
        quantity: {
            $arrayElemAt: [
                {
                    $filter: {
                        input: idsAndQuantities,
                        as: 'item',
                        cond: { $eq: ['$$item.product_id', '$_id'] }
                    }
                },
                0
            ]
        }
    }).match({$expr: {
        $gte: ['$stock_quantity', '$quantity.quantity']
    }}).project({
        _id: 1,
        name: 1,
        price:1,
        stock_quantity:1,
        order_quantity: '$quantity.quantity',
        total:{$multiply:["$price","$quantity.quantity"]}
    })

    
return {status:config.success_message,data:totalAmount }

} catch (error) {
    console.log(error);

    return {status:config.error_message,message:error}
    
}
}

// Update product stock quantities based on provided data
const updateProductStack=async(productData)=>{
    try {
        productData.map(async (data)=>{
            await Product.findOneAndUpdate(
                { _id: data._id },
                { $inc: { stock_quantity: -data.order_quantity } },
                { new: true } 
              );
        
              return {status:config.success_message,data:"updated" }
        
        })
    } catch (error) {
        return {status:config.success_message,message:error }

    }
    }
    
// Export functions
module.exports={
    createProduct,
    productsTotalAmount,
    updateProductStack
}