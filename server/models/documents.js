module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    access: {
      type: DataTypes.STRING, // public , private, role
      defaultValue: 'public',
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Title',
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: 'Body',
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          as: 'owner',
          foreignKey: {
            allowNull: false,
          },
        });
      },
    },
  });
  return Documents;
};
