import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "@/shared/types/db-models";

class UserClass extends Model<User> {
  declare id?: number;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
}

export default (sequelize:Sequelize) => {
  UserClass.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
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