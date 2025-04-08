import { PollutionEnum } from "@/shared/schemas/report-schema";
import { z } from "zod";

type PollutionType = z.infer<typeof PollutionEnum>;

export const COLORS: Record<PollutionType, { bg: string; border: string }> = {
  Chemical: { bg: "rgba(75,192,192,0.4)", border: "rgba(75,192,192,1)" },
  Plastic: { bg: "rgba(255,99,132,0.4)", border: "rgba(255,99,132,1)" },
  "Oil Spill": { bg: "rgba(255,206,86,0.4)", border: "rgba(255,206,86,1)" },
};

export const DEFAULT_COLOR = {
  bg: "rgba(255, 254, 254, 0.4)",
  border: "rgba(100,100,100,1)",
};