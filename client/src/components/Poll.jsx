import React, { Component } from 'react';
import Results from './Results'
import Voting from './Voting'
import TaskModal from './TaskModal'
import API from '../api/index'
import {Grid, Header, Table, Container, Checkbox, Icon, Segment, Divider, Message } from 'semantic-ui-react';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      pollName: null,
      userId: null,
      username: null,
      selectedTask: null,
      currVote: null,
      errorMsg: null
    };

    this.updateTask = this.updateTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.onSelectTask = this.onSelectTask.bind(this);
    this.vote = this.vote.bind(this);
    this.renderPoll = this.renderPoll.bind(this);
  }

  componentDidMount() {
    var {location} = this.props;
    var {id} = this.props.match.params;
    if (!location.state || !location.state.userId) { // redirect to 'login' if user is unidentified
      return this.props.history.push(`/`);
    }
    // get poll, then get tasks and user
    API.getPollById(id).then(res => {
      this.setState({ pollName: res.name });
    }).catch(e => {
      this.setState({ errorMsg: 'Oops! Poll does not exist or could not be fetched.' });
    });

    API.getTasks(id).then(res => {
      this.setState({ tasks: res });
    }).catch(e => {
      this.setState({ errorMsg: 'Sorry, tasks could not be fetched.' });
    });
    API.getUser(location.state.userId).then(res => {
      this.setState({
        userId: location.state.userId,
        username: res.name
      });
    });
  }

  render() {
    var {errorMsg} = this.state;
    return errorMsg ? (<Message icon='frown outline' negative content={errorMsg} />) : this.renderPoll();
  }

  renderPoll() {
    var {username, selectedTask, pollName} = this.state;
    var {id} = this.props.match.params;

    return(
      <Container>
          <Grid columns={2} divided padded>
            <Grid.Row>
              <Message size='tiny' icon>
                <Icon name='thumbs up outline' />
                <Message.Content>
                  <Message.Header>Glad you're here, {username}</Message.Header>
                  Ready to plan?
                </Message.Content>
              </Message>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <Header as='h3'>{pollName}</Header>
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
                        <TaskModal taskExists={false} pollId={id} onSubmit={this.addTask}/>
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
    var {selectedTask, currVote} = this.state;
    var {id} = this.props.match.params;
    var selectedOption = currVote ? currVote : null;
    var aggregatedVotes = this.getAggregatedVotes(selectedTask.votes);

    return (
      <div>
        <Grid.Row>
          <Segment clearing >
            <Header as='h4'>
              {selectedTask.name}
              <Header.Subheader>{selectedTask.description}</Header.Subheader>
            </Header>
            <TaskModal name={selectedTask.name} description={selectedTask.description}
              taskExists={true} pollId={id} taskId={selectedTask._id} onSubmit={this.updateTask}/>
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
    Object.entries(userToVoteArr).forEach(([userId, vote]) => {
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
    var vote = {
      userId: userId,
      value: value
    }
    API.vote(selectedTask._id, vote).then(task => {
      this.updateTask(task);
      // update user's current vote
      this.setState({ currVote: value });
    });
  }

  onSelectTask(e) {
    var {tasks, userId} = this.state;
    var selectedTaskId = e.currentTarget.id;
    var selectedTask = tasks.find(t => { return t._id === selectedTaskId; });
    // find user's vote, if exists
    var currVote = userId in selectedTask.votes ? selectedTask.votes[userId] : null;
    this.setState({
      selectedTask: selectedTask,
      currVote: currVote
    });
  }

  toggleTaskStatus(taskId, e) {
    var {tasks} = this.state;
    var selectedTask = tasks.find(t => { return t._id === taskId; });
    var values = { isVotable: !selectedTask.isVotable };
    API.updateTask(taskId, values).then(task => { this.updateTask(task); });
  }

  // add task to state (avoid additional call to db)
  addTask(newTask) {
    var {tasks} = this.state;
    tasks.push(newTask);
    this.setState({ tasks: tasks });
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
