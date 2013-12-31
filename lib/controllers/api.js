'use strict';
var request = require('request');

exports.postData = function(req, res) {
    var postUrl = req.airvantage.url + "/device/messages";
    request.post({
        url : postUrl,
        auth : {
          username : req.airvantage.credentials.stoveId,
          password : req.airvantage.credentials.stovePwd,
        },
        json : req.body
    }, function(error, response, body){
         res.json(body);
    });
};
