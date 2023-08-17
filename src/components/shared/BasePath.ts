const BASE_PATH_FOR_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://dine-market-pm5bj87m0-haseeb0128.vercel.app";
export default BASE_PATH_FOR_API;
