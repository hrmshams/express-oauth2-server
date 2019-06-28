var app = require('express')(),
    config = require('./config/index'),
    database = require('./database/index')
    bodyParser = require('body-parser'),

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
var auth = require('./auth/index')(app)
var routes = require('./routes/index.js')(app, auth)
routes.configRoutes()

database.migrate()

app.listen(config.port, ()=>{
    console.log(`server is running on port ${config.port}`)
})