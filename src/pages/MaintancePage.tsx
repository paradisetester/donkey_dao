/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import MyAlgoWallet from "../components/MyAlgoWallet/MyAlgoWallet";
import Typewriter from 'typewriter-effect';

interface IMaintenancePageProps {

}
const Maintenance: React.FunctionComponent<IMaintenancePageProps> = (props) => {


    return (
        <>
            <main>

                <section className="coin_sec">
                    <div className="container">

                        <article>

                            <h1>
                                <Typewriter
                                    options={{
                                        strings: ['MAINTENANCE', 'MAINTENANCE'],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h1>

                            <title>Asset 3</title>
                            <h1>We&rsquo;ll be back soon!</h1>
                            <div>
                                <p>Sorry for the inconvenience. We&rsquo;re performing some maintenance at the moment. If you need to you can always follow us on <a href="https://twitter.com/Donkey_DAO">Twitter</a> for updates, otherwise we&rsquo;ll be back up shortly!</p>
                                <p>&mdash; The [algoflip.net] Team</p>
                            </div>
                        </article>


                    </div>
                </section>
            </main>
        </>
    );
};

export default Maintenance;



