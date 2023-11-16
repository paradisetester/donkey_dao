import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "./Form";
import QuestionData from './Crud'
import { EditVoteProps, VoteFormFields } from "./questionType";


const EditVote: React.FunctionComponent<EditVoteProps> = (props) => {
  const [vote, setVote] = useState<VoteFormFields>();
  const params = useParams();
  let navigate = useNavigate();
  const voteId = params.voteId || "";
  console.log(voteId);


  GetQue();


  return (
    <>
      <h2 className="sec_title wow fadeInDown">Edit Vote</h2>
      <Form vote={vote} voteId={voteId} />
    </>
  );

  function GetQue() {
    useEffect(() => {
      async function getQuestion(id: string) {
        const question = await QuestionData.get(id);
        console.log(question);
        if (question) {
          setVote({
            question: 'dsafd',
            status: 1,
            asset_name: '',
            asset_id: 0,
            unit_name: '',
            total_supply: '',
            vote_end_date: new Date(),
            asset_txn: "",
            vote_create_addres:"",
          });
          return;
        }
        navigate(`/admin/vote`);
      }

      getQuestion(voteId);
    }, [voteId, navigate]);
  }
};

export default EditVote;
