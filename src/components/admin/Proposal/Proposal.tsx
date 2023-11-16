import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap-v5";
import CreateProposal from "./CreateProposal";
import ProposalList from "./ProposalList";


export interface AddVoteProps {
  props?: any;
}





const Proposal: React.FunctionComponent<AddVoteProps> = (props) => {
  const [updated, setUpdated] = useState(false);

  return (
    <>
      <Container >
        <h2 className="sec_title wow fadeInDown">Proposal Dashboard</h2>
        <Row>
          <Col lg={5}>
            <CreateProposal useUpdate={[updated, setUpdated]} />
          </Col>
          <Col lg={5}>
            <ProposalList useUpdate={[updated, setUpdated]} />
          </Col>
        </Row>

      </Container>

    </>
  );
};

export default Proposal;
