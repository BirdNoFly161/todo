/****************************************************/
/*
either load the variables from environement or use default values
environement variables willb be populated by the hosting environment or will be loaded from .env file using dotenv
*/
/****************************************************/
import dotenv from "dotenv";
let clientURLS = [];
const environment = process.env.Environment;
let BLOB_READ_WRITE_TOKEN =
  "vercel_blob_rw_nSVZogblPOrEptLk_I8r8UlA2bYNTxrk0vHdU9EuyEqFqKO";

if (environment != "production") {
  dotenv.config();
  clientURLS = ["http://localhost:5173"];
} else {
  clientURLS = [
    "https://oussamabenmansour.site",
    "https://todo-app-sharpoussama-gmailcom.vercel.app",
  ];
}

const secret = process.env.secret || "what is a secret bruh";

export { secret, environment, clientURLS, BLOB_READ_WRITE_TOKEN };
