import { Address } from '@randlabs/myalgo-connect';
import React, { useEffect, useState } from 'react'; // importing FunctionComponent
import { getTotalAddressTransactions } from '../utils/algod_operations/getAddressTransactions';

type VotesCountProps = {
  address_no: Address,
  address_yes: Address,
  asset_id: number
} 

const VotesCount: React.FC<VotesCountProps> = ({ address_no, address_yes, asset_id}) => {

  const [votesCount, setVoteCount] = useState(0);

  useEffect(() => {
     async function getToken() {
        const yes_address_count = await getTotalAddressTransactions(address_yes, asset_id);
        const no_address_count = await getTotalAddressTransactions(address_no, asset_id);
        const votes_count = yes_address_count + no_address_count;
        setVoteCount(votes_count);
     }
     getToken();

  }, [address_yes, asset_id, address_no])
  
  return (
    <>{votesCount}</>
  );

};

export default VotesCount;