




import algosdk from "algosdk";

import { algodClient, indexerClient } from "../../connections";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const AdminPaymentTransfer = async (sender: string, recipient: string, amount: number = 1000000) => {
  //comment out the next two lines to use suggested fee
  // params.fee = 1000;
  // params.flatFee = true;


   // Construct the transaction
   let params = await algodClient.getTransactionParams().do();
   // comment out the next two lines to use suggested fee
   params.fee = algosdk.ALGORAND_MIN_TX_FEE;
   params.flatFee = true;
   
   const enc = new TextEncoder();
   const note = enc.encode("Hello World");
   amount = amount ? amount : 1000000;
   let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
       from: sender, 
       to: recipient, 
       amount: amount, 
       note: note, 
       suggestedParams: params
   });

   const myAlgoWallet = new MyAlgoConnect();
   const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
   const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
 
   const confirmedTxn = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
  return response;
};

export default AdminPaymentTransfer;


