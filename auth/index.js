var OAuth2Server = require('oauth2-server')

module.exports = (expressApp) => {
    expressApp.oauth = new OAuth2Server({
        model: require('./model.js'),

        // WARNING : WHAT ARE TWO NEXT ARGUMENTS?
        accessTokenLifetime: 60 * 60, 
        allowBearerTokensInQueryString: true
    });
}
