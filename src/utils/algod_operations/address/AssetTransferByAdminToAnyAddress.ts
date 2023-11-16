import algosdk from "algosdk";
import { algodClient } from "../../connections/algosdk_algodv2";

const AssetTransferByAdminToAnyAddress = async (recipient_addr: string, assetID: number, amount: number) => {  
    const sender = algosdk.mnemonicToSecretKey(process.env.REACT_APP_MNEMONIC as string);
    let params = await algodClient.getTransactionParams().do();
    let sender_addr = sender.addr;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let note = undefined;
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender_addr, recipient_addr, closeRemainderTo, revocationTarget,
        amount,  note, assetID, params);
    let rawSignedTxn = txn.signTxn(sender.sk)
    let tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    return tx;
}

export default AssetTransferByAdminToAnyAddress;