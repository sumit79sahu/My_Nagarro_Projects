const category =require('../model/Category');
const product =require('../model/Product');
const sequelize = require("../database/Db");
const getCategories=
{
    path:'/api/categories',
    method:'get',
    handler:async(req,res)=>
    {
        try {
            // const result= await category.findAll();
            const result=await category.findAll({
                attributes: ['categoryId', 'category', 'categoryImage'],
                include: [{
                  model: product,
                  attributes: ['productPrice'],
                  order: [['productprice', 'ASC']],
                  limit: 1,
                }]
              })
              console.log(result);
            res.json(result);
        } catch (error) {
            console.log(error)
             res.sendStatus(404);
        }
    }
}
module.exports={getCategories}
