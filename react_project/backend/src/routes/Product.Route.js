const {getProducts,getProductById,getProductByCategory}=require('../controller/Product.Controller')

const productRoutes=[getProducts,getProductById,getProductByCategory]

module.exports=productRoutes;