import React from "react";
import { Form, Button } from "react-bootstrap";

const Forgot_password: React.FunctionComponent = (props) => {
  return (
    <section className="form_wrapper">
      <div className="cstm_form">
        <h2 className="sec_title wow fadeInDown">Forgot Password</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your Email" />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="cstm_btn">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Forgot_password;
