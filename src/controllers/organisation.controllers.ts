import { asyncHandler } from "../utils/asyncHandler";
import { Organisation } from "../models/organisation.model";
import { OrganisationType } from "../middlewares/organisation.middleware";
import { User } from "../models/user.model";
import { Address } from "../models/address.model";
import { BankAccInfo } from "../models/bankAccInfo";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const registerOrganisation = asyncHandler(async (req, res) => {
  const { name, address, bankAccInfo, gstin } = <OrganisationType>(
    req.body
  );

  const regAddress = await Address.create(address);
  if (!regAddress)
    return res.status(400).json("registration failed while adding address");

  const regBankAccInfo = await BankAccInfo.create(bankAccInfo);
  if (!regBankAccInfo)
    return res.status(400).json("registration failed while adding BankAccInfo");

  const organisation = await Organisation.create({
    name,
    // owner: req._id,
    address: regAddress._id,
    bankAccInfo: regBankAccInfo._id,
    gstin,
  });

  const orgInfo = await organisation.populate([
    { path: "owner", select: "-password" },
    "address",
    "bankAccInfo",
  ]);

  return res.json(
    new ApiResponse(200, orgInfo, "organisation registered successfully")
  );
});
