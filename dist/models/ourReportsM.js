"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Define a class that extends Sequelize's Model with the attributes
class OurReports extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    OurReports.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'ourReports',
        tableName: 'ourReports',
        timestamps: false,
    });
    return OurReports;
};
