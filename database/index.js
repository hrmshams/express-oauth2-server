var mysql = require('mysql')
var migrations = require('./migrations')
var dbconfig = require('./../config/index').database

let con = null
function initConnection(){
    con = mysql.createConnection({
        host: dbconfig.host,
        user: dbconfig.user,
        password: dbconfig.password,
        database: dbconfig.database
    });
}

function query(queryStr, callback){
    initConnection()
    connection.query(queryStr, function(err, result, fields){
        if (err){
            console.log('error happened : '+ JSON.stringify(err))
        } else {
            console.log('successfully query executed')            
        }
        con.end()
        callback(err, results)
    })
}

function migrate(){
    migrations.initDb()
    migrations.initTables()
}

module.exports = {
    query,
    migrate
}