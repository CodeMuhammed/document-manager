module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        id: 123,
        access: 'public',
        title: 'My first doc as admin',
        content: 'Doe Is also my name',
        userId: 123,
        roleId: 123,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
      {
        id: 234,
        access: 'role',
        title: 'My second document as admin',
        content: 'I wrote a doc before',
        userId: 123,
        roleId: 123,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
      {
        id: 345,
        access: 'public',
        title: 'My first doc as regular',
        content: 'I wrote a doc before',
        userId: 234,
        roleId: 234,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
      {
        id: 456,
        access: 'private',
        title: 'My second document as regular',
        content: 'I wrote a doc before',
        userId: 234,
        roleId: 234,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  },
};
