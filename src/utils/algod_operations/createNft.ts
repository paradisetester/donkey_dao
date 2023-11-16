import algosdk from 'algosdk';
import crypto from 'crypto';
import { algodClient } from "../connections/algosdk_algodv2";

export async function createNFT() {

    const sender = algosdk.mnemonicToSecretKey(process.env.REACT_APP_MNEMONIC  as string);
    const total = 1; 
    const decimals = 0;
    const assetName = "Arun's Art Versions";
    const unitName = 'ANTIQUEOTYUI';
    const url = "https://ipfs.io/ipfs/QmeaVRz7AkDHTbcffXSAt96UNf6Kd8HA1V2cAdHjjoHoVB?filename=nector.jpeg";
    const file = "https://ipfs.io/ipfs/QmRoJBBQLtX1AtTFw2Zz31VTq4F3EZjvQqc2fetfJPwxoG?filename=nft.json";
    const meta = await fetch(file, {
      method: 'GET', 
    });

    const metas = await meta.json() 
    const hash = crypto.createHash('sha256');
    hash.update(metas);
    const metadata = new Uint8Array(hash.digest());

    const { addr: freezeAddr } = algosdk.generateAccount(); // account that can freeze other accounts for this asset
    const { addr: managerAddr } = algosdk.generateAccount(); // account able to update asset configuration
    const { addr: clawbackAddr } = algosdk.generateAccount(); // account allowed to take this asset from any other account
    const { addr: reserveAddr } = algosdk.generateAccount(); // account that holds reserves for this asset
    const defaultFrozen = false;
    const params = await algodClient.getTransactionParams().do();

    // Signing and sending "txn" allows "addr" to create an asset
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: sender.addr,
      total,
      decimals,
      assetName,
      unitName,
      assetURL: url,
      assetMetadataHash: metadata,
      defaultFrozen,
      freeze: freezeAddr,
      manager: managerAddr,
      clawback: clawbackAddr,
      reserve: reserveAddr,
      suggestedParams: params,
    });
  
    const rawSignedTxn = txn.signTxn(sender.sk);
    const assetCreationObj = await algodClient.sendRawTransaction(rawSignedTxn)
              .do().catch((error: any) => {
                return null;
              })

    let assetID = null;      
    if(assetCreationObj != null){
      // Wait for transaction to be confirmed
      const confirmedTxn = await algosdk.waitForConfirmation(algodClient, assetCreationObj.txId, 4);
      //Get the completed Transaction
      assetID = confirmedTxn['asset-index'];
      return assetID;
    }else{
      return null;
    }
  }