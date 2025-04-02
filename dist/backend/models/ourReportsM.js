"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurReportClass = void 0;
const sequelize_1 = require("sequelize");
// Define a class that extends Sequelize's Model with the attributes
class OurReportClass extends sequelize_1.Model {
}
exports.OurReportClass = OurReportClass;
exports.default = (sequelize) => {
    OurReportClass.init({
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
    return OurReportClass;
};
