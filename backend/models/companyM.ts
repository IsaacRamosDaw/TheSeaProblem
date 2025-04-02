import { DataTypes, Model, Sequelize } from 'sequelize';

// Define a type for the attributes of the model
export type Company = {
  name: string;
  number: string;
}

// Define a class that extends Sequelize's Model with the attributes
class CompanyClass extends Model<Company>  {
  declare name: string;
  declare number: string;
}


export default (sequelize:Sequelize) => {
  CompanyClass.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },

    {
      timestamps: false,
      modelName: 'company',
      tableName: 'companies',
      sequelize,
     }
  );

  return CompanyClass;
};