import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { useParams } from "react-router-dom";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { algodClient, indexerClient } from "../../utils/connections";
import { VoteList } from "../IDAOPageProps";
import { MainApiProtectedVersion } from "../../utils/axios/requests";
import algosdk from "algosdk";

export interface Question {
  id: number;
  question: string;
  status: boolean;
  asset_name: string;
  asset_id: number;
  unit_name: string;
  total_supply: string;
  updated_at?: string;
  created_at?: string;
}

interface IDAOPageProps {
  step_id?: number;
}

const DaoVotePage: React.FunctionComponent<IDAOPageProps> = (props) => {
  const [questions, setQuestions] = useState<Question>({
    id: 0,
    question: "",
    status: false,
    asset_name: "",
    asset_id: 0,
    unit_name: "",
    total_supply: "",
    updated_at: "",
    created_at: "",
  });
  const myAlgoWallet = new MyAlgoConnect();
  const { step_id = 0 } = props;
  const [stepId, setStep] = useState(step_id);
  const [isLoading, setIsLoading] = useState(false);
  const [yesCount, setYesCount] = useState(45);
  const [noCount, setNoCount] = useState(55);
  const [voting_address0, setVotingAddress1] = useState<string>("");
  const [voting_address1, setVotingAddress0] = useState<string>("");
  const ASSET_ID = 75494901;
  const [queList, setQueList] = useState([]);

  let params = useParams();
  const voteId = params.voteId || "";
  let UserAddress = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });
  console.log(UserAddress);

  useEffect(() => {
    if (UserAddress) {
      // getVoteData(voteId);
      // getData(voteId)
    }
  }, [voteId, UserAddress]);

  // const getData = async (id:number) => {
  //     try {
  //         var obj = new MainApiProtectedVersion();

  //         const response_Que_List = await obj.requstQueVote(primary_key);

  //         const da= await obj.requstDeleteVote(id)
  //         console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  //         console.log(response_Que_List.data.data)

  //         if (response_Que_List) {
  //             //   setVotingAddress0(response.data.data.voteAddresno[0].address)
  //             //   setVotingAddress1(response.data.data.voteAddresYes[0].address)
  //             //   setQuestions(response.data.data.voteQ)

  //             setQueList(response_Que_List.data.data)

  //         }

  //         // let voteData = await axios.get(`${obj.baseURL}/api/v1/votes/question/`)
  //         //   .then((response: any) => {
  //         //     return response.data.data;

  //         //   })
  //         //   .catch((e: Error) => {
  //         //     console.log(e);
  //         //   });
  //         //   console.log(voteData)

  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  const checkAlearyVoted = async (userAddress: string) => {
    let transactions = await indexerClient
      .lookupAssetTransactions(ASSET_ID)
      .addressRole("receiver")
      .address(userAddress)
      .do();

    return transactions?.transactions.find(
      (transaction0: VoteList) => transaction0.sender === UserAddress
    );
  };

  const checkAsset = async (address: string) => {
    const response = await indexerClient
      .searchForTransactions()
      .address(address)
      .assetID(ASSET_ID)
      .do();
    console.log(
      "Information for Transaction search: " +
        JSON.stringify(response, undefined, 2)
    );
  };
  async function connection(step: number) {
    setIsLoading(true);
    const accounts = await myAlgoWallet.connect();

    if (accounts.length) {
      var isUserVoted = await checkAlearyVoted(voting_address0);
      if (!isUserVoted) {
        isUserVoted = await checkAlearyVoted(voting_address1);
      }

      if (isUserVoted) {
        // Get total Vote percentages
        getTotalVotePercentage();
        // alert("You are already Voted!")
        setStep(4);
      } else {
        setStep(step);
      }
    } else {
      alert("go to hell and give voting point");
    }
    setIsLoading(false);
  }
  const getTotalVotePercentage = async () => {
    [voting_address0, voting_address1].map(
      async (address: string, key: number) => {
        const accountInfo = await algodClient.accountInformation(address).do();
        const assets = accountInfo?.assets || [];
        var totalPercentage = 0;
        assets.forEach((asset: any) => {
          totalPercentage += asset.amount;
        }, totalPercentage);
        if (key === 0) {
          setNoCount(totalPercentage);
        } else {
          setYesCount(totalPercentage);
        }
      }
    );
  };
  async function waitForConfirmation(txId: string) {
    let lastround = (await algodClient.status().do())["last-round"];
    while (true) {
      const pendingInfo = await algodClient
        .pendingTransactionInformation(txId)
        .do();
      if (
        pendingInfo["confirmed-round"] !== null &&
        pendingInfo["confirmed-round"] > 0
      ) {
        console.log(
          "Voting confirmed in round " + pendingInfo["confirmed-round"]
        );
        break;
      }
      lastround++;
      await algodClient.statusAfterBlock(lastround).do();
    }
    getResults();
  }

  const balanceFormatter = (amount: number, assetId: any) => {
    const asset_info = algodClient.getAssetByID(assetId);
    console.log(
      "balanceFormatter asset_info: " + JSON.stringify(asset_info, undefined, 2)
    );

    // const decimals = asset_info["params"]["decimals"];
    // const unit = asset_info["params"]["unit-name"];
    // const formatted_amount = amount / 10 ** decimals;
    // return `${formatted_amount} ${unit}`;
  };
  const checkResult = async (address: string, action: boolean = true) => {
    const accountInfo = await algodClient.accountInformation(address).do();
    const assets = await accountInfo.assets;
    console.log(
      "balanceFormatter accountInfo: " +
        JSON.stringify(accountInfo, undefined, 2)
    );

    let totalCount = 0;
    console.log(
      "balanceFormatter asset_info: " + JSON.stringify(assets, undefined, 2)
    );

    for (const asset in assets) {
      console.log(asset);
      //   if (asset['asset-id'] === ASSET_ID) {
      //     const amount = asset["amount"];
      //     console.log(
      //       `Account ${address} has ${balanceFormatter(amount, ASSET_ID)}`
      //     );
      //     return;
      //   }
    }
    if (action) {
      setYesCount(totalCount);
    } else {
      setNoCount(totalCount + 5);
    }
  };

  const getResults = async () => {
    checkResult(voting_address0);
    checkResult(voting_address1, false);
    setStep(2);
  };

  const voting = votes(
    UserAddress,
    voting_address0,
    ASSET_ID,
    myAlgoWallet,
    waitForConfirmation,
    voting_address1
  );

  function votes(
    address: never,
    voting_address0: string,
    ASSET_ID: number,
    myAlgoWallet: MyAlgoConnect,
    waitForConfirmation: (txId: string) => Promise<void>,
    voting_address1: string
  ) {
    return async (action: boolean) => {
      // console.log(address);
      console.log(action);

      const amount = "";
      const params = await algodClient.getTransactionParams().do();
      const encoder = new TextEncoder();
      if (action === false) {
        try {
          let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            address,
            voting_address0,
            undefined,
            undefined,
            Number(amount),
            encoder.encode("Voting with false and Zero"),
            ASSET_ID,
            params
          );
          const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
          const response = await algodClient
            .sendRawTransaction(signedTxn.blob)
            .do();
          console.log(response);
          if (response) {
            console.log(
              `You just voted for candidate Zero,Your voting ID: ${response.txId}`
            );
            waitForConfirmation(response.txId);
          } else {
            console.log("error voting for candidate Zero, try again later");
          }
        } catch (error) {
          console.log(error);
          console.log("error voting for candidate Zero, Try again later");
        }
      } else if (action === true) {
        try {
          let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            address,
            voting_address1,
            undefined,
            undefined,
            Number(amount),
            encoder.encode("Voting with True"),
            ASSET_ID,
            params
          );
          const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
          const response = await algodClient
            .sendRawTransaction(signedTxn.blob)
            .do();
          console.log(response);
          if (response) {
            console.log(
              `You just voted for candidate One,Your voting ID: ${response.txId}`
            );
            waitForConfirmation(response.txId);
          } else {
            console.log("error voting for candidate one, try again later");
          }
        } catch (error) {
          console.log(error);

          console.log("Error voting for candidate One, Try again later");
        }
      }
    };
  }
  return (
    <section className="voting_sec mx-3">
      <div className="container">
        <div className="voting_form">
          {isLoading ? (
            <div className="step_form_cont">Loading...</div>
          ) : (
            <div className="step_form_cont">
              <h1>Ongoing Votes</h1>
              <h3>{questions.question}</h3>

              {stepId === 0 && (
                <div className="cstm_step step_1">
                  <div className="cont_step_form">
                    <button
                      className="cstm_btn pe-auto"
                      onClick={() => connection(1)}
                    >
                      CONNECT
                    </button>
                  </div>
                </div>
              )}
              {stepId === 1 && (
                <div className="cstm_step step_2">
                  <div className="title_radio_btns">2 VOTES counter</div>
                  <div className="radio_btn_outr">
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="vote_yes"
                        name="vote"
                        onChange={() => voting(true)}
                      />
                      <label htmlFor="vote_yes">Yes</label>
                    </div>
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="vote_no"
                        name="vote"
                        onChange={() => voting(false)}
                      />
                      <label htmlFor="vote_no">No</label>
                    </div>
                  </div>
                </div>
              )}

              {stepId === 2 && (
                <div className="cstm_step step_3">
                  <div className="title_radio_btns">SUCCES</div>
                  <div className="radio_btn_outr">
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="vote_yes_percent"
                        name="vote_percent"
                        // onChange={() => setStep(3)}
                      />
                      <label htmlFor="vote_yes_percent">
                        <span>Yes {yesCount}%</span>
                      </label>
                    </div>
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="vote_no_percent"
                        name="vote_percent"
                        // onChange={() => setStep(3)}
                      />
                      <label htmlFor="vote_no_percent">
                        No <span>{noCount}%</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {stepId === 4 && (
                <div className="cstm_step step_6">
                  <div className="title_radio_btns">
                    You ALREADY <span>VOTED</span>
                  </div>
                  <div className="radio_btn_outr">
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="voted_yes"
                        name="voted_percent"
                        onChange={() => {}}
                      />
                      <label htmlFor="voted_yes">
                        <span>Yes {yesCount}%</span>
                      </label>
                    </div>
                    <div className="radio_btn">
                      <input
                        type="radio"
                        id="voted_no"
                        name="voted_percent"
                        onChange={() => {}}
                      />
                      <label htmlFor="voted_no">
                        <span>No {noCount}%</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DaoVotePage;
