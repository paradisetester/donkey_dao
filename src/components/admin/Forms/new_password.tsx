import React from "react";
import { Form, Button } from "react-bootstrap";

const New_password: React.FunctionComponent = (props) => {
  return (
    <section className="form_wrapper">
      <div className="cstm_form">
        <h2 className="sec_title wow fadeInDown">Reset Password</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm New Password" />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="cstm_btn">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default New_password;
