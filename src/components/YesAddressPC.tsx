import React, { useEffect, useState } from 'react'; // importing FunctionComponent
import { Address } from '@randlabs/myalgo-connect';
import { getAccountDetail } from '../utils/algod_operations/getAccountDetail';
// import { getTotalAddressTransactions } from '../utils/algod_operations/getAddressTransactions';
import { indexerClient } from '../utils/connections';

type YesAddressPCProps = {
  yes_address: Address,
  no_address: Address
}

const YesAddressPC: React.FC<YesAddressPCProps> = (props) => {
  const { yes_address, no_address } = props;
  const [addressAssetBalance, setAddressAssetBalance] = useState(0);
  const [yesAddressObject, setYesAddressObject] = useState({
    count: 0,
    percentage: 0
  });
  const [noAddressObject, setNoAddressObject] = useState({
    count: 0,
    percentage: 0
  });



  useEffect(() => {
    // async function getToken() {
    //   const account = await getAccountDetail(address);
    //   console.log(account, address)
    // }
    // getToken();

    const getTotalVotePercentage = async () => {
      // accountInformation
      [no_address, no_address].map(async (address: Address, key: number) => {
        const accountInfo = await indexerClient
          .lookupAccountTransactions(address)
          .do();

        var txnLen = (accountInfo?.transactions || []).length;
        if (key == 0) {
          setNoAddressObject({
            count: txnLen,
            percentage: txnLen
          });
        } else {
          setYesAddressObject({
            count: txnLen,
            percentage: txnLen
          });
        }

      })
    };

    getTotalVotePercentage();
  }, [])

  return (
    <>

      <div className="radio_btn_outr">
        <div className="radio_btn">
          <button
            type="button"
            onClick={() => {

            }}
          >
            Yes {yesAddressObject.percentage}% {yesAddressObject.count}
          </button>
        </div>
        <div className="radio_btn">
          <button
            type="button"
            onClick={() => {

            }}
          >
            No {noAddressObject.percentage}% {noAddressObject.count}
          </button>
        </div>
      </div>
    </>
  );
};

export default YesAddressPC;