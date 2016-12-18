module.exports = {
        up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Roles',{
    "id": {
        "type": "INTEGER",
        "allowNull": false,
        "autoIncrement": true,
        "primaryKey": true
    },
    "title": {
        "type": "VARCHAR(255)",
        "allowNull": false,
        "unique": true,
        "validate": {
            "is": {
                "args": {},
                "msg": "invalid role format"
            }
        }
    },
    "createdAt": {
        "type": "TIMESTAMP WITH TIME ZONE",
        "allowNull": false
    },
    "updatedAt": {
        "type": "TIMESTAMP WITH TIME ZONE",
        "allowNull": false
    }
})
;
        },
        down: function(queryInterface, Sequelize) {
            return queryInterface.dropTable('Roles');
        }
    };