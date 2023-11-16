import React from "react";

import { Address } from "@randlabs/myalgo-connect";
import AssetOptInToVote from "../address/AssetOptInToVote";
import AssetTransferByAdminToAnyAddress from "../address/AssetTransferByAdminToAnyAddress";
import { useDispatch } from "react-redux";
import { wallet } from "../../../_constants/wallet.constants";
import { GrFormNextLink } from "react-icons/gr";
import { TailSpin } from "react-loader-spinner";

interface OptInAssetrops {
  qn_asset_id: number;
  user_address: Address;
  amount: number;
  onUpdate: any;
}

const OptInAsset: React.FunctionComponent<OptInAssetrops> = (props) => {

  const [updated, setUpdated] = props.onUpdate;

  const dispatch = useDispatch();

  async function callback(
    user_address: Address,
    qn_asset_id: number,
    amount: number
  ) {
    setUpdated(true);
    AssetTransferByAdminToAnyAddress(user_address, qn_asset_id, amount);
    let today = new Date();
    let time = today.toString();
    dispatch({ type: wallet.SET_HOC_UPDATE_VERSION, payload: time });
    setUpdated(false);
  }

  return (
    <>
      {updated ? (
        <div className="spin_loader">
          <TailSpin
            color="#00BFFF"
            height="90"
            width="100"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
          Please opt-in ASSET to vote{" "}
          <button
            className="cstm_btn arrow_btn"
            onClick={() => {
              setUpdated(true);
              AssetOptInToVote(
                props.user_address as Address,
                props.qn_asset_id as number,
                props.amount as number,
                callback
              );
            }}
          >
            <GrFormNextLink />
          </button>
        </>
      )}
    </>
  );
}
export default OptInAsset;
