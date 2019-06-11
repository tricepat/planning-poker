import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, TextArea, Input, Button, Icon } from 'semantic-ui-react';
import API from '../api/index';

export default class TaskModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      name: this.props.name,
      description: this.props.description
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
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
    var {modalOpen} = this.state;
    var {isNew} = this.props;
    var iconText = isNew ? 'New Task' : 'Edit';
    return (
      <Modal
        trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.handleOpen}>
            {isNew ? <Icon name='add' /> : <Icon name='edit' /> } {iconText}
          </Button>}
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Input placeholder='Task name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
              <TextArea placeholder='Description' value={this.state.description} onChange={this.handleChange.bind(this, 'description')}/>
            </Form>
          </Modal.Description>
          {isNew ? <Button floated='right' primary size='small' onClick={this.addTask}>Create</Button>
            : <Button floated='right' primary size='small' onClick={this.updateTask}>Save</Button>}
        </Modal.Content>
      </Modal>
    );
  }

  handleChange(fieldName, e) {
    this.setState({
      [fieldName]: e.target.value
    });
  }

  handleOpen() {
    this.setState({
      modalOpen: true
    })
  }

  handleClose() {
    this.setState({
      modalOpen: false
    })
  }

  addTask(e) {
    var {name, description} = this.state;
    var {onSubmit} = this.props;
    // validate name, description not empty
    console.log('[TaskModal] creating new task with poll id ' + this.props.pollId + ', name: ' + name + ', desc: ' + description);
    var newTask = {
      name: name,
      description: description,
      pollId: this.props.pollId
    }
    API.createTask(newTask).then(res => {
      console.log('[TaskModal] create task response: ' + res);
      onSubmit(res);
    });
    this.setState({
      modalOpen: false
    });
  }

  // TODO
  updateTask(e) {
  }

}

TaskModal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  pollId: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func
};
