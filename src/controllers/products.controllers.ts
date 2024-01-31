import { ProductType } from "../middlewares/product.middleware";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const addProduct = asyncHandler(async (req, res) => {
  const { name, organisation } = <ProductType>req.body;
  const product = Product.findOne({ name, organisation });
  if (product) {
    const error = "product already exists in this organisation";
    throw new ApiError(400, error, [{ message: error }, product]);
  }
});
