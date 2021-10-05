'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert(
      'ceiling_factors',
      [
        {
          id: 1,
          ceiling_value: 3,
          ceil_factor:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          ceiling_value: 3.1,
          ceil_factor:1.03,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          ceiling_value: 3.2,
          ceil_factor:1.06,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          ceiling_value: 3.3,
          ceil_factor:1.09,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          ceiling_value: 3.4,
          ceil_factor:1.12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          ceiling_value: 3.5,
          ceil_factor:1.15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          ceiling_value: 3.6,
          ceil_factor:1.18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          ceiling_value: 3.7,
          ceil_factor:1.21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          ceiling_value: 3.8,
          ceil_factor:1.24,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          ceiling_value: 3.9,
          ceil_factor:1.27,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          ceiling_value: 4,
          ceil_factor:1.3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};