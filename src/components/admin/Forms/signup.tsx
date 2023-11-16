import React from "react";
import { Form, Button } from "react-bootstrap";

const Signup: React.FunctionComponent = (props) => {
  return (
    <section className="form_wrapper">
      <div className="cstm_form">
        <h2 className="sec_title wow fadeInDown">Sign Up</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
            />
          </Form.Group>
          <div className="text-center">
            <span className="already_mem">
              Already a Member? <a href="#">Login In</a>
            </span>
            <Button variant="primary" type="submit" className="cstm_btn">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Signup;
