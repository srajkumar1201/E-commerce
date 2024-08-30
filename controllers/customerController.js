const config=require('../config')
const customerServices=require("../services/customerServices")
const customerValidator=require("../validators/customerValidator")


//create new customer
const createCustomer=async(req,res)=>{
    try {
        const { error } = customerValidator.validate(req.body);
  
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const {name,email,address}=req.body;
        const customer= await customerServices.createCustomer(name,email,address.street, address.city,address.state ,address.zip_code)
         
        if(customer.status== config.success_message){
            return res.status(201).json({
                status:config.success_message,
                message:config.customer_created
            })
           }else{
            
            return res.status(400).json({
                status:config.error_message,
                message:customer.message
            })
           }
    } catch (error) {
        return res.status(400).json({
            status:config.error_message,
            message:error
        })
    }
   
}




module.exports={
    createCustomer,
        
}