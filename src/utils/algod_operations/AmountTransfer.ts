
import algosdk from "algosdk";
import { algodClient } from "../connections";

export async function AmountTransfer(): Promise<string> {

    const senders = algosdk.mnemonicToSecretKey(process.env.REACT_APP_MNEMONIC  as string);
    const sender=""
     const receiver=""
    const params = await algodClient.getTransactionParams().do();
    const amount=1
    const note: any='vote addres money Trns'
    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: receiver, 
            amount: amount, 
            note: note, 
            suggestedParams: params
        });

        
    // let rawSignedTxn = txn.signTxn(sender.sk)
    // let tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
    return "test";

  }