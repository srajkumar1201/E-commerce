// Function to calculate the total amount from a list of products
const totalAmount=(products)=>{
    try {
        return products.reduce((accumulator, product) => accumulator + product.total, 0);
    } catch (error) {
        return {status:config.error_message,message:error}       
    }
}

// Function to check for products with insufficient stock
const checkQuantity=(products)=>{
    try {
        return products.filter(product => product.stock_quantity<product.order_quantity)
    } catch (error) {
        return {status:config.error_message,message:error}
    }
}


// Export functions
module.exports={
    totalAmount,
    checkQuantity,
}