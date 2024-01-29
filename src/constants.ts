export const PORT = process.env.PORT || 8000;

// model schema constants
export const ORGANISATION = "Organisation";
export const USER = "User";
export const INVOICE = "Invoice";
export const ADDRESS = "Address";
export const CUSTOMER = "Customer";
export const PRODUCT = "Product";
export const BANK_ACC_INFO = "BankAccInfo";
export const UPI_ID_PATTERN = RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);
