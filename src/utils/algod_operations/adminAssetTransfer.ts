import algosdk from "algosdk";

import { algodClient, indexerClient } from "../connections";

const adminAssetTransfer = async (recipient: string, assetId: number, amount: number = 0) => {
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
    const mnemonic: any = process.env.REACT_APP_MNEMONIC?.toString()
    const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

    // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
    //makeAssetTransferTxnWithSuggestedParams
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        recoveredAccount.addr, // Sender Address
        recipient, // Receiver Address
        closeRemainderTo,
        revocationTarget,
        amount,
        note,
        assetId,
        suggestedParams);
    // sign the transaction

    const rawSignedTxn = opttxn.signTxn(recoveredAccount.sk)
    const response = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, response.txId, 4);

    return response;
};

export default adminAssetTransfer;