import { indexerClient } from '../../connections';

const getNFT = async (address: any,) => {
    const transactions = await indexerClient.lookupAccountByID(address).do()    
    return transactions
}

export default getNFT;