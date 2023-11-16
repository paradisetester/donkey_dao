import algosdk from 'algosdk';
import { indexerClient } from '../../connections';

interface AssetType {
    "asset-id": number
}

const getAssets = async (address: any, assetId: number = 0) => {
    try {
        const userAccount = await indexerClient.lookupAccountByID(address)
            .do();

        const assets: any = userAccount?.account?.assets || [];
        if (assetId > 0) {
            const checkAsset = assets.find((asset: AssetType)  => asset["asset-id"] === assetId);
            return checkAsset ? checkAsset : false;
        }
        return assets;
    } catch (error) {
    return false;
}
}

export default getAssets;