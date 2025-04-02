import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export type Emissions = {
  id?: number;
  name: string;
}

export class EmissionsClass extends Model<Emissions>{
  declare id: CreationOptional<number>;
  declare name: string;
}

export default (sequelize: Sequelize) => {
  EmissionsClass.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'emissions',
      tableName: 'emissions',
      timestamps: false,
    }
  );

  return EmissionsClass;
};