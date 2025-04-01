import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';

// Define a type for the attributes of the model
export type OurReportAttributes = {
  id?: number;
  name: string;
  description: string;
}

// Define a class that extends Sequelize's Model with the attributes
export class OurReport extends Model<OurReportAttributes>  {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
}



export default (sequelize: Sequelize) => {
  OurReport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
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

  return OurReport;
};