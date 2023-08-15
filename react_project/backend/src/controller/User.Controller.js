const { CognitoUserAttribute, AuthenticationDetails} = require('amazon-cognito-identity-js');
const {CognitoUser} =require('amazon-cognito-identity-js')
const AwsUserPool=require('../utils/AwsUserPool')
const User=require('../model/User')
const jwt = require('jsonwebtoken');

const userSignUp=
{
    path:'/api/signup',
    method:'post',
    handler:async(req,res)=>
    {   
        try {
            const {name,email,password}=req.body;
            const attributes=[
                new CognitoUserAttribute({Name:'email',Value:email}),
            ]
            AwsUserPool.signUp(email,password,attributes,null,async(err,awsResult)=>
            {
                if(err)
                {
                  
                    return res.status(200).json({ message: err.code });
                }
                await User.create({userEmail:email,userName:name})
                res.status(200).json({message:'success'})
            })

        } catch (error) {
            console.log(error)
             res.status(404).json({message:'fail'});
        }
    }
}

const userEdit={
    path:'/api/useredit/:userEmail',
    method:'put',
    handler:async(req,res)=>
    {
        const {authorization}=req.headers
        const {userEmail}=req.params
        const {name,gender,mobileno}=req.body
        if(!authorization) res.status(401).json({message:'No authorization'});

        const token=authorization.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,async (err,decoded)=>
        {
            if(err) return res.status(401).json({message:'unauthorizised user'})
            const {email,isVerified}=decoded
            if(email !=userEmail) return res.status(403).json({ message: "no user found with this email" })
            if (!isVerified) return res.status(403).json({ message: 'you need to verify your email before you can update your data' })
            await User.update({userName:name,userGender:gender,userMobileNo:mobileno},{where:{userEmail}})
            const {userName,userGender,userMobileNo}=await User.findOne({where:{userEmail}});
            jwt.sign(
                {
                    email,
                    isVerified,
                    name:userName,
                    gender:userGender,
                    mobileno:userMobileNo
                },process.env.SECRET_KEY,{expiresIn:'2d'},(err,token)=>{
                    if(err) return res.status(500).json({message:'fail'})
                    res.status(200).json({message:'success',token})
                }
            )
        })

    }
}

const userDelete={
    path:'/api/userdelete/:userEmail',
    method:'delete',
    handler:async(req,res)=>
    {
        try {
            const {authorization}=req.headers
            const {userEmail}=req.params
            if(!authorization) res.status(401).json({message:'No authorization'});
            const token=authorization.split(' ')[1];
    
            jwt.verify(token,process.env.SECRET_KEY,async (err,decoded)=>{
                if(err) return res.status(401).json({message:'unauthorizised user'})
                const {email}=decoded
                if(email!=userEmail) return res.status(403).json({ message: "no user found with this email" })

                new CognitoUser({ Username: email, Pool: AwsUserPool }).deleteUser(async(err)=>{
                    if(err)
                    {
                        console.log(err)
                        return res.status(500).json({message:'fail'})   
                    }
                    await User.destroy({where:{userEmail:email}})
                    res.status(200).json({message:'success'})
                })
            })
        } catch (error) {
            res.status(404).json({message:'fail'});
        }

    }
}

const userLogin={
    path:'/api/login',
    method:'post',
    handler:async(req,res)=>
    {
        const { email, password } = req.body;

        new CognitoUser({ Username: email, Pool: AwsUserPool }).authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
            onSuccess: async result => {
                const userData = await User.findAll({ where: { userEmail: email } });
                const {isVerified,userName,userGender,userMobileNo} = userData[0]
                    jwt.sign(
                        {
                            email,
                            name:userName,
                            gender:userGender,
                            mobileno:userMobileNo,
                            isVerified
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '2d',
                        }, (err, token) => {
                            if (err) {
                                return res.status(500).json({message:'fail'})
                            }
                            res.status(200).json({message:'success', token });    
                        }
    
                    )
            },
            onFailure: err => {
                res.status(200).json({message:err.code});
            }
        })
    }
}

const userEmailVerify={
    path:'/api/verify/:email',
    method:'put',
    handler:async(req,res)=>
    {
        try {
            const {email}=req.params;
            const {code } = req.body;
            new CognitoUser({ Username: email, Pool: AwsUserPool }).confirmRegistration(code, true, async (err) => {
                if (err) {
                    return res.status(401).json({ message: 'fail' })
                }
        
                await User.update({ isVerified: true }, { where: { userEmail: email } });
                res.status(200).json({message:'success'})
            })
            
        } catch (error) {
            res.status(404).json({message:'fail'});
        }
;
    }
}

const userResendVerifyCode={
    path:'/api/resendverifycode/:email',
    method:'get',
    handler:async(req,res)=>
    {
        try {
            const {email}=req.params;
            new CognitoUser({Username:email,Pool:AwsUserPool}).resendConfirmationCode((err)=>
            {
                if (err) {
                    return res.status(401).json({ message: 'fail' })
                }
                res.status(200).json({message:'success'})
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({message:'fail'});   
        }
    }
}


module.exports={userSignUp,userLogin,userEmailVerify,userResendVerifyCode,userEdit,userDelete}