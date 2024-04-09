"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB connection failed");
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=index.js.map