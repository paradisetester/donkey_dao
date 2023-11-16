import MyAlgoConnect, { Address } from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { algodClient } from "../../connections/algosdk_algodv2";


const AssetOptInToVote = async (

    recipient_addr: Address, 
    asset_id: number,
    amount: number,
    callback: any
    ) => {
        let to = recipient_addr;
        let from=to;

        let params = await algodClient.getTransactionParams().do();
        let revocationTarget = undefined;
        let closeRemainderTo = undefined;
        let note = undefined;
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            to, 
            from,
            closeRemainderTo, 
            revocationTarget,
            0,
            note,
            asset_id, 
            params
            );
        const myAlgoWallet = new MyAlgoConnect();
        const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        callback(recipient_addr, asset_id, amount);
        
        return response;
}

export default AssetOptInToVote;