var app = require('express')()
var config = require('./config/index')

app.listen(config.port, ()=>{
    console.log(`server is running on port ${config.port}`)
})