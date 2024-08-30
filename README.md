//endpoint to create customer 
####request 
 curl --location 'localhost:3000/customer/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"raj",
    "email":"rajkumar@hafdo23.com",
    "password":"123456",
    "address":{
        "street":"mr.street",
        "city":"coimbature",
        "state":"hj",
        "zip_code":"12347"
        
    }
}'

###response
{
    "status": "success",
    "message": "customer created successfully"
}

//endpoint to create product 
####request 
curl --location 'localhost:3000/product/create' \
--header 'Content-Type: application/json' \
--data '{

    "name":"javascript",
    "price":"190",
    "category":"books",
    "stock_quantity":"12"  
    
}'
###response
{
    "status": "success",
    "message": "product created successfully"
}


//endpoint to create order 
####request 
curl --location 'localhost:3000/order/create' \
--header 'Content-Type: application/json' \
--data '{
    "customer_id":"66d048d92fd752d110052935",
    "items":[{
        "product_id":"66d048bbc64613bb1821ba0d",
        "quantity":2
    },{
        "product_id":"66d04803c64613bb1821ba07",
        "quantity":5
    }]
}'
###response
{
    "status": "success",
    "message": "order created successfully"
}

//endpoint to get orderDetails using order_id
####request 
curl --location 'localhost:3000/order/get/66d0c72c7ad465ee3d4b8c83' \
--data ''
###response
{
    "status": "error",
    "data": {
        "status": "success",
        "data": [
            {
                "_id": "66d0c72c7ad465ee3d4b8c83",
                "customer": {
                    "customer_id": "66d048d92fd752d110052935",
                    "name": "raj",
                    "email": "rajkumar@1mnafd23.com",
                    "address": {
                        "street": "mr.street",
                        "city": "coimbature",
                        "state": "hj",
                        "zip_code": "12347"
                    }
                },
                "product": [
                    {
                        "name": "java",
                        "product_id": "66d048bbc64613bb1821ba0d",
                        "price": 1600,
                        "category": "books"
                    },
                    {
                        "name": "java",
                        "product_id": "66d04803c64613bb1821ba07",
                        "price": 12,
                        "category": "books"
                    }
                ],
                "total_amount": 3260
            }
        ]
    }
}

//endpoint to create orderlist using customer_id 
####request 
curl --location 'localhost:3000/order/list/66d048d92fd752d110052935' \
--data ''
###response
{
    "status": "success",
    "data": [
        {
            "_id": "66d07f1f1df1bfdb50d7abc0",
            "total_amount": 324,
            "quantity": 2,
            "products": {
                "name": "c",
                "product_id": "66d0489ac64613bb1821ba0b",
                "price": 162,
                "category": "books"
            }
        },
        {
            "_id": "66d07f1f1df1bfdb50d7abc0",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0c72c7ad465ee3d4b8c83",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0c72c7ad465ee3d4b8c83",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0d396efe792ab9ed73cd1",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0d396efe792ab9ed73cd1",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0da9fe735a71e1b7941a5",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0da9fe735a71e1b7941a5",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0e52879ebf0bb8ceabe5b",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0e52879ebf0bb8ceabe5b",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0fa0bbfb9072e5190baec",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0fa0bbfb9072e5190baec",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0facef22bed827cdd4e2b",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0facef22bed827cdd4e2b",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d0fad0f22bed827cdd4e32",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d0fad0f22bed827cdd4e32",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        },
        {
            "_id": "66d145a03602d845c7ffefc1",
            "total_amount": 3200,
            "quantity": 2,
            "products": {
                "name": "java",
                "product_id": "66d048bbc64613bb1821ba0d",
                "price": 1600,
                "category": "books"
            }
        },
        {
            "_id": "66d145a03602d845c7ffefc1",
            "total_amount": 60,
            "quantity": 5,
            "products": {
                "name": "java",
                "product_id": "66d04803c64613bb1821ba07",
                "price": 12,
                "category": "books"
            }
        }
    ]
}

//endpoint to  calculate total Sales 
####request 
 curl --location 'localhost:3000/order/total_sales' \
--data ''

###response
{
    "status": "success",
    "data": [
        {
            "total_quantity": 16,
            "total_amount": 25600,
            "product_name": "java",
            "product_price": 1600,
            "product_category": "books",
            "product_id": "66d048bbc64613bb1821ba0d"
        },
        {
            "total_quantity": 45,
            "total_amount": 540,
            "product_name": "java",
            "product_price": 12,
            "product_category": "books",
            "product_id": "66d04803c64613bb1821ba07"
        },
        {
            "total_quantity": 2,
            "total_amount": 324,
            "product_name": "c",
            "product_price": 162,
            "product_category": "books",
            "product_id": "66d0489ac64613bb1821ba0b"
        }
    ]
}

//endpoint to find popularproduct
####request 
 curl --location 'localhost:3000/order/popular' \
--data ''

###response
{
    "status": "success",
    "data": [
        {
            "count": 9,
            "product_id": "66d04803c64613bb1821ba07",
            "product_name": "java",
            "product_price": 12,
            "product_category": "books"
        }
    ]
}
