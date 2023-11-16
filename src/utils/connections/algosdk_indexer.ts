import algosdk from "algosdk";
const token = {
  "X-API-key": process.env.REACT_APP_ALGOD_API_KEY as string,

};

const indexerClient = new algosdk.Indexer(
  token,
  process.env.REACT_APP_INDEXER_MAINNET_V2_DOT_2_DOT_1_API,
  ""
);

export { indexerClient };
