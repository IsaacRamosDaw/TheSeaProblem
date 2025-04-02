import { CreationOptional, DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';

// Define a type for the attributes of the model
export type Reports = {
  id?: number;
  name: string;
  description: string;
  location: string;
  pollutionType: number;
}

// Define a class that extends Sequelize's Model with the attributes
export class ReportsClass extends Model<Reports> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare location: string;
  declare pollutionType: ForeignKey<number>;
}

export default (sequelize: Sequelize) => {
  ReportsClass.init(
    {
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
    },
    {
      sequelize,
      modelName: 'ourReports',
      tableName: 'ourReports',
      timestamps: false,
    }
  );

  return ReportsClass;
};