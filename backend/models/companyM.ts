import { DataTypes, Model, Sequelize, ForeignKey, CreationOptional} from 'sequelize';
import { CompanyAttributes } from '@/shared/types/db-models';
import Emissions from './emissionsM';
import User from './userM';

//! Te moví el objeto al archivo db-models.d.ts 

// Define a class that extends Sequelize's Model with the attributes
class Company extends Model<CompanyAttributes>  {
  declare id: CreationOptional<number>;
  declare companyName: string;
  declare taxId: string;
  declare address: string;
  declare userId: number;
  declare industrialSector: string;
  declare relatedActivitiesDescription: string;
  declare emissionsId: number;
}


export default (sequelize: Sequelize) => {
  Company.init({
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      taxId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      industrialSector: {
        type: DataTypes.STRING,
        allowNull: false
      },
      relatedActivitiesDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emissionsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'emissions',
          key: 'id'
        }
      }
    },
    {
      timestamps: false,
      modelName: 'company',
      tableName: 'companies',
      sequelize,
    }
  );

  const EmissionsModel = Emissions(sequelize);
  const UserModel = User(sequelize);
  
  Company.belongsTo(EmissionsModel, { foreignKey: 'pollutionType' });
  EmissionsModel.hasMany(Company, { foreignKey: 'pollutionType' });

  Company.belongsTo(UserModel, { foreignKey: 'contactUser' });
  UserModel.hasMany(Company, { foreignKey: 'contactUser' });

  return Company;
};