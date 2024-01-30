import { asyncHandler } from "../utils/asyncHandler";
import { Organisation } from "../models/organisation.model";
import { OrganisationType } from "../middlewares/organisation.middleware";
import { User } from "../models/user.model";
import { Address } from "../models/address.model";
import { BankAccInfo } from "../models/bankAccInfo";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const registerOrganisation = asyncHandler(async (req, res) => {
  const { name, owner, address, bankAccInfo, gstin } = <OrganisationType>(
    req.body
  );

  // check if email already exists
  const user = await User.findOne({ email: owner.email });
  if (user)
    return res
      .status(400)
      .json(
        new ApiError(400, "", [
          "email already registered with another organisation",
        ])
      );

  const regUser = await User.create(owner);
  if (!regUser) throw new ApiError(400, "");

  const regAddress = await Address.create(address);
  if (!regAddress)
    return res.status(400).json("registration failed while adding address");

  const regBankAccInfo = await BankAccInfo.create(bankAccInfo);
  if (!regBankAccInfo)
    return res.status(400).json("registration failed while adding BankAccInfo");

  const organisation = await Organisation.create({
    name,
    owner: regUser._id,
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
