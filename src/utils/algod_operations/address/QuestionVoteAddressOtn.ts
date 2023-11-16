import algosdk from "algosdk";

import { algodClient, } from "../../connections";

const QuestionVoteAddressOtn = async (sender: string, assetId: number,private_key:string, amount: number = 0,) => {
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
    // const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

    // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
    //makeAssetTransferTxnWithSuggestedParams
    const recipient = sender
    
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, // Sender Address
        recipient, // Receiver Address
        closeRemainderTo,
        revocationTarget,
        amount,
        note,
        assetId,
        suggestedParams);
};

export default QuestionVoteAddressOtn;