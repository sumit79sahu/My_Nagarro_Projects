const {getProducts,getProductById}=require('../controller/Product.Controller')

const productRoutes=[getProducts,getProductById]

module.exports=productRoutes;