import { DataTypes, Model, Sequelize } from 'sequelize';

type UserAttributes = {
  name: string;
  number: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare name: string;
  declare number: number;
}

export default (sequelize:Sequelize) => {
  User.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
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