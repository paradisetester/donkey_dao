import React from "react";
import RouteComponentProps from 'react-router-dom';

export interface VoteProps {
  props?: any;
}


const Vote: React.FunctionComponent<VoteProps> = (props) => {

  console.log(props)

  return (
    <>
      <h2 className="sec_title wow fadeInDown">Vote List</h2>
    </>
  );
};

export default Vote;
