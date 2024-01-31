import { ProductType } from "../middlewares/product.middleware";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const addProduct = asyncHandler(async (req, res) => {
  const { name, unitPrice } = <ProductType>req.body;
  const { orgId: organisation } = req.params;

  const product = await Product.findOne({ name, organisation });
  if (product) {
    const error = "product already exists in this organisation";
    throw new ApiError(400, error, [{ message: error }, product]);
  }

  const newProduct = await Product.create({ name, unitPrice, organisation });
  if (!newProduct?._id) {
    const error = "unable to save product";
    throw new ApiError(500, error, [{ message: error }]);
  }

  return res.json(newProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name } = <ProductType>req.body;

  const { orgId: organisation, productId } = req.params;

  const product = await Product.findOne({ name, organisation });

  if (product._id.toString() !== productId.toString()) {
    const error = "product already exists in this organisation";
    throw new ApiError(400, error, [{ message: error }, product]);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedProduct?._id) {
    const error = "unable to update the product";
    throw new ApiError(500, error, [{ message: error }]);
  }
  return res.json(updatedProduct);
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { orgId } = req.params;
  const products = await Product.find({ organisation: orgId });

  return res.json(
    new ApiResponse(200, products, "products fetched successfully")
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = Product.findOneAndDelete({ _id: productId });
  if (!deletedProduct) throw new ApiError(400, "unable to delete the product");
  return res.json(
    new ApiResponse(
      200,
      deletedProduct,
      `${(await deletedProduct).name} deleted successfully`
    )
  );
});
