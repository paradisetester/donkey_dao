import { indexerClient } from "../../connections/algosdk_indexer";

export async function getAssetTransactions(assetId: number = 0): Promise<any> {
    if (assetId == 0){ return 0}
    try {
        const transaction_details = await indexerClient.lookupAssetTransactions(assetId).do();
        return transaction_details;
    } catch (error) {
        return [];
    }
}
