export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z0-9_]+$/g,
          msg: 'username should only contain alphanumeric characters with optional underscores',
        },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z]+$/g,
          msg: 'firstname should contain only alphabets',
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z]+$/g,
          msg: 'lastname should contain only alphabets',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
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

        Users.hasMany(models.Documents);
      },
    },
  });
  sequelize.sync();
  return Users;
};
