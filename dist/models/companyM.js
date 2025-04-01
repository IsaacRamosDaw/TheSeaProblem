"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Define a class that extends Sequelize's Model with the attributes
class Company extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Company.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        modelName: 'company',
        tableName: 'companies',
        sequelize,
    });
    return Company;
};
