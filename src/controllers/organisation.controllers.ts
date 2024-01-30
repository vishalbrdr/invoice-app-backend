import { asyncHandler } from "../utils/asyncHandler";
import { Organisation } from "../models/organisation.model";

export const registerOrganisation = asyncHandler(async (req, res) => {
  const organisation: object = req.body;
  res.json(organisation);
});
