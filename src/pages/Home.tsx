import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import Marquee from "react-fast-marquee";
import { Col, Container, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import ReactTooltip from "react-tooltip";
import { MainApiProtectedVersion } from "../utils/axios/requests";
// import downloadBlob from "../components/Getdownload";
// import fileDownload from 'js-file-download';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const data = [
    ["Task", "Percentage"],
    ["Marketplace commission", 5],
    ["Dao Community Treasure", 25],

    ["Team Salary", 20],
    ["Project Development", 50],
  ];

  const options = {
    title: "",
    legend: "none",
    backgroundColor: "#ffd92e",
  };

  async function handleClick() {
    const obj = new MainApiProtectedVersion();
    const response = await obj.requstDownloadWhitepaper();
    const filesdata: any = response.data;

    if (response.status === 200) {
      const { files } = filesdata.data || {};
      downloadFile(files);
    }
  }

  const downloadFile = (url: string) => {
    url = `https://${url.trim()}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `donkeydao.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        // link.parentNode.removeChild(link);
      });
  };

  return (
    <>
      {loading === false ? (
        <main>
          <section className="banner">
            <div className="banner_cont wow bounceInDown">
              <Countdown
                date={new Date("2022-06-04T20:00:00.000+00:00")}
                renderer={({ completed, formatted }) => {
                  const { days, hours, minutes, seconds } = formatted;
                  // Render a countdown
                  return (
                    <span id="timer">
                      <ul>
                        <li>
                          {days} <span>DAYS</span>
                        </li>
                        <li>
                          {hours} <span>HRS</span>
                        </li>
                        <li>
                          {minutes} <span>MINS</span>
                        </li>
                        <li>
                          {seconds} <span>SECS</span>
                        </li>
                      </ul>
                    </span>
                  );
                }}
              />
              <div className="banner_btns">
                <a
                  href="https://www.nftexplorer.app/sellers/donkey-dao"
                  className="cstm_btn"
                >
                  BUY
                </a>

                <button className="cstm_btn red" onClick={() => handleClick()}>
                  WHITEPAPER
                </button>

                {/* 
                <a
                  href={process.env.PUBLIC_URL + "/DonkeyDAOWhitepaper.pdf"}
                  download="DonkeyDAOWhitepaper.pdf"
                  className="cstm_btn red"
                >
                  WHITEPAPER
                </a> */}
              </div>
            </div>

            <Marquee className="wave" direction={"right"} loop={0}>
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
              <img src="img/waves.png" alt="Image" />
            </Marquee>
          </section>

          <section className="color_sec red color_first_sec">
            <Container>
              <Row className="img_text_outr">
                <Col lg={6} md={12} className="img_side wow slideInLeft">
                  <img src="img/donkey_two.png" />
                </Col>
                <Col lg={6} md={12} className="text_side wow slideInRight">
                  <div className="text_side_cont">
                    <h2>Welcome to the drove</h2>
                    <p>
                      Avataristic artwork meets WEB3 utility. Propose and vote
                      in the DAO, access the holders-only "drove" section, or
                      read on about the future plans here.{" "}
                      <a href="#" onClick={handleClick}>
                        Learn more.
                      </a>
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="color_sec purple future_plan_sec">
            <Container>
              <Row className="img_text_outr">
                <Col lg={6} md={12} className="text_side wow slideInLeft">
                  <div className="text_side_cont">
                    <h2>Future plans</h2>
                    <p>
                      The already fully-working DAO will not only be making its
                      own financial decision with capital provided by primary
                      sales and other streams of income, but also co-guide the
                      way the project will go together with the development
                      team. The team has so far laid out a long-term plan for
                      vertical integration within the Algorand ecosystem through
                      an established alpha system, with launchpad and doxxing
                      services to help fellow creators arriving soon. We also
                      plan to establish a thriving gamified ecosystem
                      facilitated through our own $CARROT ASA token, which will
                      also incorporate further collection drops including
                      various benefits, although these will only lower the
                      overall collection size.
                    </p>
                  </div>
                </Col>
                <Col lg={6} md={12} className="img_side wow slideInRight">
                <img src="img/future_plan_smoke.gif" />          
                      </Col>
              </Row>
            </Container>
          </section>

          <section className="color_sec yellow pie_chart_sec">
            <Container>
              <Row className="img_text_outr">
                <Col lg={6} md={12} className="img_side wow slideInLeft">
                  <div className="pie_chart">
                    <Chart
                      chartType="PieChart"
                      data={data}
                      options={options}
                      width={"100%"}
                      height={"400px"}
                    />
                  </div>
                </Col>
                <Col lg={6} md={12} className="text_side wow slideInRight">
                  <div className="text_side_cont">
                    <h2>Donkey Finance</h2>
                    <p>
                      Many hyper successful projects have shown that
                      transparency is the key to a flourishing ecosystem. At the
                      heart of DonkeyDAO stands the DAO, that’s why we’re
                      committing 25% of all the proceeds to it.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="color_sec green roadmap_sec">
            <Container fluid>
              <Row className="img_text_outr">
                <Col
                  xl={4}
                  lg={12}
                  md={12}
                  className="text_side wow slideInLeft"
                >
                  <div className="text_side_cont">
                    <h2>Longterm Vision</h2>
                  </div>
                </Col>
                <Col
                  xl={8}
                  lg={12}
                  md={12}
                  className="img_side wow slideInRight"
                >
                  <div className="roadmap_outr">
                    <div className="start_plan">2022</div>
                    <div className="plan_content">
                      <ul>
                        <li>
                          <img src="img/Website_Roadmap_Alpha.jpg" />
                          <a
                            className="cstm_btn"
                            data-tip="Project vision is established, WP V1.0 release, community building and creation of PFP NFTs and DAO backend infrastructure
                            "
                          >
                            ALPHA
                          </a>
                          <ReactTooltip />
                        </li>
                        <li>
                          <img src="img/Website_Roadmap_Beta.jpg" />
                          <a
                            className="cstm_btn"
                            data-tip="Pre-sale drop for DAO testing, website goes live with DAO and holders section. Launchpad and anti-rug certificate accompaign the DAO testing period"
                          >
                            BETA
                          </a>
                          <ReactTooltip />
                        </li>
                        <li>
                          <img src="img/Website_Roadmap_Drop.jpg" />
                          <a
                            className="cstm_btn"
                            data-tip="The main NFT drop marks the beginning of an era. United all together, we continue our journey of innovation"
                          >
                            DROP
                          </a>
                          <ReactTooltip />
                        </li>
                        <li>
                          <img src="img/Website_Roadmap_Journey.jpg" />
                          <a
                            className="cstm_btn"
                            data-tip="Development on gamified ecosystem with artworks from recognized artists and household $CARROT token begins. DAO co-guides this development and starts investing, innovating and improving itself. Long-term plans like creating a marketplace are discussed."
                          >
                            JOURNEY
                          </a>
                          <ReactTooltip />
                        </li>
                      </ul>
                    </div>
                    <div className="start_plan">2023</div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* <section className="gallery_sec">
            <h2 className="sec_title wow fadeInDown">Our NFT</h2>
            <div className="gallery_slider">
              <SlickMultipleitems />
            </div>
          </section> */}
        </main>
      ) : (
        // <Progress_baR bgcolor="orange" progress='30'  height={30} />
        <div id="preloader">
          <img src="img/land_loader.png" alt="Logo Image" />
        </div>
      )}
    </>
  );
};

export default HomePage;