"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.addCustomer = exports.allCustomers = void 0;
const address_model_1 = require("../models/address.model");
const customer_mode_1 = require("../models/customer.mode");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.allCustomers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { orgId } = req.params;
    const customers = await customer_mode_1.Customer.find({ organisation: orgId }).populate("address");
    if (!customers)
        throw new ApiError_1.ApiError(400, "failed to fetch the customers");
    return res.json(new ApiResponse_1.ApiResponse(200, customers, "customers fetched successfully"));
});
exports.addCustomer = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { orgId: organisation } = req.params;
    const { fullName, email, address } = req.body;
    const savedAddress = await address_model_1.Address.create(address);
    if (!savedAddress?._id)
        throw new ApiError_1.ApiError(400, "failed to save the customerAddress");
    const customer = await customer_mode_1.Customer.create({
        fullName,
        email,
        organisation,
        address: savedAddress._id,
    });
    if (!customer)
        throw new ApiError_1.ApiError(400, "failed to add customer");
    return res.json(new ApiResponse_1.ApiResponse(200, customer, "customer added successfully"));
});
exports.updateCustomer = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { customerId, orgId: organisation } = req.params;
    const { fullName, email, address } = req.body;
    const savedAddress = await address_model_1.Address.create(address);
    if (!savedAddress?._id)
        throw new ApiError_1.ApiError(400, "failed to update the customer's Address");
    const updatedCustomer = await customer_mode_1.Customer.findOneAndUpdate({
        _id: customerId,
        organisation,
    }, {
        $set: { fullName, email, organisation, address: savedAddress._id },
    }, { new: true });
    if (!updatedCustomer)
        throw new ApiError_1.ApiError(400, "failed to update the customer");
    return res.json(new ApiResponse_1.ApiResponse(200, updatedCustomer, "customer updated successfully"));
});
exports.deleteCustomer = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { customerId, orgId: organisation } = req.params;
    const deletedCustomer = await customer_mode_1.Customer.findOneAndDelete({
        _id: customerId,
        organisation,
    });
    if (!deletedCustomer)
        throw new ApiError_1.ApiError(400, "failed to delete the customer or customer does not exist");
    await address_model_1.Address.findByIdAndDelete(deletedCustomer.address);
    return res.json(new ApiResponse_1.ApiResponse(200, deletedCustomer, "customer deleted successfully"));
});
//# sourceMappingURL=customer.controllers.js.map