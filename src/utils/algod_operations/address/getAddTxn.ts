import { indexerClient } from '../../connections';


const getAddTxn = async (address: any, assetId: number = 0, minAmount: number = 0, ) => {

    try {
        const AccountTxn = await indexerClient.lookupAccountTransactions(address)
            .do();
        return AccountTxn;
    } catch (error) {
    return false;
}
}

export default getAddTxn;