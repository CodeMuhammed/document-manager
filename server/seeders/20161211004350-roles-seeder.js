module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 123,
        title: 'admin',
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
      {
        id: 234,
        title: 'regular',
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
