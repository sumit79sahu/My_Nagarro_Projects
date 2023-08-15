const {CognitoUserPool}=require('amazon-cognito-identity-js')
const {CognitoIdentityCredentials} =require('aws-sdk')

const AWS =require('aws-sdk')
const fetch=require('node-fetch')


global.fetch=fetch;

AWS.config.region=process.env.AWS_REGION;
AWS.config.credentials=new CognitoIdentityCredentials(
    {
        IdentityPoolId:process.env.AWS_IDENTITY_POOL_ID
    }
)

const poolData={
    UserPoolId:process.env.AWS_USER_POOL_ID,
    ClientId:process.env.AWS_CLIENT_ID
};
module.exports= new CognitoUserPool(poolData);
