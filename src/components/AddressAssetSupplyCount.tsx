import { Address } from '@randlabs/myalgo-connect';
import React, { useEffect, useState } from 'react'; // importing FunctionComponent
// import { getTotalAddressTransactions } from '../utils/algod_operations/getAddressTransactions';
import { indexerClient } from '../utils/connections/algosdk_indexer';

type AddressAssetSupplyCountProps = {
  address: Address,
  asset_id: number,
  total_suply: number
}

type TransactionType = {
  "asset-transfer-transaction": {
    amount: number
  }
}

// yes address check transaction w.r.t asset id

const AddressAssetSupplyCount: React.FC<AddressAssetSupplyCountProps> = ({ address, asset_id, total_suply }) => {

  const [votesCount, setVoteCount] = useState("0");

  useEffect(() => {
    async function getPercentage() {
      // const addressCount = await getTotalAddressTransactions(address);
      let response = await indexerClient.searchForTransactions()
        .address(address)
        .assetID(asset_id).do()


      var asset_supply = 0;
      response.transactions.map((transaction: TransactionType) => {
        asset_supply += transaction["asset-transfer-transaction"]?.amount || 0;
        return transaction;
      })
      const percentage = (asset_supply / total_suply) * 100;
      setVoteCount(parseFloat(percentage.toString()).toFixed(2));
    }
    getPercentage();
  }, [address, asset_id, total_suply])

  return (
    <>{votesCount}</>
  );
};

export default AddressAssetSupplyCount;