var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
const cognitoIdServiceProvider = new aws.CognitoIdentityServiceProvider({region: 'us-east-1'});
    
exports.handler = (event, context, callback) => {
 
  var _userAttributes = [];
  
  _userAttributes.push({
     Name: "email_verified",
     Value: "true"
   });
  
  if(event.request.userAttributes.name === undefined){
      
      var email = typeof event.request.userAttributes.email === "string" ? event.request.userAttributes.email : "undefined@test.com";
        
      var nameReplace = email.replace(/@.*$/,"");
      var name = nameReplace!== email ? nameReplace : "Nombre no definido";
      
      _userAttributes.push({
         Name: "name",
         Value: name
       });    
  }
  
  var params =  {
      UserAttributes: _userAttributes,
      UserPoolId: event.userPoolId,
      Username: event.userName
  }
  
  cognitoIdServiceProvider.adminUpdateUserAttributes(params, function(err, data) {callback(null, event);});
};