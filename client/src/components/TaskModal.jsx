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

  componentDidUpdate(prevProps){
    if(this.props.taskId !== prevProps.taskId){
      this.setState({
        name: this.props.name,
        description: this.props.description
      });
    }
  }

  render() {
    var {modalOpen, name, description} = this.state;
    var {taskExists} = this.props;
    var iconText = taskExists ? 'Edit' : 'New Task';
    return (
      <Modal
        trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.handleOpen}>
            {taskExists ? <Icon name='edit' /> : <Icon name='add' /> } {iconText}
          </Button>}
        open={modalOpen}
        onClose={this.handleClose}>
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Input placeholder='Task name' value={name} onChange={this.handleChange.bind(this, 'name')}/>
              <TextArea placeholder='Description' value={description} onChange={this.handleChange.bind(this, 'description')}/>
            </Form>
          </Modal.Description>
          {taskExists ? <Button floated='right' primary size='small' onClick={this.updateTask}>Save</Button>
            : <Button floated='right' primary size='small' onClick={this.addTask}>Create</Button>}
        </Modal.Content>
      </Modal>
    );
  }

  addTask(e) {
    var {name, description} = this.state;
    var {onSubmit} = this.props;
    // TODO: validate name, description not empty
    console.log('[TaskModal] creating new task with poll id ' + this.props.pollId + ', name: ' + name + ', desc: ' + description);
    var newTask = {
      name: name,
      description: description,
      pollId: this.props.pollId
    }
    API.createTask(newTask).then(res => {
      onSubmit(res);
    });
    this.setState({
      modalOpen: false
    });
  }

  updateTask(e) {
    var {name, description} = this.state;
    var {onSubmit, taskId} = this.props;
    // TODO: validate name, description not empty
    console.log('[TaskModal] updating task ' + taskId + ', name: ' + name + ', desc: ' + description);
    var updatedTask = {
      name: name,
      description: description
    }
    API.updateTask(taskId, updatedTask).then(res => {
      onSubmit(res);
    });
    this.setState({
      modalOpen: false
    });
  }

  handleChange(fieldName, e) { this.setState({ [fieldName]: e.target.value }); }
  handleOpen() { this.setState({modalOpen: true}); }
  handleClose() { this.setState({modalOpen: false}); }
}

TaskModal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  pollId: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  taskExists: PropTypes.bool.isRequired,
  validateModalType: function(props, propName, componentName) {
        if ((props['taskExists'] === true) && (props['taskId'] === undefined)) {
            return new Error('Please provide existing taskId!');
        }
    },
};
