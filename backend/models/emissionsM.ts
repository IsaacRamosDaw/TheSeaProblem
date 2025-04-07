import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
<<<<<<< HEAD
import { Emissions } from "@/shared/types/db-models";
//NEEDS Echedy's update from issue #23
export class EmissionsClass extends Model<Emissions>{
=======
import { Emission } from "../../shared/types/db-models";

export class EmissionsClass extends Model<Emission> {
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b
  declare id: CreationOptional<number>;
  declare pollutionType: string;
  declare volume: number;
  declare frequency: string;
  declare dischargePoint: string;
  declare reductionTarget: string;
  declare companyId: number;
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
        type: DataTypes.DATE,
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
