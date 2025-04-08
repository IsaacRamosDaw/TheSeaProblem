import { z } from "zod";

//? Need to confirm this 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// https://stackoverflow.com/questions/72674930/zod-validator-validate-image
export const StatictReportSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  image: 
    z.any().refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  paragraph: z.string(),
});
