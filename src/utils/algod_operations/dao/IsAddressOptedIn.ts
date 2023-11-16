import { Address } from "@randlabs/myalgo-connect";
import { indexerClient } from "../../connections/algosdk_indexer";
var WAValidator = require('multicoin-address-validator');

export default async function IsAddressOpedIn(address: any, asset_id: number = 0):Promise<boolean> {
    if (asset_id == 0){ return false}
    let is_address_opted_in: boolean = false;
    try {
        var valid = WAValidator.validate(address, 'algo');
        if(valid){ 
            const transaction_details = await indexerClient.lookupAssetBalances(asset_id).do();
            for (let index = 0; index < transaction_details.balances.length; index++) {
                let asset_address = transaction_details.balances[index].address as Address;
                if(asset_address as Address == address as Address){
                    is_address_opted_in = true;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    return is_address_opted_in;
}
