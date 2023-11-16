
import React, { useEffect, useState } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap-v5";
// import {  } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import CreateWhitepaper, {  } from "./CreateWhitepaper";
import { GrUpdate } from "react-icons/gr";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";


export interface AddVoteProps {
    useUpdate: any;
}

const WhitepaperList: React.FunctionComponent<AddVoteProps> = ({ useUpdate, }) => {

    const [updated, setUpdated] = useUpdate;
    const [Whitepaper, setWhitepaper] = useState([]);
    console.log(updated)

    useEffect(() => {

        async function listWhitepaper() {
          //   setFormData(true);
          const obj = new MainApiProtectedVersion();
          const AllWhitepaper = await obj.requstAllWhitepaper();
    
          if (AllWhitepaper) {
            setWhitepaper(AllWhitepaper.data.data);
          }
    
        }
        listWhitepaper();
      }, [updated])

    const handleStatusDelete = async (WhitepaperId: number) => {
        try {
            const obj = new MainApiProtectedVersion('', WhitepaperId);
            await obj.requstDeleteWhitepaper();
            setUpdated(!updated);

        } catch (error) {
            console.log(error)
        }

    }
    

    return (
        <>

            {Whitepaper.length ?
                Whitepaper.map((questionData: any, key: number) => {
                    const propos: any = questionData;

                    return (
                        <div className="Whitepaper_list" key={key}>
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

export default WhitepaperList;


