const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OurReports = sequelize.define('ourReports', { 
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
  
    { timestamps: false, }
  );

  return OurReports;
};