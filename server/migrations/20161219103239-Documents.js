module.exports = {
        up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Documents',{
    "id": {
        "type": "INTEGER",
        "allowNull": false,
        "primaryKey": true,
        "autoIncrement": true
    },
    "access": {
        "type": "VARCHAR(255)",
        "defaultValue": "public",
        "allowNull": false
    },
    "title": {
        "type": "VARCHAR(255)",
        "allowNull": false,
        "validate": {
            "is": {
                "args": {},
                "msg": "invalid document title"
            }
        }
    },
    "content": {
        "type": "VARCHAR(255)",
        "allowNull": false,
        "validate": {
            "is": {
                "args": {},
                "msg": "invalid document content"
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
    },
    "userId": {
        "allowNull": false,
        "type": "INTEGER",
        "references": {
            "model": "Users",
            "key": "id"
        },
        "onDelete": "CASCADE",
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
    "UserId": {
        "type": "INTEGER",
        "allowNull": true,
        "references": {
            "model": "Users",
            "key": "id"
        },
        "onDelete": "SET NULL",
        "onUpdate": "CASCADE"
    }
})
;
        },
        down: function(queryInterface, Sequelize) {
            return queryInterface.dropTable('Documents');
        }
    };