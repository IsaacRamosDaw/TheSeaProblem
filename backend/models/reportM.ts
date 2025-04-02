import { DataTypes, Model, Sequelize } from 'sequelize';

// Define the model
export type Report = {
  name: string;
  number: string;
}
export class ReportClass extends Model<Report>  {
  declare name: string;
  declare number: string;
}


export default  (sequelize:Sequelize) => {
  ReportClass.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { sequelize,
      modelName: 'report',
      tableName: 'reports',
      timestamps: false,
    }
  );

  return ReportClass;
};