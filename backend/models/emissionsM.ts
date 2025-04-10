import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import { Emission } from "../../shared/types/db-models";

export class EmissionsClass extends Model<Emission> {
  declare id: CreationOptional<number>;
  declare pollutionType: string;
  declare volume: number;
  declare frequency: string;
  declare dischargePoint: string;
  declare reductionTarget: string;
  declare companyId: number;
  declare date: string;
}

export default (sequelize: Sequelize) => {
  EmissionsClass.init(
    {
      pollutionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dischargePoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reductionTarget: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emissions",
      tableName: "emissions",
      timestamps: false,
    },
  );

  return EmissionsClass;
};
