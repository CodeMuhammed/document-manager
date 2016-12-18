export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'invalid role format',
        },
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Roles.hasMany(models.Documents);
        Roles.hasMany(models.Users);
      },
    },
  });
  sequelize.sync();
  return Roles;
};
