/**
 * API Endpoints Documentation
 *
 * This document provides details on the API endpoints for managing customers, products, and orders.
 *
 * **1. Endpoint to Create Customer**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/customer/create' \
 *   --header 'Content-Type: application/json' \
 *   --data-raw '{
 *       "name":"raj",
 *       "email":"rajkumar@hafdo23.com",
 *       "password":"123456",
 *       "address":{
 *           "street":"mr.street",
 *           "city":"coimbature",
 *           "state":"hj",
 *           "zip_code":"12347"
 *       }
 *   }'
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "message": "customer created successfully"
 *   }
 *   ```
 *
 * **2. Endpoint to Create Product**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/product/create' \
 *   --header 'Content-Type: application/json' \
 *   --data '{
 *       "name":"javascript",
 *       "price":"190",
 *       "category":"books",
 *       "stock_quantity":"12"
 *   }'
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "message": "product created successfully"
 *   }
 *   ```
 *
 * **3. Endpoint to Create Order**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/order/create' \
 *   --header 'Content-Type: application/json' \
 *   --data '{
 *       "customer_id":"66d048d92fd752d110052935",
 *       "items":[{
 *           "product_id":"66d048bbc64613bb1821ba0d",
 *           "quantity":2
 *       },{
 *           "product_id":"66d04803c64613bb1821ba07",
 *           "quantity":5
 *       }]
 *   }'
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "message": "order created successfully"
 *   }
 *   ```
 *
 * **4. Endpoint to Get Order Details**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/order/get/66d0c72c7ad465ee3d4b8c83' \
 *   --data ''
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "error",
 *       "data": {
 *           "status": "success",
 *           "data": [
 *               {
 *                   "_id": "66d0c72c7ad465ee3d4b8c83",
 *                   "customer": {
 *                       "customer_id": "66d048d92fd752d110052935",
 *                       "name": "raj",
 *                       "email": "rajkumar@1mnafd23.com",
 *                       "address": {
 *                           "street": "mr.street",
 *                           "city": "coimbature",
 *                           "state": "hj",
 *                           "zip_code": "12347"
 *                       }
 *                   },
 *                   "product": [
 *                       {
 *                           "name": "java",
 *                           "product_id": "66d048bbc64613bb1821ba0d",
 *                           "price": 1600,
 *                           "category": "books"
 *                       },
 *                       {
 *                           "name": "java",
 *                           "product_id": "66d04803c64613bb1821ba07",
 *                           "price": 12,
 *                           "category": "books"
 *                       }
 *                   ],
 *                   "total_amount": 3260
 *               }
 *           ]
 *       }
 *   }
 *   ```
 *
 * **5. Endpoint to Get Orders List by Customer ID**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/order/list/66d048d92fd752d110052935' \
 *   --data ''
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "data": [
 *           {
 *               "_id": "66d07f1f1df1bfdb50d7abc0",
 *               "total_amount": 324,
 *               "quantity": 2,
 *               "products": {
 *                   "name": "c",
 *                   "product_id": "66d0489ac64613bb1821ba0b",
 *                   "price": 162,
 *                   "category": "books"
 *               }
 *           },
 *           // Other orders
 *       ]
 *   }
 *   ```
 *
 * **6. Endpoint to Calculate Total Sales**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/order/total_sales' \
 *   --data ''
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "data": [
 *           {
 *               "total_quantity": 16,
 *               "total_amount": 25600,
 *               "product_name": "java",
 *               "product_price": 1600,
 *               "product_category": "books",
 *               "product_id": "66d048bbc64613bb1821ba0d"
 *           },
 *           {
 *               "total_quantity": 45,
 *               "total_amount": 540,
 *               "product_name": "java",
 *               "product_price": 12,
 *               "product_category": "books",
 *               "product_id": "66d04803c64613bb1821ba07"
 *           },
 *           {
 *               "total_quantity": 2,
 *               "total_amount": 324,
 *               "product_name": "c",
 *               "product_price": 162,
 *               "product_category": "books",
 *               "product_id": "66d0489ac64613bb1821ba0b"
 *           }
 *       ]
 *   }
 *   ```
 *
 * **7. Endpoint to Find Popular Product**
 * - **Request:**
 *   ```
 *   curl --location 'localhost:3000/order/popular' \
 *   --data ''
 *   ```
 * - **Response:**
 *   ```json
 *   {
 *       "status": "success",
 *       "data": [
 *           {
 *               "count": 9,
 *               "product_id": "66d04803c64613bb1821ba07",
 *               "product_name": "java",
 *               "product_price": 12,
 *               "product_category": "books"
 *           }
 *       ]
 *   }
 *   ```
 */
