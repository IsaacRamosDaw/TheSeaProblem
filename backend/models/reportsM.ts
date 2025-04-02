import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';

// Define a type for the attributes of the model
export type Reports = {
  id?: number;
  user: string,
  name: string;
  description: string;
  location: string;
  pollutionType: string;
  date: Date;
}

// Define a class that extends Sequelize's Model with the attributes
export class ReportsClass extends Model<Reports> {
  declare id: CreationOptional<number>;
  declare user: string;
  declare name: string;
  declare description: string;
  declare location: string;
  declare pollutionType: string;
  declare date: Date;
}

export default (sequelize: Sequelize) => {
  ReportsClass.init(
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pollutionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'reports',
      tableName: 'reports',
      timestamps: false,
    }
  );

  return ReportsClass;
};