"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getAllProducts = exports.updateProduct = exports.addProduct = void 0;
const product_model_1 = require("../models/product.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.addProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, unitPrice } = req.body;
    const { orgId: organisation } = req.params;
    const product = await product_model_1.Product.findOne({ name, organisation });
    if (product) {
        const error = "product already exists in this organisation";
        throw new ApiError_1.ApiError(400, error, [{ message: error }, product]);
    }
    const newProduct = await product_model_1.Product.create({ name, unitPrice, organisation });
    if (!newProduct?._id) {
        const error = "unable to save product";
        throw new ApiError_1.ApiError(500, error, [{ message: error }]);
    }
    return res.json(newProduct);
});
exports.updateProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name } = req.body;
    const { orgId: organisation, productId } = req.params;
    const product = await product_model_1.Product.findOne({ name, organisation });
    if (product._id.toString() !== productId.toString()) {
        const error = "product already exists in this organisation";
        throw new ApiError_1.ApiError(400, error, [{ message: error }, product]);
    }
    const updatedProduct = await product_model_1.Product.findByIdAndUpdate(productId, {
        $set: req.body,
    }, { new: true });
    if (!updatedProduct?._id) {
        const error = "unable to update the product";
        throw new ApiError_1.ApiError(500, error, [{ message: error }]);
    }
    return res.json(updatedProduct);
});
exports.getAllProducts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { orgId } = req.params;
    const products = await product_model_1.Product.find({ organisation: orgId });
    return res.json(new ApiResponse_1.ApiResponse(200, products, "products fetched successfully"));
});
exports.deleteProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = product_model_1.Product.findOneAndDelete({ _id: productId });
    if (!deletedProduct)
        throw new ApiError_1.ApiError(400, "unable to delete the product");
    return res.json(new ApiResponse_1.ApiResponse(200, deletedProduct, `${(await deletedProduct).name} deleted successfully`));
});
//# sourceMappingURL=products.controllers.js.map