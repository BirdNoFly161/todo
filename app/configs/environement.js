const environement = getEnvironment();
let apiURL = "";
let clientURL = "";

if (environement === "development") {
  apiURL = "http://localhost:3001";
  clientURL = "http://localhost:5173";
}

if (environement === "production") {
  apiURL = "https://todo-app-vsfq-backend.vercel.app";
  clientURL = "https://todo-app-sharpoussama-gmailcom.vercel.app/";
}

function getEnvironment() {
  return import.meta.env.MODE;
}

export { environement, apiURL, clientURL };
