import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';

// Define a type for the attributes of the model
export type OurReport = {
  id?: number;
  name: string;
  description: string;
}

// Define a class that extends Sequelize's Model with the attributes
export class OurReportClass extends Model<OurReport>  {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
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