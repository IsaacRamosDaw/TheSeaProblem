"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportClass = void 0;
const sequelize_1 = require("sequelize");
class ReportClass extends sequelize_1.Model {
}
exports.ReportClass = ReportClass;
exports.default = (sequelize) => {
    ReportClass.init({
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
    return ReportClass;
};
