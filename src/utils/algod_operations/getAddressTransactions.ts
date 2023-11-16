import { Address } from "@randlabs/myalgo-connect";
import { indexerClient } from "../connections/algosdk_indexer";
var WAValidator = require('multicoin-address-validator');

export async function getTotalAddressTransactions(address: any, asset_id: number = 0):Promise<number> {
    if (asset_id === 0){ return 0}
    let address_amount: number = 0;
    try {
        var valid = WAValidator.validate(address, 'algo');
        if(valid){ 
            const transaction_details = await indexerClient.lookupAssetBalances(asset_id).do();
            for (let index = 0; index < transaction_details.balances.length; index++) {
                let z = transaction_details.balances[index].address as Address;
                if(z === address as Address){
                    address_amount = transaction_details.balances[index].amount;
                }
            }
            return address_amount;
        }else{
            return 0;
        }
    } catch (error) {
        return 0;
    }
}