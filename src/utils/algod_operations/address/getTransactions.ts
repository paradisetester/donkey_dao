import { indexerClient } from '../../connections';

const getTransactions = async (address: any, assetId: number = 0, minAmount: number = 0, ) => {
    var transactions = indexerClient.searchForTransactions()
        .address(address)
        .currencyGreaterThan(minAmount);
    if(assetId > 0) {
        transactions.assetID(assetId);
    }
    return await transactions.do();
}

export default getTransactions;