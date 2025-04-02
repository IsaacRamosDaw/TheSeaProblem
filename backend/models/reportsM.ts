import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';

enum PollutionType {
  Plastic = 'Plastic',
  OilSpill = 'Oil Spill',
  Chemical ='Chemical'
}
// Define a type for the attributes of the model
export type Reports = {
  id?: number;
  user: string;
  shortDescription: string;
  description: string;
  location: string;
  pollutionType: PollutionType;
  date: Date;
}

// Define a class that extends Sequelize's Model with the attributes
export class ReportsClass extends Model<Reports> {
  declare id: CreationOptional<number>;
  declare user: string;
  declare shortDescription: string;
  declare description: string;
  declare location: string;
  declare pollutionType: PollutionType;
  declare date: Date;
}

export default (sequelize: Sequelize) => {
  ReportsClass.init(
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
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