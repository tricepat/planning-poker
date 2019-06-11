import React, { Component } from 'react';
import Results from './Results'
import Voting from './Voting'
import TaskModal from './TaskModal'
import API from '../api/index'
import {Button, Form, Grid, Header, Table, Container, Checkbox, Icon, Item, Segment, Divider } from 'semantic-ui-react';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: null,
      userId: null,
      selectedTask: null,
      currVote: null
    };

    this.updateTask = this.updateTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onSelectTask = this.onSelectTask.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    var {location} = this.props;
    var {id} = this.props.match.params;
    if (!location.state || !location.state.userId) { // redirect to 'login' if user is unidentified
      return this.props.history.push(`/`);
    }
    console.log('user ID: ' + location.state.userId + ', poll id: ' + id);
    // get poll, get tasks
    API.getPollById(id).then(res => {
      console.log('[Poll] fetched poll ' + res + '. setting name: ' + res.name);
      API.getTasks(id).then(res => {
        console.log('[Poll] fetched tasks: ' + res + ', count: ' + res.length);
        this.setState({
          userId: location.state.userId,
          name: res.name,
          tasks: res
        });
      });
    });

  }

  render() {
    var {username, selectedTask} = this.state;
    var {id} = this.props.match.params;
    return (
      <Container>
        <Header as='h3'>Welcome, {username}</Header>
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
                      <TaskModal name='name' description='describe' isNew={true} pollId={id} onSubmit={this.addTask}/>
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
              {selectedTask ? this.renderSelectedTask() : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  renderTasks() {
    var {tasks} = this.state;
    return tasks.map((task, idx) => {
      return (
        <Table.Row key={task._id} id={task._id} onClick={this.onSelectTask}>
          <Table.Cell colSpan='6'>{task.name}</Table.Cell>
          <Table.Cell><Checkbox toggle checked={task.isVotable} onClick={this.toggleTaskStatus.bind(this, task._id)}/> {task.isVotable ? 'Open' : 'Closed'}</Table.Cell>
        </Table.Row>
      );
    });
  }

  renderSelectedTask() {
    var {selectedTask, userId, currVote} = this.state;
    var {id} = this.props.match.params;
    var selectedOption = currVote ? currVote : null;
    var aggregatedVotes = this.getAggregatedVotes(selectedTask.votes);

    return (
      <div>
        <Grid.Row>
          <Segment clearing >
            <Header as='h4'>
              Description
              <Header.Subheader>{selectedTask.description}</Header.Subheader>
            </Header>
            <TaskModal name={selectedTask.name} description={selectedTask.description}
              isNew={false} pollId={id} onSubmit={this.updateTask}
            />
          </Segment>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          {selectedTask.isVotable ? <Voting onSelect={this.vote} selectedOption={selectedOption}/>
            : <Results values={aggregatedVotes}/>}
        </Grid.Row>
      </div>
    );
  }

  // convert list of {userId: vote} to map of vote:count
  getAggregatedVotes(userToVoteArr) {
    var aggregatedVotes = {};
    Object.entries(userToVoteArr).map(([userId, vote]) => {
      if (vote in aggregatedVotes) {
        aggregatedVotes[vote]++;
      } else {
        aggregatedVotes[vote] = 1;
      }
    });
    return aggregatedVotes;
  }

  vote(value) {
    var {selectedTask, userId} = this.state;
    console.log('user ' + userId + ' voting for task ' + selectedTask._id + ', value: ' + value);
    var vote = {
      userId: userId,
      value: value
    }
    API.vote(selectedTask._id, vote).then(task => {
      this.updateTask(task);
      // update user's current vote
      this.setState({
        currVote: value
      });
    });
  }

  onSelectTask(e) {
    var {tasks, userId} = this.state;
    var selectedTaskId = e.currentTarget.id;
    var selectedTask = tasks.find(t => {
      return t._id === selectedTaskId;
    });
    // find user's vote, if exists
    var currVote = userId in selectedTask.votes ? selectedTask.votes[userId] : null;
    this.setState({
      selectedTask: selectedTask,
      currVote: currVote
    });
  }

  toggleTaskStatus(taskId, e) {
    var {tasks} = this.state;
    var selectedTask = tasks.find(t => {
      return t._id === taskId;
    });
    console.log('toggling status for task ' + selectedTask.name + ' to ' + !selectedTask.isVotable);
    var values = {
      isVotable: !selectedTask.isVotable
    }
  //  update task status in db
    API.updateTask(taskId, values).then(task => {
      console.log('updated task. new status: ' + task.isVotable);
      this.updateTask(task);
    });
  }

  // add task to state (avoid additional call to db)
  addTask(newTask) {
    var {tasks} = this.state;
    tasks.push(newTask);
    this.setState({
      tasks: tasks
    });
  }

  // update task in state (avoid additional call to db)
  updateTask(task) {
    var {tasks} = this.state;
    // replace outdated task
    var taskIdx = tasks.findIndex(t => t._id === task._id);
    tasks[taskIdx] = task;
    this.setState({
      tasks: tasks,
      selectedTask: tasks.find(t => (t._id === task._id))
    });
  }
}
