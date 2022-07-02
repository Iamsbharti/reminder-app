let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.REACT_APP_BASE_API_URL_DEV;
} else {
  baseUrl = process.env.REACT_APP_BASE_API_URL_PROD;
}
module.exports = baseUrl;
