module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        id: 123,
        access: 'public',
        title: 'John Is My Name',
        content: 'Doe Is also my name',
        ownerId: 123,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  },
};
