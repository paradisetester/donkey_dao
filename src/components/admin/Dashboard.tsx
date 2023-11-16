import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap-v5";

import AssetList from './Asset/AssetList';
import { indexerClient } from "../../utils/connections";

export interface FormpageProps {
  props?: any;
}

export interface AccountInfoAsset {
  amount: number,
  "asset-id": number,
  creator: string,
  deleted: boolean,
  "is-frozen": boolean,
  "opted-in-at-round": number
}
interface AccountInfoAmount {

  address: string
  amount: number


}




const Dashboard: React.FunctionComponent<FormpageProps> = (props) => {
  const address = 'DDEVIXHFJ2TJBQUWZGR7ZLPRM4HPT6FNKPELQRW57QJAJSSRLBCPVI5BKQ';

  const [AssetCreate, setAssetCreate] = useState<AccountInfoAsset>()
  const [AssetList, setAssetlist] = useState<AccountInfoAsset>()
  const [Ammount, setAmmount] = useState<AccountInfoAmount>()




  useEffect(() => {
    console.log("Component mounted");
    accountInfo1()
    return () => { };
  }, []);


  async function accountInfo1() {
    const AccountInfo = await indexerClient.lookupAccountByID(address).do();
    const AccountInfoAmount = AccountInfo.account.amount
    const AccountInfoAssets = AccountInfo.account.assets
    const AccountInfoAssetsCreate = AccountInfo.account['created-assets']

    setAssetCreate(AccountInfoAssets)
    setAssetlist(AccountInfoAssetsCreate)
    setAmmount(AccountInfoAmount)
    // console.log("Response AccountInfo: " + JSON.stringify(AccountInfoAssets, undefined, 2));
    // console.log("Response AccountInfoAssets: " + JSON.stringify(AccountInfoAssets, undefined, 2));

  }
  // console.log("ResponseAssetCreate: " + JSON.stringify(AssetCreate, undefined, 2));
  

  return (
    <>
      <h2 className="sec_title wow fadeInDown">Dashboard   </h2>
      {/* <h3>
        Ammount  <span>
          {Ammount}

        </span>
      </h3>

      <Container fluid>
        <Row >
          <Col xs={6} sm={4}>Asset List</Col>

          <Col xs={6} sm={4}>created-assets List</Col>

        </Row>
        <Row>
        </Row>
      </Container> */}

    </>
  );
};

export default Dashboard;
