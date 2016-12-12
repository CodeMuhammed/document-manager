module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 123,
        username: 'mario',
        firstname: 'John',
        lastname: 'Doe',
        password: '12345',
        roleId: 123,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
