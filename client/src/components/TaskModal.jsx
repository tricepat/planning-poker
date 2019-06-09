import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Modal, Form, TextArea, Input } from 'semantic-ui-react'

export default class TaskModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description
    };

    this.handleChange = this.handleChange.bind(this);

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({
        name:nextProps.name,
        description: nextProps.description
      });
    }
  }

  render() {
    return (
      <div>
        <Modal.Content >
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <Form>
              <Input placeholder='Task name' value={this.state.name} onChange={this.handleChange}/>
              <TextArea placeholder='Description' value={this.state.description} onChange={this.handleChange}/>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </div>
    );
  }

  handleChange(fieldName, e) {
    this.setState({
      [fieldName]: e.target.value
    });
  }

}

TaskModal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
