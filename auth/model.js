var config = {
	clients: [{
		id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
		clientId: 'application',
		clientSecret: 'secret',
		grants: [
			'password',
		],
		redirectUris: []
	}],
	// tokens: [],
	// users: [{
	// 	username: 'pedroetb',
	// 	password: 'password'
	// }],
	valid_scopes: ['free', 'user']
};

let userDBHelper
let accessTokensDBHelper
module.exports = (injectedDBHelpers) => {
	userDBHelper = injectedDBHelpers.accessTokenDbHelper
	accessTokensDBHelper = injectedDBHelpers.userDBHelper
	
	return (
		getAccessToken,
		getClient,
		saveToken,
		getUser,
		validateScope,
		verifyScope
	)
};

/*
 * Methods used by all grant types.
 */

var getAccessToken = function(bearerToken, callback) {

	//try and get the userID from the db using the bearerToken
	accessTokensDBHelper.getUserIDFromBearerToken(bearerToken, (userID) => {
		//create the token using the retrieved userID
		const accessToken = {
		user: {
			id: userID,
		},
		expires: null
		}

		//set the error to true if userID is null, and pass in the token if there is a userID else pass null
		callback(userID == null ? true : false, userID == null ? null : accessToken)
	})
};

var getClient = function(clientId, clientSecret) {

	var clients = config.clients.filter(function(client) {

		return client.clientId === clientId && client.clientSecret === clientSecret;
	});

	return clients[0];
};

var saveToken = function(token, client, user, callback) {

	console.log('saveAccessToken() called and accessToken is: ', accessToken,' and client is: ',client, ' and user is: ', user)
  
	//save the accessToken along with the user.id
	accessTokensDBHelper.saveAccessToken(token, user.id, callback)	
};

/*
 * Method used only by password grant type.
 */

var getUser = function(username, password, callback) {
	console.log('getUser() called and username is: ', username, ' and password is: ', password);

	//try and get the user using the user's credentials
	userDBHelper.getUserFromCrentials(username, password, callback)
};

function validateScope(user, client, scope) {
	console.log('requested scope in validate : ' + scope)
  if (!scope.split(' ').every(s => config.valid_scopes.indexOf(s) >= 0)) {
    return false;
  }
  return scope;
}

function verifyScope(token, scope) {
	if (!token.scope) {
	  return false;
	}
	let requestedScopes = scope.split(' ');
	let authorizedScopes = token.scope.split(' ');
	var result = requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0)

	console.log('requested scope : ' + scope + " - and the result : " + result)
	return result;
}

/**
 * Export model definition object.
 */

