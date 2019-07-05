const createTableQueryMaker = function(){
}

const insertQueryMaker = function(model){
    let {tableName, fields, values} = model.getData()
    let query = "INSERT INTO " + tableName + " ("

    for (let i=0; i<fields.length; i++){
        query += fields[i]
        if (i != fields.length-1)
            query += ", "
    }
    query += ") VALUES ("

    for (let i=0; i<values.length; i++){
        query += values[i]
        if (i != values.length-1)
            query += ", "
    }
    query += ")"

    return query
}