const BASE_PATH_FOR_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://dine-market-one.vercel.app";
export default BASE_PATH_FOR_API;
