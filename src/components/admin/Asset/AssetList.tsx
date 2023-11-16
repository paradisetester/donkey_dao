import React, { Component, useEffect, useState, } from "react";

import { indexerClient } from '../../../utils/connections'
import { useSelector } from 'react-redux';
import { RootState } from "../../../rootReducer";

const AssetList: React.FunctionComponent = (props) => {

  const UserAddress = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });

  const balance = useSelector((state: RootState) => {
    return state.walletReducer["balance"];
  });

  const address = '';
  const accountTxns =  indexerClient.lookupAccountTransactions(address).do();
  const data=console.log(accountTxns)

  




  return (
    <>


      <h1>
        hello this is set{data}
      </h1>
    </>
  )
}

export default AssetList