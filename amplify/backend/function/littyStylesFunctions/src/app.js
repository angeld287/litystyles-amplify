/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var AWS = require('aws-sdk');
var origins_dev = "https://d38tvovvwgbq83.cloudfront.net";

var origins_prod = "*"; //"https://littystyles.com";
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", origins_prod)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/addUserToGroup', async function(req, res) {
  // Add your code here
  try {
    var origin = req.get('origin');
    //(origin === origins_dev ? origins_dev : origins_prod)

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const _response = null;
    
    const params = {
      GroupName: req.body.GroupName,
      UserPoolId: req.body.UserPoolId,
      Username: req.body.Username,
    };

    _response = await cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod }, body: _response })

  } catch (error) {

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod  }, body: error })

  }
});

app.post('/removeUserFromGroup', async function(req, res) {
  // Add your code here
  try {
    var origin = req.get('origin');
    //(origin === origins_dev ? origins_dev : origins_prod)

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const _response = null;
    
    const params = {
      GroupName: req.body.GroupName,
      UserPoolId: req.body.UserPoolId,
      Username: req.body.Username
    };

    _response = await cognitoidentityserviceprovider.adminRemoveUserFromGroup(params).promise(); //adminAddUserToGroup(params).promise();

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod }, body: _response })

  } catch (error) {

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod }, body: error })

  }
});

app.post('/findUser', async function(req, res) {

  try {
    var origin = req.get('origin');
    const origins = origin === origins_dev ? origins_dev : origins_prod;
    
    AWS.config.update({region: 'us-east-1'});

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    //COGNITO
    var params = {
      UserPoolId: req.body.UserPoolId,
      AttributesToGet: [
        'email',
        'name',
      ]
    };

    if (req.body.filterBy === 'email') { params.Filter = 'email^=\"'+req.body.value+'\"';}
    if (req.body.filterBy === 'name') { params.Filter = 'name^=\"'+req.body.value+'\"';}

    const result = await cognitoidentityserviceprovider.listUsers(params).promise();

    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod }, body: result })

  } catch (error) {
    res.json({ statusCode: 200, headers: { "Access-Control-Allow-Origin": origins_prod }, body: error })
  }

});

app.post('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/addUserToGroup', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/addUserToGroup/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
