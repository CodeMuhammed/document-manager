/**
 * This module takes in the sequelize generated models and sorts them based
 * On associations.
 * Models with no associations are added first
 */

const sort = (models) => {
   // Returns default values.
  const sortedData = ['Roles', 'Users', 'Documents'];
  return sortedData;
};

// Exports public functionalities.
module.exports = {
  sort,
};
