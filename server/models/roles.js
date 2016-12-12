module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
      allowNull: false,
    },
  });
  return Roles;
};
