/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import MyAlgoWallet from "./MyAlgoWallet/MyAlgoWallet";
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { Container, Navbar, Nav } from "react-bootstrap";

export interface ILayoutComponentProps {}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (
  props
) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const user_address = useSelector((state: RootState) => {
    return state.walletReducer["address"];
  }) as string;

  const { pathname } = useLocation();

  const handleMenuClick = () => {
    setExpanded(false)
    window.scrollTo(0, 0);
  }

  return (
    <Fragment>
      <header>
        <Container>
          <Navbar expand="lg" expanded={expanded}>
            <Navbar.Brand href="/home">
              <img src="img/land_loader.png" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
             
                <Link to="/dao" onClick={handleMenuClick}>
                  <a className={`nav-link${pathname === "/dao" ? " active" : ""}`}>DAO</a>
                </Link>
                <Link to="/drove" onClick={handleMenuClick}>
                  <a className={`nav-link${pathname === "/drove" ? " active" : ""}`}>DROVE</a>
                </Link>
                <Nav.Link className="header_btn">
                  {user_address.length <= 0 ? (
                    <MyAlgoWallet className="nav-link" />
                    
                  ) : (
                    <button type="button" className="nav-link" disabled>
                      {" "}
                      Wallet Connected{" "}
                    </button>
                  )}
                </Nav.Link>
              </Nav>
              <ul className="header_social">
                <li>
                  <a href="https://discord.com/invite/bfKB2J8K6w">
                    <i className="fab fa-discord"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/Donkey_DAO" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>

      <Outlet />
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="footer_logo">
                <img src="img/land_loader.png" alt="Logo" />
              </div>
              <p className="footer_desc">PNGs for real Gs.</p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h3>Quick Links</h3>
              <ul className="footer_menu">
                <li>
                  <Link to="/home">HOME</Link>
                </li>
                <li>
                  <Link to="/drove">DROVE</Link>
                </li>
                <li>
                  <Link to="/dao">DAO</Link>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>
              Copyright © 2022 Donkey project on Algorand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default LayoutComponent;