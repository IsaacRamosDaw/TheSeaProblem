import { Model, DataTypes, Sequelize, Hooks } from "sequelize";
import bcrypt from "bcrypt";

interface UserAttributes {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refresh_token: string;
  is_active?: boolean;
}


class UserModel extends Model<UserAttributes> implements UserAttributes {
    //Test
  static init(arg0: { id: { type: any; autoIncrement: true; allowNull: false; primaryKey: true; }; firstname: { type: string; allowNull: false; }; lastname: { type: string; allowNull: false; }; email: { type: string; allowNull: false; }; password: { type: string; allowNull: false; }; refresh_token: { type: string; allowNull: false; }; is_active: { type: boolean; allowNull: false; defaultValue: boolean; }; }, arg1: { sequelize: Sequelize; modelName: string; tablename: string; underscored: boolean; hooks: { beforeCreate: (user: UserModel) => Promise<void>; beforeUpdate: (user: UserModel) => Promise<void>; beforeBulkCreate: (users: UserModel[]) => Promise<void>; }; }) {
      throw new Error("Method not implemented.");
  }
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public refresh_token!: string;
  public is_active!: boolean;
}

export async function createHash(string: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(string, salt);
}


export function initUserModel(sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      tablename:"users",
      underscored: true,
      hooks: {
     beforeCreate: async (user: UserModel) => {
      user.password = await createHash(user.password);
    },
    beforeUpdate: async (user: UserModel) => {
      user.password = await createHash(user.password);
    },
    beforeBulkCreate: async (users: UserModel[]) => {
      for (const user of users) {
        user.password = await createHash(user.password);
      }
    },
  },
},
  );
}
export default UserModel;
