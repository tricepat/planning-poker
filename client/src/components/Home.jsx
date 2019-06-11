import React, { Component } from 'react';
import API from '../api/index'
import { Button, Form, Grid, Divider, Segment, Input, Container } from 'semantic-ui-react';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      pollName: null,
      pollId: null
    };

    this.createPoll = this.createPoll.bind(this);
    this.joinPoll = this.joinPoll.bind(this);
  }

  render() {
    var {username, pollName, pollId} = this.state;
    return (
      <Container>
        <Divider hidden />
        <Input icon='user' iconPosition='left' placeholder='Join as...'
            onChange={this.handleChange.bind(this, 'username')}/>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Row centered>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Input icon='hashtag' iconPosition='left' label='Poll ID'
                    onChange={this.handleChange.bind(this, 'pollId')} />
                  <Button content='Join poll' primary onClick={this.joinPoll} disabled={!username || !pollId}/>
                </Form>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Form>
                  <Form.Input icon='' iconPosition='left' label='Poll Name'
                    onChange={this.handleChange.bind(this, 'pollName')}/>
                  <Button content='Create new poll' icon='signup' onClick={this.createPoll} disabled={!username || !pollName}/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider vertical>OR</Divider>
        </Segment>
      </Container>
    );
  }

  createPoll(e) {
    e.preventDefault();
    // create and save new poll to db. get pollId in return and set state
    const pollPromise = API.createPoll({ name: this.state.pollName });
    const userPromise = API.createUser({ name: this.state.username });

    Promise.all([pollPromise, userPromise]).then(res => {
      var newPollId = res[0]._id;
      var newUserId = res[1]._id;
      console.log('new poll: ' + newPollId + ', new user: ' + newUserId);
      this.props.history.push(`/poll/${newPollId}`, {
        userId: newUserId
      });
    });

  }

  joinPoll(e) {
    e.preventDefault();
    API.createUser({name: this.state.username}).then(res => {
      this.props.history.push(`/poll/${this.state.pollId}`, {
        userId: res._id
      });
    });
  }

  handleChange(fieldName, e) { this.setState({ [fieldName]: e.target.value });}
}
