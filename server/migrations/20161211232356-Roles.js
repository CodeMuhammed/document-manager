module.exports = {
        up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Roles',{
    "id": {
        "type": "INTEGER",
        "allowNull": false,
        "primaryKey": true,
        "autoIncrement": true
    },
    "title": {
        "type": "VARCHAR(255)",
        "defaultValue": "regular",
        "allowNull": false
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