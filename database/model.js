//an instance of model
class TableModel {
    types = {
        int : "int",
        varchar : "varchar(255)"
    }
    properties = {
        notNull : "NOT NULL",
        autoIncrement : "AUTO_INCREMENT",
        unique : "UNIQUE",
    }

    constructor(tableName){
        this.tableName = tableName
        this.model = null //this is an object 

        this.values = null
    }

    setModel(){}
    setValues(valuesArray){
        this.values = valuesArray
    }
    getData(){
        let tableName = this.tableName
        let fields = this.getKeys(this.model)
        let values = this.values
        return {tableName, fields, values}
    }

    getKeys(model){
        var keys = [];
        for(var key in model){
            if (!model[key].includes(TableModel.properties.autoIncrement))
                keys.push(key);
        }
        return keys;
    }
}