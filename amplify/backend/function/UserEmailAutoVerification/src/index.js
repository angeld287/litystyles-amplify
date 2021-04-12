var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
const cognitoIdServiceProvider = new aws.CognitoIdentityServiceProvider({region: 'us-east-1'});
    
exports.handler = (event, context, callback) => {
  var params =  {
    UserAttributes: [
     {
       Name: "email_verified",
       Value: "true"
     }
    ],
    UserPoolId: event.userPoolId,
    Username: event.userName
  }
  cognitoIdServiceProvider.adminUpdateUserAttributes(params, function(err, data) {callback(null, event);});
};