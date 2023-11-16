import React, { Component } from "react";
import axios from "axios";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import { Button, Form } from "react-bootstrap-v5";

class CreatePurposel extends Component {
  state = {
    title: "",
    content: "",
    image: null,
    proposal: {}
  };

  constructor(props) {
    super(props);
    this.getProposal();
  }

  getProposal = async () => {
    const obj = new MainApiProtectedVersion();
    const AllProposal = await obj.requstAllProposal();    
    if (AllProposal) {
      this.setState({
        proposal: AllProposal.data.data.shift(),
      }); 
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };
  handleSubmit = async (e) => {
    const [update, setUpdate] = this.props.useUpdate;
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("files", this.state.image, this.state.image.name);
    form_data.append("label", this.state.title);
    form_data.append("descr", this.state.content);
    const questionId = this.state.proposal.id || 0;

    if (questionId > 0) {
      const obj = new MainApiProtectedVersion("", questionId);
      const response = await obj.requstUpdateProposal(form_data);
      if(response.status === 201) {
        setUpdate(!update);
      }
    } else {
      const obj = new MainApiProtectedVersion();
      const response = await obj.requstCreateProposal(form_data);
      if(response.status === 200) {
        setUpdate(!update);
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Form className=" admin_form" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Proposal </Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="name"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Description"
              id="content"
              value={this.state.content}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Document</Form.Label>
            <Form.Control
              type="file"
              id="image"
              accept=".pdf"
              onChange={this.handleImageChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="cstm_btn">
            {"Update"}
          </Button>
        </Form>
        {/*         
        <form  className=' admin_form' onSubmit={this.handleSubmit}>      
            <input className='mb-3' type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
       
            <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>
         
            <input type="file"
                   id="image"
                   accept=".pdf"  onChange={this.handleImageChange} required/>

          <input type="submit"/>
        </form> */}
      </div>
    );
  }
}

export default CreatePurposel;
