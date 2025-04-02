import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';
import type { OurReport } from '@/shared/types/db-models';

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