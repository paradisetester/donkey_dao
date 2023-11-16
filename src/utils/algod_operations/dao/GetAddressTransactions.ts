import { Address } from "@randlabs/myalgo-connect";
import { indexerClient } from "../../connections/algosdk_indexer";

export async function GetAddressTransactions(address: Address, asset_id: number,  opt_yes_address: Address, opt_no_address: Address): Promise<number> {
    let count = 0;
    try {
        const transaction_details = await indexerClient.lookupAccountTransactions(address).assetID(asset_id).do();
        for (let index = 0; index < transaction_details.transactions.length; index++) {
            let asset_address = transaction_details.transactions[index]["asset-transfer-transaction"].receiver as Address;
            if(asset_address as Address === opt_yes_address as Address){
                count++;
            }else if(asset_address as Address === opt_no_address as Address){
                count++;
            }
        }
    } catch (error) {
        console.log(error);
    }

    return count;

}
