import React, { Component } from 'react';
import '../Home.css';
import API from '../api/index'
import {
  Button,
  Form,
  Grid,
  Header,
  Divider,
  Segment
} from 'semantic-ui-react';


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

  componentDidMount() {

  }

  render() {
    return (
      <div className="home">
        <header className="home-header">
        <h1 className="home-title">let's play!</h1>
        <input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'username')} placeholder="Join as..."/> <br/>
        <input type="text" value={this.state.pollName} onChange={this.handleChange.bind(this, 'pollName')} placeholder="Enter poll name"/>
        <input type="submit" value="Create new poll" onClick={this.createPoll}/><br/>
        -OR-<br/><br/>
        <input type="text" value={this.state.pollId} onChange={this.handleChange.bind(this, 'pollId')} placeholder="Enter poll ID"/>
        <input type="submit" value="Join poll" onClick={this.joinPoll}/>
        </header>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Join as...' />
              <Form.Input icon='hashtag' iconPosition='left' label='Poll ID' type='pollId' />
              <Button content='Join poll' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Form>
              <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Join as...' />
              <Form.Input icon='' iconPosition='left' label='Poll Name' type='pollName' />
              <Button content='Create new poll' icon='signup'/>
            </Form>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      </div>

    );
  }

  createPoll(e) {
    e.preventDefault();
    // create and save new poll to db. get pollId in return and set state
    const pollPromise = API.createPoll({
      name: this.state.pollName
    });
    const userPromise = API.createUser({
      name: this.state.username
    });

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
