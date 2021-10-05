'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ceiling_factor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ceiling_factor.init({
    ceiling_value: DataTypes.NUMERIC,
    ceil_factor: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'ceiling_factor',
  });
  return ceiling_factor;
};