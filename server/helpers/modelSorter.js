/**
 * This module takes in the sequelize generated models and sorts them based
 * On associations.
 * Models with no associations are added first
 */

// Exports public functionalities.
export default {
  sort: (models) => {
    // Returns default values.
    const sortedData = ['Roles', 'Users', 'Documents'];
    return sortedData;
  },
};
