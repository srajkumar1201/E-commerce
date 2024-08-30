/* Usage:
 * Import this module into the routing layer to use these functions as
 * handlers for various HTTP routes related to order operations.
 */
// Import dependencies
const config=require("../config")
const orderServices =require("../services/orderServices");
const productService=require("../services/productServices")
const customerServices=require("../services/customerServices")
const {orderSchema,orderIdSchema,customerIdSchema}=require("../validators/orderValidator")
const orderHelper=require("../helpers/orderHelper")


// Function to create a new order
const createOrder=async(req,res)=>{
    try {
        const { error } = orderSchema.validate(req.body);
  
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const {customer_id,items}=req.body;
        const getCustomer=await customerServices.getCustomer(customer_id);
        if(getCustomer.status!==config.success_message){
            return res.status(400).json({
                status:config.error_message,
                message:config.customer_not_exist
            })
        }
       

        const productsTotalAmount=await productService.productsTotalAmount(items)
        if(productsTotalAmount.status!==config.success_message){
            return res.status(500).json({
                status:config.error_message,
                message:productsTotalAmount.message
            })
        }
        const checkQuantity =await orderHelper.checkQuantity(productsTotalAmount.data)
        if(checkQuantity.status){
            return res.status(500).json({
                status:config.error_message,
                message:checkQuantity.message
            })
        }
        if(checkQuantity.length>0){
            return res.status(400).json({
                status:config.error_message,
                message:config.product_out_of_stack,
            })
        }
        if(productsTotalAmount.data.length<items.length || items.length==0){
            return res.status(400).json({
                status:config.error_message,
                message:config.product_not_exist,
            })
        }       
        const totalAmount= await orderHelper.totalAmount(productsTotalAmount.data)

        if(totalAmount.status){
            return res.status(500).json({
                status:config.error_message,
                message:totalAmount.message
            })
        }
        const updateProductStack=await productService.updateProductStack(productsTotalAmount.data)
if(updateProductStack.status==config.error_message){
    
    return res.status(500).json({
        status:config.error_message,
        message:updateProductStack.message
    })
}
        const order=await orderServices.createOrder(customer_id,items,totalAmount)

        if(order.status == config.success_message){

            return res.status(201).json({
                status:config.success_message,
                message:config.order_created
            })
           }else{
            return res.status(500).json({
                status:config.error_message,
                message:order.message
            })
           }
    } catch (error) {
console.log(error);

        return res.status(500).json({
            status:config.error_message,
            message:error
        })
    }
}

// Function to get details of a specific order
const getOrderDetails=async(req,res)=>{
try {
    const { error } = orderIdSchema.validate(req.params);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }    
    const { order_id }=req.params;

    const getOrderDetails=await orderServices.getOrderDetails(order_id)
    if(getOrderDetails.status==config.success_message){
        return res.status(200).json({
            status:config.error_message,
            data:getOrderDetails
        })
    }
} catch (error) {
    return res.status(500).json({
        status:config.error_message,
        message:error
    })
}
}


// Function to list all orders for a specific customer
const listOrders=async(req,res)=>{
    try {
        const { error } = customerIdSchema.validate(req.params);
  
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const {customer_id}=req.params;
        const listOrders= await orderServices.listOrders(customer_id)
         
        if(listOrders.status== config.success_message){
            return res.status(200).json({
                status:config.success_message,
                data:listOrders.data
            })
           }else{
            
            return res.status(500).json({
                status:config.error_message,
                message:customer.message
            })
           }
    } catch (error) {
        return res.status(500).json({
            status:config.error_message,
            message:error
        })
    }
   
}

// Function to calculate total sales for products
const calculateTotalSales=async(req,res)=>{
    try {        
        const calculateTotalSales= await orderServices.calculateTotalSales()
         
        if(calculateTotalSales.status== config.success_message){
            return res.status(200).json({
                status:config.success_message,
                data:calculateTotalSales.data
            })
           }else{
            
            return res.status(500).json({
                status:config.error_message,
                message:calculateTotalSales.message
            })
           }
    } catch (error) {
        return res.status(500).json({
            status:config.error_message,
            message:error
        })
    }
   
}

// Function to get the most popular products
const popularProduct=async(req,res)=>{
    try {
        const papularProduct= await orderServices.popularProduct()
         
        if(papularProduct.status== config.success_message){
            return res.status(200).json({
                status:config.success_message,
                data:papularProduct.data
            })
           }else{
            
            return res.status(500).json({
                status:config.error_message,
                message:papularProduct.message
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
    createOrder,
    getOrderDetails,
    listOrders,
    calculateTotalSales,
popularProduct
    
}