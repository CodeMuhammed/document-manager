module.exports = {
        up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users',{
    "id": {
        "type": "INTEGER",
        "allowNull": false,
        "primaryKey": true,
        "autoIncrement": true
    },
    "username": {
        "type": "VARCHAR(255)",
        "defaultValue": "username",
        "allowNull": false
    },
    "firstname": {
        "type": "VARCHAR(255)",
        "defaultValue": "first",
        "allowNull": false
    },
    "lastname": {
        "type": "VARCHAR(255)",
        "defaultValue": "last",
        "allowNull": false
    },
    "password": {
        "type": "VARCHAR(255)",
        "defaultValue": "1234567",
        "allowNull": false
    },
    "createdAt": {
        "type": "TIMESTAMP WITH TIME ZONE",
        "allowNull": false
    },
    "updatedAt": {
        "type": "TIMESTAMP WITH TIME ZONE",
        "allowNull": false
    },
    "roleId": {
        "allowNull": false,
        "type": "INTEGER",
        "references": {
            "model": "Roles",
            "key": "id"
        },
        "onDelete": "NO ACTION",
        "onUpdate": "CASCADE"
    }
})
;
        },
        down: function(queryInterface, Sequelize) {
            return queryInterface.dropTable('Users');
        }
    };