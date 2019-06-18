/**
 * this will be used only in programming mode and by the programmer!
 */

var mysql = require('mysql')
var dbconfig = require('./../config/index').database

function initDb(){
    let queryStr = `CREATE DATABASE ${dbconfig.database}`
    con = mysql.createConnection({
        host: dbconfig.host,
        user: dbconfig.user,
        password: dbconfig.password,
    })

    con.connect(function(err){
        if (err) throw err
        con.query(queryStr, function(err, result){
            if (err) throw err

            console.log('successfully database added : ' + JSON.stringify(result))
        })
    })
}

function initTables(){
    
}

module.exports = {
    initDb,
    initTables
}
