import React, { Component } from 'react';
import Results from './Results'
import Voting from './Voting'
import TaskModal from './TaskModal'
import {
  Button,
  Form,
  Grid,
  Header,
  Table,
  Container,
  Checkbox,
  Icon,
  Modal
} from 'semantic-ui-react';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tasks: [],
      userId: null
    };

  }

  componentDidMount() {
    var {location} = this.props;
    console.log('user ID: ' + location.state.userId);
    this.setState({userId: location.state.userId});
  }

  render() {
    var {username} = this.state;
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
                  <Table.Row>
                    <Table.Cell colSpan='6'>Connect to database</Table.Cell>
                    <Table.Cell>  <Checkbox slider /> Closed</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan='6'>Create new task</Table.Cell>
                    <Table.Cell><Checkbox slider /> Open</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan='6'>Edit existing task</Table.Cell>
                    <Table.Cell><Checkbox slider /> Open</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan='8'>
                      <Modal trigger={
                        <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.newTask}>
                          <Icon name='add' /> New Task
                        </Button>
                      }>
                        <TaskModal name='name' description='describe' onSubmit={this.newTask} />
                      </Modal>
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
              task description | results
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  newTask(e) {
    console.log('creating new task');
  }

  handleChange(fieldName, e) {
    this.setState({
      [fieldName]: e.target.value
    });
  }

}
