
import React, { useEffect, useState } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap-v5";
// import {  } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import CreateProposal, {  } from "./CreateProposal";
import { GrUpdate } from "react-icons/gr";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";


export interface AddVoteProps {
    useUpdate: any;
}

const ProposalList: React.FunctionComponent<AddVoteProps> = ({ useUpdate }) => {

    const [updated, setUpdated] = useUpdate;
    const [proposal, setProposal] = useState([]);

    useEffect(() => {

        async function listProposal() {
          //   setFormData(true);
          const obj = new MainApiProtectedVersion();
          const AllProposal = await obj.requstAllProposal();    
          if (AllProposal) {
            setProposal(AllProposal.data.data);
          }
    
        }
        listProposal();
      }, [updated])

    const handleStatusDelete = async (proposalId: number) => {
        try {
            const obj = new MainApiProtectedVersion('', proposalId);
            await obj.requstDeleteProposal();
            
            setUpdated(!updated);

        } catch (error) {
            console.log(error)
        }

    }
    

    return (
        <>

            {proposal.length ?
                proposal.map((questionData: any, key: number) => {
                    const propos: any = questionData;

                    return (
                        <div className="proposal_list" key={key}>
                            <ListGroup as="ol">
                                <ListGroup.Item
                                    as="li"
                                >
                                    <div>
                                        <div className="fw-bold">
                                            {propos.label}                                      
                                        </div>

                                        {propos.descr}

                                    </div>

                                    
                                    <div className="prop_list_icons">
                                        <span className="del_icon" onClick={(event: any) => {
                                            event.preventDefault();
                                            handleStatusDelete(propos.id);
                                        }}><FaRegTrashAlt />
                                        </span>
                                    
                                 
                                        {/* {propos.status ===0  ? (
                                            <span className="toggle_icon off" onClick={(event: any) => {
                                                event.preventDefault();
                                                handleStatuUpdate(propos.status, propos.id);
                                            }}><BsToggleOff title="In-active" /></span>
                                        ) : (
                                            <span className="toggle_icon on" onClick={(event: any) => {
                                                event.preventDefault();
                                                handleStatuUpdate(propos.status, propos.id);
                                            }}><BsToggleOn title="Active" />
                                            </span>
                                        )}
                                     */}
                                    </div>

                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    );
                }) : (
                    <ul>
                        <li className="text-center">
                            No Data Found
                        </li>
                    </ul>
                )}

        </>
    );
};

export default ProposalList;


