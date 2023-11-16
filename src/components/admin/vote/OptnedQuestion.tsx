import { Address } from '@randlabs/myalgo-connect'
import React, { useState } from 'react'
import { Badge } from 'react-bootstrap-v5'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'
import { RootState } from '../../../rootReducer'
import AssetTransferByManimonic from '../../../utils/algod_operations/address/AssetTransferByManimonic'
import { MainApiProtectedVersion } from '../../../utils/axios/requests'

interface OptnedProps {
    address: Address,
    amount: number | 0,
    created: Date,
    id: number,
    is_activate: boolean,
    is_optn: boolean,
    mnemonic: string,
    question_id: number
    vote_percent: number,
    type?: string
    sender: string, recipient: string, assetId: number,
    onUpdate: any
}

const OptnedQuestion: React.FunctionComponent<OptnedProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { is_optn, address, mnemonic, assetId, amount, question_id, is_activate, onUpdate, type = "yes" } = props;
    const [updated, setUpdated] = onUpdate;

    let UserAddress = useSelector((state: RootState) => {
        return state.walletReducer["address"];
    });

    const handleOptned = () => {
        var title = "";
        var message = "";
        if (UserAddress) {
            if (is_activate) {
                if (!is_optn) {
                    setIsLoading(true);
                    confirmAlert({
                        title: `Optn asset for ${type.toLocaleUpperCase()} Address`,
                        message: "Do you want to optn asset?",
                        buttons: [
                            {
                                label: "Confirm",
                                onClick: async () => {
                                    const response = await AssetTransferByManimonic(mnemonic, assetId);
                                    if (response.txId) {
                                        const responseData = {
                                            question: question_id,
                                            amount: 1,
                                            is_optn: 1
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
                                        console.log(resApi)
                                    }
                                    setIsLoading(false);
                                },
                                className: "alert-success",
                            },
                            {
                                label: "Cancel",
                                onClick: () => {
                                    setIsLoading(true);
                                },
                                className: "alert-danger",
                            },
                        ],
                    });
                    return;
                } else {
                    title = 'Already Optned!';
                    message = "This asset is already Optned";
                }
            } else {
                title = "Asset Not Activated!";
                message = "Please activate this asset";
            }
        } else {
            title = "Wallet Not Connected!";
            message = "Please connect your wallet";
        }
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
        <>
            {
                isLoading ? (
                    <Badge pill bg="secondary">
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </Badge>
                ) : (
                    <>
                        {
                            is_optn ? (
                                <Badge pill bg="success" onClick={handleOptned}>Optned</Badge>
                            ) : (
                                <Badge pill bg="danger" onClick={handleOptned}>Not-Optned</Badge>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default OptnedQuestion