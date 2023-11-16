import React, { useState, useEffect } from "react";
import { Badge, Button, Dropdown, Table } from "react-bootstrap-v5";
import { VoteList } from "./questionType";
import QuestionData from "./Crud";
import { EditVoteProps, Question } from "./questionType";
import { indexerClient } from "../../../utils/connections";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import OptnedQuestion from "./OptnedQuestion";
import ActivatedQuestion from './ActivatedQuestion'
import AddressAssetSupplyCount from "../../AddressAssetSupplyCount";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

interface PercentageObject {
  yes: string,
  no: string
}

const ListVote: React.FunctionComponent<EditVoteProps> = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    async function listQue() {
      setIsLoading(true);
      const obj = new MainApiProtectedVersion();
      const response_Que_List = await obj.requstListFrontVote();
      if (response_Que_List) {
        setQuestions(response_Que_List.data.data);
      }
      setIsLoading(false);

    }


    listQue();
  }, [updated]);

  const getTotalVotePercentage = async (addresses: [string, string]) => {
    var perObject: PercentageObject = {
      yes: "0",
      no: "0"
    };
    return perObject;
  }

  const handleStatus = async (status: number, questionId: number) => {

    try {
      const obj = new MainApiProtectedVersion('', questionId);
      const responseData = {
        id: questionId,
        status: status,
      };
      await obj.requstUpdateVote(responseData);
      setUpdated(!updated);

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <h2 className="sec_title wow fadeInDown">Voting List</h2>
      <div className="table_outer">
        <Table responsive bordered className="voting_list_table">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th rowSpan={2}>Question</th>
              <th rowSpan={2}>AssetName</th>
              <th rowSpan={2}>AssetId</th>
              <th rowSpan={2}>UnitName</th>
              <th rowSpan={2}>Total Supply</th>
              <th colSpan={2}>Percentage (%)</th>
              <th colSpan={2}>Activated</th>
              <th colSpan={2}>Optned</th>
              <th rowSpan={2}>Status</th>
            </tr>
            <tr>
              <th>Yes</th>
              <th>No</th>
              <th>Yes</th>
              <th>No</th>
              <th>Yes</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            {questions.length ?
              questions.map((questionData: any, key: number) => {
                const question: Question = questionData.voteQuestion;
                console.log(question)
                const yesQuesData = questionData.voteAddresYes;
                const noQuesData = questionData.voteAddresno;
                const quesId = question.id;
                const status = !(yesQuesData.is_activate && noQuesData.is_activate && yesQuesData.is_optn && noQuesData.is_optn);
                return (
                  <tr key={key}>
                    {/* <td>{question.id}</td> */}
                    <td>{question.question}</td>
                    <td>{question.asset_name}</td>
                    <td>{question.asset_id}</td>
                    <td>{question.unit_name}</td>
                    <td>{question.total_supply}</td>

                    <td>{yesQuesData.total_percent}</td>

                    <td>{noQuesData.total_percent}</td>
                    {/* <td><AddressAssetSupplyCount total_suply={Number(question.total_supply)} address={yesQuesData.address} asset_id={question.asset_id} /></td> */}
                    {/* <td><AddressAssetSupplyCount total_suply={Number(question.total_supply)} address={noQuesData.address} asset_id={question.asset_id} /></td> */}
                    <td><ActivatedQuestion onUpdate={[updated, setUpdated]} type="yes" question_id={quesId} {...yesQuesData} /></td>
                    <td><ActivatedQuestion onUpdate={[updated, setUpdated]} type="no" question_id={quesId} {...noQuesData} /></td>
                    <td><OptnedQuestion onUpdate={[updated, setUpdated]} type="yes" assetId={question.asset_id} question_id={quesId} amount={0} {...yesQuesData} /></td>
                    <td><OptnedQuestion onUpdate={[updated, setUpdated]} type="no" assetId={question.asset_id} question_id={quesId} amount={0} {...noQuesData} /></td>
                    <td>{
                      status ? (
                        <Badge pill bg="warning">Draft</Badge>
                      ) : (
                        <>
                          {question.status === 2 ? (
                            <span className="toggle_icon off"  onClick={(event: any) => {
                              event.preventDefault();
                              handleStatus(3, quesId);
                            }}><BsToggleOff title="In-active" /></span>
                          ) : (
                            <span className="toggle_icon on" onClick={(event: any) => {
                              event.preventDefault();
                              handleStatus(2, quesId);
                            }}><BsToggleOn title="Active" /></span>
                          )}
                        </>


                      )
                    }</td>
                  </tr>
                );
              }) : (
                <tr>
                  <td className="text-center" colSpan={12}>
                    No Data Found
                  </td>
                </tr>
              )}

          </tbody>
        </Table>
      </div>
    </>
  )
};

export default ListVote;
