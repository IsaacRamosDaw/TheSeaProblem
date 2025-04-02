import { DataTypes, Model, Sequelize } from 'sequelize';

export type User = {
  name: string;
  number: number;
}

class UserClass extends Model<User> {
  declare name: string;
  declare number: number;
}

export default (sequelize:Sequelize) => {
  UserClass.init({
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

  return UserClass;
};