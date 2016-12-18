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
        "allowNull": false,
        "validate": {
            "is": {
                "args": {},
                "msg": "username should only contain alphanumeric characters with optional underscores"
            }
        }
    },
    "firstname": {
        "type": "VARCHAR(255)",
        "allowNull": false,
        "validate": {
            "is": {
                "args": {},
                "msg": "firstname should contain only alphabets"
            }
        }
    },
    "lastname": {
        "type": "VARCHAR(255)",
        "allowNull": false,
        "validate": {
            "is": {
                "args": {},
                "msg": "lastname should contain only alphabets"
            }
        }
    },
    "password": {
        "type": "VARCHAR(255)",
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
    "RoleId": {
        "type": "INTEGER",
        "allowNull": true,
        "references": {
            "model": "Roles",
            "key": "id"
        },
        "onDelete": "SET NULL",
        "onUpdate": "CASCADE"
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