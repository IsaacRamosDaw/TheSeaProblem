import { DataTypes, Model, Sequelize } from 'sequelize';

// Define the User model
type ReportAttributes = {
  name: string;
  number: string;
}
export class Report extends Model<ReportAttributes>  {
  declare name: string;
  declare number: string;
}


export default  (sequelize:Sequelize) => {
  Report.init(
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

  return Report;
};