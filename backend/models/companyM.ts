import { DataTypes, Model, Sequelize, ForeignKey, CreationOptional} from 'sequelize';
import { Company } from '@/shared/types/db-models';
import Emissions from './emissionsM';
import User from './usersM';

//! Te moví el objeto al archivo db-models.d.ts 

// Define a class that extends Sequelize's Model with the attributes
class CompanyClass extends Model<Company>  {
  declare id: CreationOptional<number>;
  declare companyName: string;
  declare taxId: string;
  declare address: string;
  declare userId: number;
  declare industrialSector: string;
  declare relatedActivitiesDescription: string;
}


export default (sequelize: Sequelize) => {
  CompanyClass.init({
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
  
  // Definir la relación uno a muchos con Emissions
  CompanyClass.hasMany(EmissionsModel, { foreignKey: 'companyId' });
  EmissionsModel.belongsTo(CompanyClass, { foreignKey: 'companyId' });

  // Relación con User
  CompanyClass.belongsTo(UserModel, { foreignKey: 'userId' });
  UserModel.hasMany(CompanyClass, { foreignKey: 'userId' });

  return CompanyClass;
};