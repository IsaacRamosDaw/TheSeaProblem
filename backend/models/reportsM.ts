import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import type { Report, PollutionType } from "@/shared/types/db-models";

// Define a class that extends Sequelize's Model with the attributes
export class ReportsClass extends Model<Report> {
  declare id: CreationOptional<number>;
  declare user: string;
  declare shortDescription: string;
  declare description: string;
  declare location: string;
  declare pollutionType: PollutionType;
  declare date: string;
}

export default (sequelize: Sequelize) => {
  ReportsClass.init(
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pollutionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "reports",
      tableName: "reports",
      timestamps: false,
    },
  );

  return ReportsClass;
};
