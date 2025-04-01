"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Report extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Report.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
    }, { sequelize,
        modelName: 'report',
        tableName: 'reports',
        timestamps: false,
    });
    return Report;
};
