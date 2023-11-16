import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { Address } from "@randlabs/myalgo-connect";

import { algodClient } from "../../connections";

const assetTransfer = async (sender: Address, recipient: Address, assetId: number, amount: number = 0, mnemonic: any = '') => {
  //comment out the next two lines to use suggested fee
  // params.fee = 1000;
  // params.flatFee = true;

  //Amount of the asset to transfer
  // cosnnt = 10;
  // const amount = 1;
  const suggestedParams = await algodClient.getTransactionParams().do();

  // We set revocationTarget to undefined as 
  // This is not a clawback operation
  let revocationTarget = undefined;
  // CloseReaminerTo is set to undefined as
  // we are not closing out an asset
  let closeRemainderTo = undefined;
  let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
  var recoveredAccount:any = "";
  if(mnemonic){
    recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
    sender = recoveredAccount.addr;
    recipient = sender;
  }
  
  // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
  //makeAssetTransferTxnWithSuggestedParams
  let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender, // Sender Address
    recipient, // Receiver Address
    closeRemainderTo,
    revocationTarget,
    Number(amount),
    note,
    assetId,
    suggestedParams);
  // sign the transaction
  if(mnemonic){
    recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
    const signedTxn = opttxn.signTxn(recoveredAccount.sk);
    const response = await algodClient.sendRawTransaction(signedTxn).do();
    await algosdk.waitForConfirmation(algodClient, response.txId, 4);
    return response;
  } else {
    const myAlgoWallet = new MyAlgoConnect();
    const signedTxn = await myAlgoWallet.signTransaction(opttxn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    await algosdk.waitForConfirmation(algodClient, response.txId, 4);
    return response;
  }


};

export default assetTransfer;
