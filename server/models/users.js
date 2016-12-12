module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      defaultValue: 'username',
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      defaultValue: 'first',
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: 'last',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '1234567',
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.Roles, {
          as: 'role',
          foreignKey: {
            allowNull: false,
          },
        });
      },
    },
  });
  return Users;
};
