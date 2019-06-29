var OAuth2Server = require('oauth2-server')

module.exports = (expressApp, dbHelpers) => {
    let model = require('./model')()

    expressApp.oauth = new OAuth2Server({
        model: require('./model.js', dbHelpers),

        // WARNING : WHAT ARE TWO NEXT ARGUMENTS?
        accessTokenLifetime: 60 * 60, 
        allowBearerTokensInQueryString: true
    });
}
