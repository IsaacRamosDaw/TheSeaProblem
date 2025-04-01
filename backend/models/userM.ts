import { DataTypes, Model, Sequelize } from 'sequelize';

type UserAttributes = {
  name: string;
  number: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare name: string;
  declare number: string;
}

export default (sequelize:Sequelize) => {
  User.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
    },

    {
      timestamps: false,
      sequelize,
      modelName: 'user',
      tableName: 'users',
    }
  );

  return User;
};