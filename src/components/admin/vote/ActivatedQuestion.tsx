import MyAlgoConnect, { Address } from '@randlabs/myalgo-connect'
import React, { useState } from 'react'
import { Badge } from 'react-bootstrap-v5'
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { RootState } from '../../../rootReducer';
import AdminPaymentTransfer from '../../../utils/algod_operations/address/AdminPaymentTransfer'
import { MainApiProtectedVersion } from '../../../utils/axios/requests';

import { ThreeDots } from 'react-loader-spinner'
interface ActivatedProps {
    address: Address,
    amount: number | null,
    created: Date,
    id: number,
    is_activate: boolean,
    is_optn: boolean,
    private_key: string,
    question_id: number,
    vote_percent: number,
    type?: string,
    onUpdate: any
}

const ActivatedQuestion: React.FunctionComponent<ActivatedProps> = (props) => {
    const { is_activate, address, question_id, onUpdate, type = "yes" } = props;
    const [updated, setUpdated] = onUpdate;
    const [isLoading, setIsLoading] = useState(false)

    let UserAddress = useSelector((state: RootState) => {
        return state.walletReducer["address"];
    });

    const handleActivated = async () => {
        var title = "";
        var message = "";
        if (UserAddress) {

            if (!is_activate) {
                setIsLoading(true);

                confirmAlert({
                    title: `Transfer Algo To ${type.toLocaleUpperCase()} Address`,
                    message: "Do you want to transfer 1 Algo?",
                    buttons: [
                        {
                            label: "Confirm",
                            onClick: async () => {
                                const response = await AdminPaymentTransfer(
                                    UserAddress, address,
                                )
                                if (response.txId) {
                                    const responseData = {
                                        question: question_id,
                                        amount: 1,
                                        is_activate: 1
                                    };
                                    const obj = new MainApiProtectedVersion('', question_id);
                                    var resApi: any = '';
                                    if (type === 'yes') {
                                        resApi = await obj.requstUpdateVoteYes(responseData);
                                    } else {
                                        resApi = await obj.requstUpdateVoteNo(responseData);
                                    }
                                    if (resApi) {
                                        setUpdated(!updated);
                                    }
                                    setIsLoading(false);

                                    console.log(resApi)
                                }
                            },
                            className: "alert-success",
                        },
                        {
                            label: "Cancel",
                            onClick: () => console.log("Not Transfer!"),
                            className: "alert-danger",
                        },
                    ],
                });

                return;


            } else {
                title = "Asset Activated!";
                message = "You are already activated";
            }
        } else {
            console.log('connec')
            title = "Wallet Not Connected!";
            message = "Please connect your wallet";
        }
        console.log(title)
        confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: "Ok",
                    onClick: () => console.log(''),
                    className: "alert-success",
                },
            ],
        });

    }

    return (
        <>{
            isLoading ? (
                <Badge pill bg="secondary">
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </Badge>
            ) : (
                <>
                    {
                        is_activate ? (
                            <Badge pill bg="success" onClick={handleActivated}>Active</Badge>
                        ) : (
                            <Badge pill bg="danger" onClick={handleActivated}>In-Active</Badge>
                        )
                    }
                </>
            )
        }
        </>
    )
}

export default ActivatedQuestion