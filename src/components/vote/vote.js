import { algodClient } from "../../utils/connections/algosdk_algodv2";
// const algodClient =algodClient()
console.log(algodClient);
const algosdk = require("algosdk");
const prompt = require("prompt-sync")();

const mnemonic =
  "bench, fork, over, beach, milk,crowd, valley, unveil, vapor, transfer,shiver, pulse, wonder, suspect, curtain,next, have, century, exile, review,organ, dwarf, pattern, above, arena";

const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

const ASSET_ID = 21364625;
const voting_address =
  "JOCFGTH4FTJGLAWDDQTY6IIPPPIMPEBXKUXQTZ4ZNBUWA7MXS2BRIJWYJM";

// const chooseVotingOption = async () => {
//   const candidateOption = prompt(
//     "Press 0 for candidate Zero or Press 1 for candidate One:"
//   );

//   const amount = prompt("Please enter Amount to commit to voting:");

//   const params = await algodClient.getTransactionParams().do();
//   const encoder = new TextEncoder();

//   if (!candidateOption) {
//     console.log("Please select a valid candidate option");
//   } else if (!Number(amount)) {
//     console.log("Please Enter A valid Choice token amount to vote");
//   } else if (candidateOption == "0") {
//     try {
//       let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
//         recoveredAccount.addr,
//         voting_address,
//         undefined,
//         undefined,
//         Number(amount),
//         encoder.encode("Voting with no "),
//         ASSET_ID,
//         params
//       );

//       let signedTxn = txn.signTxn(recoveredAccount.sk);
//       const response = await algodClient.sendRawTransaction(signedTxn).do();
//       if (response) {
//         console.log(
//           `You just voted for candidate Zero,Your voting ID: ${response.txId}`
//         );

//         waitForConfirmation(algodClient, response.txId);
//       } else {
//         console.log("error voting for candidate Zero, try again later");
//       }
//     } catch (error) {
//       console.log("error voting for candidate Zero, Try again later");
//     }
//   } else if (candidateOption == "1") {
//     try {
//       let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
//         recoveredAccount.addr,
//         voting_address,
//         undefined,
//         undefined,
//         Number(amount),
//         encoder.encode("Voting with yes"),
//         ASSET_ID,
//         params
//       );
//       let signedTxn = txn.signTxn(recoveredAccount.sk);
//       const response = await algodClient.sendRawTransaction(signedTxn).do();
//       if (response) {
//         console.log(
//           `You just voted for candidate One,Your voting ID: ${response.txId}`
//         );

//         waitForConfirmation(algodClient, response.txId);
//       } else {
//         console.log("error voting for candidate one, try again later");
//       }
//     } catch (error) {
//       console.log("Error voting for candidate One, Try again later");
//     }
//   }
// };
// chooseVotingOption()
// const waitForConfirmation = async function (algodClient, txId) {
//   let lastround = (await algodClient.status().do())["last-round"];
//   while (true) {
//     const pendingInfo = await algodClient
//       .pendingTransactionInformation(txId)
//       .do();
//     if (
//       pendingInfo["confirmed-round"] !== null &&
//       pendingInfo["confirmed-round"] > 0
//     ) {
//       //Got the completed Transaction
//       console.log(
//         "Voting confirmed in round " + pendingInfo["confirmed-round"]
//       );
//       break;
//     }
//     lastround++;
//     await algodClient.statusAfterBlock(lastround).do();
//   }
// };

// const checkBalance = async () => {
//   // get the account information
//   const accountInfo = await algodClient
//     .accountInformation(recoveredAccount.addr)
//     .do();
//   const assets = accountInfo["assets"];

//   // get choice amount from assets
//   assets.map((asset) => {
//     if (asset["asset-id"] === ASSET_ID) {
//       const amount = asset["amount"];
//       const choiceAmount = amount / 100;
//       console.log(
//         `Account ${recoveredAccount.addr} has ${choiceAmount} $choice`
//       );
//       return;
//     } else {
//       console.log(
//         `Account ${recoveredAccount.addr} must opt in to Choice Coin Asset ID ${ASSET_ID}`
//       );
//     }
//   });
// };

// checkBalance();
