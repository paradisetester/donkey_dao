import React, { Component } from "react";
import axios from "axios";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import { Button, Form } from "react-bootstrap-v5";

class App extends Component {
  state = {
    title: "",
    content: "",
    image: null,
  };
  
  constructor(props) {
    super(props);
    this.state = { update: true };
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

  //   "label": null,
  //   "descr": null,
  //   "files": null,
  //   "status"

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append("files", this.state.image, this.state.image.name);
    form_data.append("label", this.state.title);
    form_data.append("descr", this.state.content);

    const obj = new MainApiProtectedVersion();
    const AllWhitepaper =  obj.requstAllWhitepaper();
    console.log(AllWhitepaper)
    if (AllWhitepaper) {
    }
    const WhitepaperId =  1

    console.log(form_data)

    if (WhitepaperId > 0) {
      console.log("no")
      const obj = new MainApiProtectedVersion('', WhitepaperId);
      const response = obj.requstUpdateWhitepaper(form_data);
      console
        .log(response)
        .then((response) => {
          this.setState({ update: !this.state.udpate });
          console.log("ok created")
        })
        .catch((err) => console.log(err));
        
      
    }else{
      console.log("ok")
       const obj = new MainApiProtectedVersion();
      const response = obj.requstCreateWhitepaper(form_data);
      console
        .log(response)
        .then((response) => {
          this.setState({ update: !this.state.udpate });
          console.log("ok created")
        })
        .catch((err) => console.log(err));
        
    }




  };

  render() {
    return (
      <div className="App">
        <Form className=" admin_form" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Whitepaper name</Form.Label>
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
                { "Update" }
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

export default App;
