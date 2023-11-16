import React, { useEffect, useState } from "react";
import { RootState } from "../../../../src/rootReducer";
import { useSelector } from "react-redux";
import MyAlgoWallet from "../../../components/MyAlgoWallet/MyAlgoWallet";
import CastVote from "./CastVote";
import getCommonNFTsCount, { getAccountDetail } from "../getAccountDetail";
import { Address } from "@randlabs/myalgo-connect";
import IsAddressOpedIn from "./IsAddressOptedIn";
import OptInAsset from "./OptInAsset";
import { GetAddressTransactions } from "./GetAddressTransactions";

import {
  TailSpin,
} from "react-loader-spinner";
import { adminAddres } from "../../../data";
import { MainApiProtectedVersion } from "../../axios/requests";
interface UserActionsWhileVotingProps {
  opt_yes_address: Address;
  opt_no_address: Address;
  qn_asset_id: number;
  useLoader: any;
  qn_id: number;
  qn_index: number;
}

const UserActionsWhileVoting: React.FunctionComponent<
  UserActionsWhileVotingProps
> = (props) => {
  const [updated, setUpdated] = useState(false);
  const [updatedv, setUpdatedv] = useState(false);

  const [commonNfts, setcommonNft] = useState(0);
  const [spinnerA, setSpinnerA] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinnerA(false), 5000);
  }, []);

  const [spinnerB, setSpinnerB] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinnerB(false), 5000);
  }, []);

  const [spinnerOptInAsset, setSpinnerOptInAsset] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinnerOptInAsset(false), 5000);
  }, []);

  const [spinnerCastVote, setSpinnerCastVote] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinnerCastVote(false), 5000);
  }, []);


  enum UserState {
    WALLET_NOT_CONNECTED = 1,
    WALLET_CONNECTED = 2,
    WALLET_ALGO_TOKENS_FOUND = 3,
    WALLET_ALGO_TOKENS_NOT_FOUND = 4,
    WALLET_CHEETAH_TOKENS_FOUND = 5,
    WALLET_CHEETAH_TOKENS_NOT_FOUND = 6,
    ASSET_NOT_OPTED_IN_BY_USER = 7,
    ASSET_OPTED_IN_BY_USER = 8,
    IS_VOTE_CASTED = 9,
    IS_ASSET_SUPPLY_OPTED = 10,
    IS_ALREADY_VOTED = 11,
    IS_ALREADY_NOT_VOTED = 12,
    IS_ADMIN = 13,
  }

  const [isWalletConnected, setIsWalletConnected] = useState(
    UserState.WALLET_NOT_CONNECTED
  );
  const [algoCountInUserAccount, setAlgoCountInUserAccount] = useState(
    UserState.WALLET_ALGO_TOKENS_NOT_FOUND
  );
  const [isNFTFoundInUserAccount, setIsNFTFoundInUserAccount] = useState(
    UserState.WALLET_CHEETAH_TOKENS_NOT_FOUND
  );
  const [isAssetOptedInByUser, setIsAssetOptedInByUser] = useState(
    UserState.ASSET_NOT_OPTED_IN_BY_USER
  );
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(
    UserState.IS_ALREADY_NOT_VOTED
  );

  const [IS_ADMIN, setIS_ADMIN] = useState(UserState.IS_ADMIN);
  const [balanceYesQn, setBalanceYesQn] = useState(0);
  const [balanceNoQn, setBalanceNoQn] = useState(0);
  const [percentageYesQn, setPercentageYesQn] = useState(0);
  const [percentageNoQn, setPercentageNoQn] = useState(0);

  const [NFTCountInUserAccount, setNFTCountInUserAccount] = useState(0);

  const user_address = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });

  const user_algo_balance = useSelector((state: RootState) => {
    return state.walletReducer["balance"];
  });

  useEffect(() => {
    if (user_address) {
      setIsWalletConnected(UserState.WALLET_CONNECTED);
      if (user_algo_balance >= 1) {
        setAlgoCountInUserAccount(UserState.WALLET_ALGO_TOKENS_FOUND);
        setSpinnerB(false);
      }
    }
  });
  useEffect(() => {
    (async function getData() {
      let nftCount: number = 0;
      const getUserDetail = await getAccountDetail(user_address);

      const nfts = adminAddres.map(async (address) => {
        const getAdminDetail = await getAccountDetail(address);
        const commonNft: number = getCommonNFTsCount(
          getUserDetail,
          getAdminDetail
        );
        return {
          address,
          count: commonNft,
        };
      });
      Promise.all(nfts).then((values) => {
        nftCount = values.reduce((intialValue, a) => intialValue + a.count, 0);
        if (nftCount >= 1) {
          setcommonNft(nftCount);
          setNFTCountInUserAccount(nftCount);
          setIsNFTFoundInUserAccount(UserState.WALLET_CHEETAH_TOKENS_FOUND);
        }
      });
    })();
  }, [adminAddres, updated]);

  useEffect(() => {
    const isAssetOptedInByUser = async (updated: boolean) => {
      try {
        const isAddressOpedIn = await IsAddressOpedIn(
          user_address,
          props.qn_asset_id
        );

        if (isAddressOpedIn) {
          setIsAssetOptedInByUser(UserState.ASSET_OPTED_IN_BY_USER);
        } else if (updated) {
          setIsAssetOptedInByUser(UserState.ASSET_OPTED_IN_BY_USER);
        }
      } catch (error) {
        console.log(error);
      }
    };
    isAssetOptedInByUser(updated);
  }, [user_address, updated]);

  useEffect(() => {
    const isAlreadyVoted = async () => {
      const count = await GetAddressTransactions(
        user_address,
        props.qn_asset_id,
        props.opt_yes_address,
        props.opt_no_address
      );
      if (count >= 1) {
        setIsAlreadyVoted(UserState.IS_ALREADY_VOTED);
        const quesetionid: number = props.qn_id
        try {
          const obj = new MainApiProtectedVersion('', quesetionid);
          const votes_list = await obj.requstQueVotes_id();
  
          if (votes_list) {
            let vote_address_yes = votes_list.data.data.voteAddresYes[0];
            let vote_address_no = votes_list.data.data.voteAddresno[0];
            setBalanceYesQn(vote_address_yes.total_weight)
            setBalanceNoQn(vote_address_no.total_weight)
            setPercentageYesQn(vote_address_yes.total_percent)
            setPercentageNoQn(vote_address_no.total_percent)
          }
          
        } catch (error) {
          console.log("votes_list", error);
        }
      }
    };
    isAlreadyVoted();
  }, [user_address, updated]);

  useEffect(() => {
    const quesetionid: number = props.qn_id
    const getData = async () => {
      try {
        const obj = new MainApiProtectedVersion('', quesetionid);
        const votes_list = await obj.requstQueVotes_id();

        if (votes_list) {
          let vote_address_yes = votes_list.data.data.voteAddresYes[0];
          let vote_address_no = votes_list.data.data.voteAddresno[0];
          setBalanceYesQn(vote_address_yes.total_weight)
          setBalanceNoQn(vote_address_no.total_weight)
          setPercentageYesQn(vote_address_yes.total_percent)
          setPercentageNoQn(vote_address_no.total_percent)
        }
      } catch (error) {
        console.log("votes_list", error);
      }

    };
    getData();
  }, [user_address]);

  return (
    <>
      {isWalletConnected === UserState.WALLET_CONNECTED ? (
        IS_ADMIN !== user_address ? (
          isNFTFoundInUserAccount === UserState.WALLET_CHEETAH_TOKENS_FOUND ? (
            algoCountInUserAccount === UserState.WALLET_ALGO_TOKENS_FOUND ? (
              isAssetOptedInByUser === UserState.ASSET_NOT_OPTED_IN_BY_USER ? (
                  
                  <OptInAsset
                    qn_asset_id={props.qn_asset_id}
                    user_address={user_address}
                    amount={commonNfts}
                    onUpdate={[updated, setUpdated]}
                  />

              ) : isAlreadyVoted === UserState.IS_ALREADY_VOTED ? (
                <>
                  <ul className="voting_info">
                    <li>
                      <span>Vote Weightage : {balanceYesQn}</span>
                      <span>Percentage : {percentageYesQn}%</span>
                    </li>
                    <li>
                      <span>Vote Weightage : {balanceNoQn}</span>
                      <span>Percentage : {percentageNoQn}%</span>
                    </li>
                  </ul>
                </>
              ) : (
                (
                  <CastVote
                    opt_no_address={props.opt_no_address}
                    opt_yes_address={props.opt_yes_address}
                    qn_asset_id={props.qn_asset_id}
                    amount={Number(NFTCountInUserAccount)}
                    onUpdate={[updated, setUpdated]}
                    qn_index={props.qn_index}
                    qn_id={props.qn_id}
                  />
                ))

            ) : !spinnerB ? (
              "Not enough Algo's to pay vote transaction."
            ) : (
              <div className="spin_loader">
                <TailSpin
                  color="#00BFFF"
                  height="90"
                  width="100"
                  ariaLabel="loading"
                />
              </div>
            )
          ) : !spinnerA ? (
            "User Don't have Donkey Nft"
          ) : (
            <div className="spin_loader">
              <TailSpin
                color="#00BFFF"
                height="90"
                width="100"
                ariaLabel="loading"
              />
            </div>
          )
        ) : (
          "Admin not Allow "
        )
      ) : (
        <MyAlgoWallet className="cstm_btn" />
      )}
    </>
  );
};

export default UserActionsWhileVoting;