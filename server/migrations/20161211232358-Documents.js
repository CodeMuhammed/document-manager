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
        "defaultValue": "Title",
        "allowNull": false
    },
    "content": {
        "type": "VARCHAR(255)",
        "defaultValue": "Body",
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
    "ownerId": {
        "allowNull": false,
        "type": "INTEGER",
        "references": {
            "model": "Users",
            "key": "id"
        },
        "onDelete": "NO ACTION",
        "onUpdate": "CASCADE"
    }
})
;
        },
        down: function(queryInterface, Sequelize) {
            return queryInterface.dropTable('Documents');
        }
    };