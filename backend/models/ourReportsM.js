const { DataTypes } = require('sequelize');

//! Modelo de datos para la tabla de nuestros reportes
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

//? Ve a routes/ourReportsR.js 