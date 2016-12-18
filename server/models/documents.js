export default(sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'invalid document title',
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'invalid document content',
        },
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          as: 'user',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
          },
        });

        Documents.belongsTo(models.Roles, {
          as: 'role',
          foreignKey: {
            allowNull: false,
          },
        });
      },
    },
  });
  sequelize.sync();
  return Documents;
};
