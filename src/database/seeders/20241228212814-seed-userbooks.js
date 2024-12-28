'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserBooks', [
      { userId: 2, bookId: 4, userScore: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, bookId: 5, userScore: 10, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, bookId: 2, userScore: null, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserBooks', null, {});
  }
};
