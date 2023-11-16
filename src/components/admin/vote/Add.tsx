import React from "react";
import Form from "./Form";
import QuestionData from './Crud';

export interface AddVoteProps {
  props?: any;
}



const AddVote: React.FunctionComponent<AddVoteProps> = (props) => {
  return (
    <>
      <h2 className="sec_title wow fadeInDown">Create Vote</h2>
      <Form />

    </>
  );
};

export default AddVote;
