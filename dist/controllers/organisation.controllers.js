"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganisationData = exports.registerOrganisation = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const organisation_model_1 = require("../models/organisation.model");
const address_model_1 = require("../models/address.model");
const bankAccInfo_1 = require("../models/bankAccInfo");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
exports.registerOrganisation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, address, bankAccInfo, gstin } = req.body;
    const regAddress = await address_model_1.Address.create(address);
    if (!regAddress)
        return res.status(400).json("registration failed while adding address");
    const regBankAccInfo = await bankAccInfo_1.BankAccInfo.create(bankAccInfo);
    if (!regBankAccInfo)
        return res
            .status(400)
            .json("registration failed while adding BankAccInfo");
    const organisation = await organisation_model_1.Organisation.create({
        name,
        owner: req.user._id,
        address: regAddress._id,
        bankAccInfo: regBankAccInfo._id,
        gstin,
    });
    const orgInfo = await organisation.populate([
        { path: "owner", select: "-password" },
        "address",
        "bankAccInfo",
    ]);
    return res.json(new ApiResponse_1.ApiResponse(200, orgInfo, "organisation registered successfully"));
});
exports.getOrganisationData = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const organisation = await organisation_model_1.Organisation.findById(req.params.orgId);
    if (!organisation)
        throw new ApiError_1.ApiError(400, "failed to fetch the organisation data");
    res.json(new ApiResponse_1.ApiResponse(200, organisation, "organisation data fetched sucessfully"));
});
//# sourceMappingURL=organisation.controllers.js.map