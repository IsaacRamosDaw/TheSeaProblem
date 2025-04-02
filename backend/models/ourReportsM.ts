import { CreationOptional, DataTypes, Model, Sequelize, ForeignKey } from 'sequelize';

// Define a type for the attributes of the model
export type OurReport = {
  id?: number;
  name: string;
  description: string;
  location: string;
  pollutionType: number;
}

// Define a class that extends Sequelize's Model with the attributes
export class OurReportClass extends Model<OurReport>  {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare location: string;
  declare pollutionType: ForeignKey<number>;
}

export default (sequelize: Sequelize) => {
  OurReportClass.init(
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Emissions',
          key: 'id',
        }
      },
    },
    {
      sequelize,
      modelName: 'ourReports',
      tableName: 'ourReports',
      timestamps: false,
    }
  );

  return OurReportClass;
};