import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import Collection from "../components/Collection";
import { RootState } from "../rootReducer";
import { adminAddres } from "../data";

import getAssets from "../utils/algod_operations/address/getAssets";
import getCommonNFTsCount, {
  getAccountDetail,
} from "../utils/algod_operations/getAccountDetail";
import { useParams, useNavigate } from "react-router-dom";
export interface IDrovePageProps {}

const DrovePage: React.FunctionComponent<IDrovePageProps> = (props) => {
  let navigate = useNavigate();
  let address = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  });
  // console.log(address);

  let balance = useSelector((state: RootState) => {
    return state.walletReducer["balance"];
  });

  const [loading, setLoading] = useState(true);
  const [commonNfts, setcommonNft] = useState(0);

  const AdminAddress = process.env.REACT_APP_ADMIN_NFT_ADDRESS;
  const convertedArray = process.env.REACT_APP_ADMIN_NFT_ADDRESS;

  useEffect(() => {
    (async function getData() {
      var nftCount: number = 0;
      const getUserDetail = await getAccountDetail(address);
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
        if (nftCount > 0) {
          setcommonNft(nftCount);
          setLoading(true);
        } else {
          setLoading(false);
          navigate(`/home`);
        }
      });
    })();
  }, [address, navigate]);

  return (
    <>
      {loading ? (
        <div className="page_wrapper">
          <section className="inner_banner drove_banner">
            <h2 className="project_title wow fadeInDown">Drove</h2>
          </section>

          <section className="our_team_sec">
            <Container>
              <h2 className="sec_title text-center sec_title_heading">Welcome to the drove!</h2>
              <h2 className="sec_title wow fadeInDown">Holder Perks</h2>
              <Row>
                <Col md={4} sm={12} className="wow slideInLeft">
                  <div className="team_member purple">
                    <div className="mem_img">
                      <img src="img/stake.png" alt="Image" />
                    </div>
                    <div className="member_cont">
                      <h3>Steak</h3>
                      <p>
                        Explore our gamified ecosystem powered by the $CARROT
                        token. Let your donkeys complete missions to earn
                        $CARROT needed for them to be mutated, or even fused
                        together into a mega donkey, which will bring additional
                        value and utility to the table. Coming soon.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} sm={12} className="wow slideInDown">
                  <div className="team_member red">
                    <div className="mem_img">
                      <img src="img/coin.png" alt="Image" />
                    </div>
                    <div className="member_cont">
                      <h3>Alpha</h3>
                      <p>
                        Our discord-based information sharing solution allows
                        you to read insightful crypto and NFT news articles by
                        our team and encourages you to exchange NFT strategies
                        with other donkey degens in the holders-exclusive chat
                        by offering unique rewards to participants.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} sm={12} className="wow slideInRight">
                  <div className="team_member yellow">
                    <div className="mem_img">
                      <img src="img/brain.png" alt="Image" />
                    </div>
                    <div className="member_cont">
                      <h3>DAO</h3>
                      <p>
                        The actual DAO allows holders to guide project decisions
                        and make collective purchases and investments with funds
                        from the initial sale, which are guarded by seven
                        community ambassadors. Show off your proposal in the
                        discord and if it gets traction, it'll be put to the
                        vote on our website, which uses a blockchain-based
                        solution for vote verification.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      ) : (
        confirmAlert({
          title: " You don't have a DonkeyNFT",
          message: " ",
          buttons: [
            // {
            //   label: 'Yes',
            //   onClick: () => alert('Click Yes')
            // },
            {
              label: "Yes",
              onClick: () => "ok",
            },
          ],
        })
      )}
    </>
  );
};

export default DrovePage;
