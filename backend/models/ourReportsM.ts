import { DataTypes, Model, Sequelize } from 'sequelize';

// Define a type for the attributes of the model
type OurReportsAttributes = {
  name: string;
  description: string;
}

// Define a class that extends Sequelize's Model with the attributes
class OurReports extends Model<OurReportsAttributes>  {
  declare name: string;
  declare description: string;
}

export default (sequelize: Sequelize) => {
  OurReports.init(
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

  return OurReports;
};