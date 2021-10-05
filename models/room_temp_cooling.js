'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_temp_cooling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  room_temp_cooling.init({
    roomtemp: DataTypes.INTEGER,
    wsqm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_temp_cooling',
  });
  return room_temp_cooling;
};