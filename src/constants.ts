export const PORT = process.env.PORT || 8000;

// mongoose model schema collections
export const ORGANISATION = "Organisation";
export const USER = "User";
export const INVOICE = "Invoice";
export const ADDRESS = "Address";
export const CUSTOMER = "Customer";
export const PRODUCT = "Product";
export const BANK_ACC_INFO = "BankAccInfo";
// mongoose model schema enums
export const INVOICE_STATUS_ENUM = ["DRAFT", "PENDING", "PAID"] as const;
