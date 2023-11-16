import MyAlgoConnect, { Address } from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { algodClient } from "../../connections/algosdk_algodv2";

const AssetTransferByMyAlgoWallet = async (

    sender_addr: Address, 
    recipient_addr: Address, 
    asset_id: number,
    amount: number,
    callback: any) => {
    let params = await algodClient.getTransactionParams().do();
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let note = undefined;   
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender_addr, 
        to: recipient_addr,
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetIndex: asset_id, 
        suggestedParams: params});
    const myAlgoWallet = new MyAlgoConnect();
    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    await algosdk.waitForConfirmation(algodClient, response.txId, 6);
    
    callback();
    
    return response;

}

export default AssetTransferByMyAlgoWallet;