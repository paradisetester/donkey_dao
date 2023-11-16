import React, { useEffect, useState } from "react";
import { Address } from "@randlabs/myalgo-connect";
import AssetTransferByMyAlgoWallet from "../../../utils/algod_operations/address/AssetTransferByMyAlgoWallet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../src/rootReducer";
import { getAssetBalanceOfAddress } from "./GetAssetBalanceOfAddress";
import { MainApiProtectedVersion } from "../../axios/requests";

interface VoteButtonProps {
  opt_yes_address: Address;
  opt_no_address: Address;
  qn_type: number;
  qn_asset_id: number;
  amount_transferable: number;
  button_label: string;
  onUpdate: any;
  qn_index: number;
  qn_id: number
}

const VoteButton: React.FunctionComponent<VoteButtonProps> = (props) => {

  let user_address = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });

  const dispatch = useDispatch()

  const [updated, setUpdated] = props.onUpdate;

  const numbers_in_text = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]

  const enum qnType {
    YES,
    NO
  }

  enum booleon {
    YES = "YES",
    NO = "NO"
  }

  let qn_option_addr = props.qn_type === qnType.YES ? props.opt_yes_address : props.opt_no_address;

  async function callback() {
    setUpdated(true);
    /* update vote detail by number */
    let balance_yes_qn = 0;
    let balance_no_qn = 0;
    let total_asset_supply = 0;

    balance_yes_qn = await getAssetBalanceOfAddress(
      props.opt_yes_address,
      props.qn_asset_id
    );

    balance_no_qn = await getAssetBalanceOfAddress(
      props.opt_no_address,
      props.qn_asset_id
    );

    total_asset_supply = balance_yes_qn + balance_no_qn;

    let percentage_yes_balance = ((balance_yes_qn / total_asset_supply) * 100) || 0;
    let percentage_no_balance = ((balance_no_qn / total_asset_supply) * 100) || 0;

    let id = props.qn_id


    // const body = {
    //   id: props.qn_id,
    const option_address_yes =
    {
      question: props.qn_id,
      total_weight: balance_yes_qn,
      total_percent: percentage_yes_balance,
      amount:balance_yes_qn,
    }
    
    const option_address_no =
    {
      question: props.qn_id,
      total_weight: balance_no_qn,
      total_percent: percentage_no_balance,
      amount:balance_no_qn,
    }


    const obj = new MainApiProtectedVersion('', id);
    const requstUpdateYes = obj.requstUpdateVoteYes(option_address_yes)
    const requstUpdateNo = obj.requstUpdateVoteNo(option_address_no)

    dispatch({ type: `SET_` + numbers_in_text[props.qn_index] + `_QN_` + booleon.NO + `_VOTE_WEIGHTAGE`, payload: balance_no_qn });
    dispatch({ type: `SET_` + numbers_in_text[props.qn_index] + `_QN_` + booleon.YES + `_VOTE_WEIGHTAGE`, payload: balance_yes_qn });
    dispatch({ type: `SET_` + numbers_in_text[props.qn_index] + `_QN_` + booleon.NO + `_VOTE_PCT`, payload: percentage_no_balance.toFixed() });
    dispatch({ type: `SET_` + numbers_in_text[props.qn_index] + `_QN_` + booleon.YES + `_VOTE_PCT`, payload: percentage_yes_balance.toFixed() });

    setUpdated(false);

  }

  return (
    <>
      <button
        className="cstm_btn yes_no"
        onClick={() => {
          setUpdated(true);

          AssetTransferByMyAlgoWallet(
            user_address,
            qn_option_addr,
            props.qn_asset_id,
            props.amount_transferable,
            callback
            
          );
        }}
      >
        {props.button_label}
      </button>
    </>
  );
};

export default VoteButton;