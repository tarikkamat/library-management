'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Books', [
            {name: '1984', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Brave New World', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Dune', createdAt: new Date(), updatedAt: new Date()},
            {name: 'I, Robot', createdAt: new Date(), updatedAt: new Date()},
            {name: "The Hitchhiker's Guide to the Galaxy", createdAt: new Date(), updatedAt: new Date()},
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Books', null, {});
    }
};
