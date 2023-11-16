import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap-v5";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import CreateWhitepaper from "./CreateWhitepaper";
import WhitepaperList from "./WhitepaperList";


export interface AddVoteProps {
  props?: any;
}





const Whitepaper: React.FunctionComponent<AddVoteProps> = (props) => {
  const [updated, setUpdated] = useState(false);
  

  return (
    <>
      <Container >
        <h2 className="sec_title wow fadeInDown">Whitepaper Dashboard</h2>
        <Row>
          <Col lg={5}>
            <CreateWhitepaper  useUpdate={[updated, setUpdated]}  />
          </Col>
          <Col lg={5}>
            <WhitepaperList  useUpdate={[updated, setUpdated]} />
          </Col>
        </Row>

      </Container>

    </>
  );
};

export default Whitepaper;
