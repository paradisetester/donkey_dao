import { Address } from '@randlabs/myalgo-connect';
import React, { useEffect, useState } from 'react'; // importing FunctionComponent
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

const VotePercentage: React.FC<AddressAssetSupplyCountProps> = ({ address, asset_id, total_suply }) => {
  const [votePercentage, setVotePercentage] = useState("0.00");
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    async function getPercentage() {
      let response = await indexerClient.searchForTransactions()
        .address(address)
        .assetID(asset_id).do()


      var asset_supply = 0;
      response.transactions.map((transaction: TransactionType) => {
        asset_supply += transaction["asset-transfer-transaction"]?.amount || 0;
        return transaction;
      })
      const percentage = (asset_supply / total_suply) * 100;
      setVotePercentage(parseFloat(percentage.toString()).toFixed(2));
      setVoteCount(response.transactions.length || 0);
    }
    getPercentage();
  }, [address, asset_id, total_suply])

  return (
    <>{votePercentage}% ({voteCount})</>
  );
};

export default VotePercentage;