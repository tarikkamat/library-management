'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {name: 'Tarık KAMAT', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Enes Faruk Meniz', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Eray Aslan', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Kadir Mutlu', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Sefa Eren Şahin', createdAt: new Date(), updatedAt: new Date()},
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
