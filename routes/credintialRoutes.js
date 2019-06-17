var express = require('express')
var credintialRoutes = express()

var OAuth2Server = require('oauth2-server'),
    Request = OAuth2Server.Request,
    Response = OAuth2Server.Response;

let expressApp = null

function authenticateRequest(req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return expressApp.oauth.authenticate(request, response)
		.then(function(token) {
			next();
		}).catch(function(err) {
			res.status(err.code || 500).json(err);
		});
}

credintialRoutes.get('/', authenticateRequest, (req, res)=>{
    res.send('/ route allowed')
})

credintialRoutes.get('/user', authenticateRequest, (req, res)=>{
    res.send('/user route allowed')
})

var passExpressApp = function(app){
	expressApp = app
}

module.exports = (app)=>{
    
    return {
		routes : credintialRoutes,
		passExpressApp : passExpressApp
	}
}
