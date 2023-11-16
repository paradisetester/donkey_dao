import algosdk from "algosdk";
const token = {
  "X-API-key": process.env.REACT_APP_ALGOD_API_KEY as string,

};

const algodClient = new algosdk.Algodv2(
  token,
  process.env.REACT_APP_ALGOD_V3_DOT_0_DOT_1_MAINNET,
  ""
);

export { algodClient };