"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserClass extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    UserClass.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: 'user',
        tableName: 'users',
    });
    return UserClass;
};
