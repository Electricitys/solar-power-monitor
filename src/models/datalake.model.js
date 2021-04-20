// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const datalake = sequelizeClient.define('datalake', {
    currentIn: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currentOut: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    voltageIn: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    voltageOut: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    powerIn: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    powerOut: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  datalake.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { devices } = models;

    datalake.belongsTo(devices);

  };

  return datalake;
};
