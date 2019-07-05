var TableModel = require('./../model')

class users extends TableModel {
    constructor(tableName){
        super(tableName)

        this.setModel()
    }

    setModel(){
        return {
            id : [this.types.int, this.properties.notNull, this.properties.autoIncrement],
            username : [this.types.varchar, this.properties.notNull],
            password : [this.types.varchar, this.properties.notNull]
        }
    }
}

module.exports = users