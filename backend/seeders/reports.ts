// seeders/XXXXX-seed-reports.ts (reemplaza XXXXX con timestamp)
import { QueryInterface } from "sequelize";
import { PollutionType } from "@/shared/types/db-models";
import { WhereOptions } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("reports", [
      {
        user: "marine_researcher_1",
        shortDescription: "Plastic debris in Mediterranean",
        description: "Large accumulation of plastic waste near coastal area, affecting turtle nesting sites. Estimated 200kg of debris per square kilometer.",
        location: "Costa Brava, Spain",
        pollutionType: "plastic" as PollutionType,
        date: "2024-03-15"
      },
      {
        user: "coastal_guard_22",
        shortDescription: "Oil spill detected",
        description: "3km oil slick moving northwest from tanker accident. Marine birds and fish already impacted. Urgent cleanup required.",
        location: "North Sea, 20km off Norway",
        pollutionType: "oil" as PollutionType,
        date: "2024-04-02"
      },
      {
        user: "ngo_blueplanet",
        shortDescription: "Coral bleaching event",
        description: "70% of Acropora corals showing bleaching signs due to water temperature rise and chemical runoff from nearby resorts.",
        location: "Great Barrier Reef, Australia",
        pollutionType: "chemical" as PollutionType,
        date: "2024-02-28"
      },
      {
        user: "fisherman_ali",
        shortDescription: "Ghost nets entanglement",
        description: "Abandoned fishing nets covering 500m² area, causing dolphin deaths. Coordinates logged for removal team.",
        location: "Andaman Sea, Thailand",
        pollutionType: "ghost_gear" as PollutionType,
        date: "2024-03-30"
      }
    ], {});
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("reports", {} as WhereOptions, {}); 
  }
};