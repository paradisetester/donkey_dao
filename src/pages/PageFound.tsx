

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import MyAlgoWallet from "../components/MyAlgoWallet/MyAlgoWallet";

interface IPageFoundPageProps {

}
const PageFound: React.FunctionComponent<IPageFoundPageProps> = (props) => {



    return (
        <>



            <section className="coin_sec">
                <div className="container">
                    <h1>404 Error</h1>
                    <div id="wrapper">
                        <img src="https://i.imgur.com/qIufhof.png" />
                        <div id="info">
                            <h3>This page could not be found</h3>
                        </div>
                    </div >
                </div>
            </section>

        </>
    );
};

export default PageFound;



