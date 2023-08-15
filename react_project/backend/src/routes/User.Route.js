const {userSignUp,userLogin,userEmailVerify,userResendVerifyCode,userEdit,userDelete}=require('../controller/User.Controller')

const userRoutes=[userSignUp,userLogin,userEmailVerify,userResendVerifyCode,userEdit,userDelete]

module.exports=userRoutes;