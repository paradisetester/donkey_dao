import algosdk from "algosdk";
import { algodClient } from "../../connections/algosdk_algodv2";

const AssetTransferByManimonic = async (mnemonic: string, assetID: number) => { 


    const recipient = algosdk.mnemonicToSecretKey(mnemonic);
    let params = await algodClient.getTransactionParams().do();
    let sender_addr = recipient.addr;
    let recipient_addr = sender_addr;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let note = undefined;
    let amount = 0;
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender_addr, recipient_addr, closeRemainderTo, revocationTarget,
        amount,  note, assetID, params);
    let rawSignedTxn = txn.signTxn(recipient.sk)
    let tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    return tx;
}

export default AssetTransferByManimonic;