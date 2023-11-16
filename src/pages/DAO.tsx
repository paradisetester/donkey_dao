/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { RootState } from "../rootReducer";
import { useSelector } from "react-redux";
import { MainApiProtectedVersion } from "../utils/axios/requests";
import "react-confirm-alert/src/react-confirm-alert.css";

// Fresh Entries
import UserActionsWhileVoting from "../utils/algod_operations/dao/UserActionsWhileVoting";
import { getAccountDetail } from "../utils/algod_operations/getAccountDetail";

interface IDAOPageProps {
  step_id?: number;
}

export interface Question {
  id: number;
  question: string;
  status: boolean;
  asset_name: string;
  asset_id: number;
  unit_name: string;
  total_supply: string;
  updated_at: string;
  created_at: string;
  asset_txn: string;
}
const DAOPage: React.FunctionComponent<IDAOPageProps> = () => {
  /** page initialize
   *  a) Get asset count in user accounts
   *  b) Get votes qustions list
   *  c) Get user state
   */
  let address = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });

  let user_address = useSelector((state: RootState) => {
    const address = state.walletReducer["address"];
    return address;
  });


  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isAdminBalance, setIsAdminBalance] = useState();
  useEffect(() => {
    async function getData() {
      const AdminAddress = process.env.REACT_APP_ADMIN_NFT_ADDRESS;
      console.log(AdminAddress)
      const getAdminDetail = await getAccountDetail(AdminAddress);
      // console.log(getAdminDetail)
      const amount: any = getAdminDetail.amount / 1000000;
      setIsAdminBalance(amount.toFixed(3));
    }

    getData();
  }, [address]);

  const [votesList, setVotesList] = useState([]);
  const [ProposalDoc, setProposalDoc] = useState([]);

  const getDownload = async () => {
    try {
      const obj = new MainApiProtectedVersion();
      const response = await obj.requstDownloadProposal();
      console.log(response.data);
      const filesdata = response.data

      if (response.status === 200) {
        
      const { files } = filesdata.data || {};
      downloadFile(files);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  
  const downloadFile = (url: string) => {
    url = `https://${url.trim()}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `donkeydao.pdf`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        // link.parentNode.removeChild(link);
      });
  }


  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const obj = new MainApiProtectedVersion();
        const votes_list = await obj.requstQueVote();
        if (votes_list) {
          setVotesList(votes_list.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("votes_list", error);
        setIsLoading(false);
      }
    };
    getData();
  }, [user_address]);

  return (
    <div className="page_wrapper">
      <section className="dao_banner">
        <div className="banner__outr">
          <img className="dao_banner_img" src="img/dao_banner.png" />
          <img className="dao_banner_hover" src="img/dao_banner_hover.png" />
        </div>
        <h2 className="project_title wow fadeInDown">DAO</h2>
      </section>
      <section className="single_project">
        <div className="container">
          <div className="dao_page_desc wow slideInDown text-center">
            <h2 className="sec_title text-center">
              DAO Balance: {isAdminBalance}
            </h2>
            <p>
              The community is certainly the most important part of every NFT
              project. Realizing that, we decided to make our project revolve
              around a Decentralized Autonomous Organization (DAO) for community
              members. Every NFT from our collection will be able to cast their
              vote on propositions on how to go forward with the project.
              Holders can come forward with proposals in the holder’s channel of
              our discord. If a threshold of engagement is met, the proposal is
              put to the vote on our website. In case of a majority approval,
              the proposal is accepted, and the proposed actions will be
              executed, possibly with a transaction from the multi-signature
              wallet. Every DonkeyDAO NFT will be able to cast a vote on ongoing
              propositions.
            </p>

            <button className="cstm_btn" onClick={() => getDownload()}>
              Download Proposals <i className="far fa-file-pdf"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="voting_sec">
        <div className="container">
          <h2 className="sec_title wow fadeInDown">ONGOING VOTES</h2>

          <div>
            {isLoading ? (
              <div className="voting_form mt-4">
                <div className="step_form_cont">
                  <h1 className="text-center">
                    {/* <RotatingLines width="" /> */}
                  </h1>
                </div>
              </div>
            ) : (
              <>
                {votesList.length ? (
                  votesList.map((data: any, key: number) => {
                    const question = data.voteQuestion;
                    const opt_no_address = data.voteAddresno.address;
                    const opt_yes_address = data.voteAddresYes.address;
                    const question_id = question.id;
                    const qn_asset_id = question.asset_id;
                    const total_percent_yes = data.voteAddresYes.total_percent;
                    const total_percent_no = data.voteAddresno.total_percent;

                    const total_weight_yes = data.voteAddresYes.total_weight;
                    const total_weight_no = data.voteAddresno.total_weight;

                    return (
                      <div className="voting_form mt-4" key={question_id}>
                        <div className="step_form_cont">
                          <h1>{question.question}</h1>
                          <div className="cstm_step step_2">
                            <div className="radio_btn_outr">
                              <div className="radio_btn">
                                <label htmlFor="voted_yes">
                                  <span>
                                    Yes {total_percent_yes}% ({total_weight_yes}
                                    )
                                  </span>
                                </label>
                              </div>
                              <div className="radio_btn">
                                <label htmlFor="voted_no">
                                  <span>
                                    No {total_percent_no}% ({total_weight_no})
                                  </span>
                                </label>
                              </div>
                            </div>
                            <UserActionsWhileVoting
                              opt_yes_address={opt_yes_address}
                              opt_no_address={opt_no_address}
                              qn_asset_id={qn_asset_id}
                              useLoader={[isLoading, setIsLoading]}
                              qn_id={question_id}
                              qn_index={key}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="voting_form mt-4">
                    <div className="step_form_cont">
                      <h1 className="text-center">No Data Found</h1>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DAOPage;
