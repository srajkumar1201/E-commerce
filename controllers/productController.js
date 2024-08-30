/* Usage:
 * Import this module into the routing layer to use these functions as
 * handlers for various HTTP routes related to product operations.
 */
// Import dependencies
const config =require('../config')
const productValidationSchema =require('../validators/productValidator')
const productService=require('../services/productServices')


// Function to create a product
const createProduct=async(req,res)=>{
    try {        
        const { error } = productValidationSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
        const {name,price,category,stock_quantity}=req.body;

       const product=await productService.createProduct(name,price,category,stock_quantity)
        
       if(product.status== config.success_message){
        return res.status(201).json({
            status:config.success_message,
            message:config.product_created
        })
       }else{
        return res.status(400).json({
            status:config.error_message,
            message:product.message
        })
       }
    } catch (error) {
        return res.status(500).json({
            status:config.error_message,
            message:error
        })
    }
}

// Export functions 
module.exports={
    createProduct,
    
}