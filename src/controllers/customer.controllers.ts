import { Customer } from "../models/customer.mode";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const allCustomers = asyncHandler(async (req, res) => {
  const { orgId } = req.params;
  const customers = await Customer.find({ organisation: orgId }).populate(
    "address"
  );

  if (!customers) throw new ApiError(400, "failed to fetch the customers");

  return res.json(
    new ApiResponse(200, customers, "customers fetched successfully")
  );
});

export const addCustomer = asyncHandler(async (req, res) => {
  const { orgId: organisation } = req.params;

  const customer = await Customer.create({ ...req.body, organisation });
  if (!customer) throw new ApiError(400, "failed to add customer");

  return res.json(
    new ApiResponse(200, customer, "customer added successfully")
  );
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId, orgId: organisation } = req.params;

  const updatedCustomer = await Customer.findOneAndUpdate(
    {
      _id: customerId,
      organisation,
    },
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedCustomer)
    throw new ApiError(400, "failed to update the customer");

  return res.json(
    new ApiResponse(200, updatedCustomer, "customer updated successfully")
  );
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId, orgId: organisation } = req.params;
  const deletedCustomer = await Customer.findOneAndDelete({
    _id: customerId,
    organisation,
  });
  
  if (!deletedCustomer)
    throw new ApiError(
      400,
      "failed to delete the customer or customer does not exist"
    );

  return res.json(
    new ApiResponse(200, deletedCustomer, "customer deleted successfully")
  );
});
