import { Address } from '@randlabs/myalgo-connect';
import React, { useEffect, useState } from 'react'; // importing FunctionComponent
import { getTotalAddressTransactions } from '../utils/algod_operations/getAddressTransactions';

type VotesCountProps = {
  address_no: any,
  address_yes: Address
}

const VotesCount: React.FC<VotesCountProps> = (address_yes, address_no) => {

  const [votesCount, setVoteCount] = useState(0);

  useEffect(() => {
     async function getToken() {
        const yes_address_count = await getTotalAddressTransactions(address_yes);
        const no_address_count = await getTotalAddressTransactions(address_no);
        const votes_count = yes_address_count + no_address_count;
        setVoteCount(votes_count);
     }
     getToken();
  }, [])
  
  return (
    <>{votesCount}</>
  );
};

export default VotesCount;