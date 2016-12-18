module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 123,
        username: 'mario',
        firstname: 'John',
        lastname: 'Doe',
        password: '$2a$10$U6i0jYJfd7pyxtdkhtgCzuMYWwYDi/7snlLwwy0Aqt1SyjhJP0yLG',
        roleId: 123,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
      {
        id: 234,
        username: 'meron',
        firstname: 'jones',
        lastname: 'dandy',
        password: '$2a$10$U6i0jYJfd7pyxtdkhtgCzuMYWwYDi/7snlLwwy0Aqt1SyjhJP0yLG',
        roleId: 234,
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString(),
      },
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
