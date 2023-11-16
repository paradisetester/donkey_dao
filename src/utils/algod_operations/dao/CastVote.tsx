import React from "react";

import { Address } from "@randlabs/myalgo-connect";
import VoteButton from "./VoteButton"
import { TailSpin } from "react-loader-spinner";

interface CastVoteProps {
  opt_no_address?: Address;
  opt_yes_address?: Address;
  qn_asset_id: number;
  amount: number;
  onUpdate: any;
  qn_index: number;
  qn_id: number;
}

const CastVote: React.FunctionComponent<CastVoteProps> = (props) => {

  const [updated, setUpdated] = props.onUpdate;

  const enum qnType {
    YES,
    NO
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
          <VoteButton
            opt_yes_address={props.opt_yes_address as Address}
            opt_no_address={props.opt_no_address as Address}
            qn_type={qnType.YES}
            qn_asset_id={props.qn_asset_id as number}
            amount_transferable={props.amount}
            button_label={"yes"}
            onUpdate={[updated, setUpdated]}
            qn_index={props.qn_index as number}
            qn_id={props.qn_id}
          />

          <VoteButton
            opt_yes_address={props.opt_yes_address as Address}
            opt_no_address={props.opt_no_address as Address}
            qn_type={qnType.NO}
            qn_asset_id={props.qn_asset_id as number}
            amount_transferable={props.amount}
            button_label={"no"}
            onUpdate={[updated, setUpdated]}
            qn_index={props.qn_index as number}
            qn_id={props.qn_id}
          />
        </>
      )
      }
    </>
  )

}

export default CastVote;