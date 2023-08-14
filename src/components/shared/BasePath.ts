const BASE_PATH_FOR_API =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
export default BASE_PATH_FOR_API;
