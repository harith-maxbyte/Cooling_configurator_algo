'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert(
      'room_temp_coolings',
      [
        {
          id: 1,
          roomtemp: 20,
          wsqm:160,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          roomtemp: 21,
          wsqm:138,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          roomtemp: 22,
          wsqm:120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          roomtemp: 23,
          wsqm:105,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          roomtemp: 24,
          wsqm:94,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          roomtemp: 25,
          wsqm:86,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          roomtemp: 26,
          wsqm:80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          roomtemp: 27,
          wsqm:75,
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
