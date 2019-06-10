import React, { Component } from 'react';
import Results from './Results'
import Voting from './Voting'
import TaskModal from './TaskModal'
import API from '../api/index'
import {Button, Form, Grid, Header, Table, Container, Checkbox, Icon, Item} from 'semantic-ui-react';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: null,
      userId: null,
      selectedTask: null
    };

    this.updateTasks = this.updateTasks.bind(this);
    this.onSelectTask = this.onSelectTask.bind(this);
  }

  componentDidMount() {
    var {location} = this.props;
    var {id} = this.props.match.params;
    if (!location.state || !location.state.userId) { // redirect to 'login' if user is unidentified
      return this.props.history.push(`/`);
    }
    console.log('user ID: ' + location.state.userId + ', poll id: ' + id);
    // get poll, set tasks
    API.getPollById(id).then(res => {
      console.log('[Poll] fetched poll ' + res + '. setting name: ' + res.name + ', tasks: ' + res.tasks);
      this.setState({
        userId: location.state.userId,
        name: res.name,
        tasks: res.tasks,
      //  selectedTask: res.tasks && res.tasks.length ? res.tasks[0] : null
      });
    });

  }

  render() {
    var {username, selectedTask} = this.state;
    var {id} = this.props.match.params;
    return (
      <Container>
        <Header as='h2'>Welcome, {username}</Header>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Table celled compact definition selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan='6'>Task</Table.HeaderCell>
                    <Table.HeaderCell>Voting Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.renderTasks()}
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan='8'>
                      <TaskModal name='name' description='describe' isNew={true} pollId={id} onSubmit={this.updateTasks}/>
                      <Button size='small'>Open All</Button>
                      <Button disabled size='small'>
                        Close All
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
            <Grid.Column>
              {selectedTask ? this.renderSelectedTask()
                : null
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  renderTasks() {
    var {tasks} = this.state;
    console.log('[renderTasks] tasks: ' + tasks);
    return tasks.map((task, idx) => {
      console.log('task: ' + task._id + ', index: ' + idx);
      return (
        <Table.Row key={task._id} id={task._id} onClick={this.onSelectTask}>
          <Table.Cell colSpan='6'>{task.name}</Table.Cell>
          <Table.Cell><Checkbox slider /> {task.isVotable ? 'Open' : 'Closed'}</Table.Cell>
        </Table.Row>
      );
    });
  }

  renderSelectedTask() {
    var {selectedTask, userId} = this.state;
    var {id} = this.props.match.params;

    // var votes = selectedTask.votes;
    // console.log('selected task votes: ' + votes);

    // render description
    // button to edit task (TaskModal)
    return (
      <Container>
      <Item content={selectedTask.description}/>
      <TaskModal name={selectedTask.name} description={selectedTask.description}
      isNew={false} pollId={id} onSubmit={this.updateTasks}/>
      </Container>
    );
  }

  handleChange(fieldName, e) {
    this.setState({
      [fieldName]: e.target.value
    });
  }

  updateTasks(tasks) {
    this.setState({
      tasks: tasks
    });
  }

  onSelectTask(e) {
    var {tasks} = this.state;
    var selectedTaskId = e.currentTarget.id;
    var selectedTask = tasks.find(t => {
      return t._id === selectedTaskId;
    });
    this.setState({
      selectedTask: selectedTask
    });
    console.log('selected task: ' + selectedTask._id);
  }

}
