import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Segment, Header } from 'semantic-ui-react';

const VOTING_OPTIONS = ['0', '1/2', '1', '2', '3', '5', '8', '13'];

export default class Voting extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: this.props.selectedOption
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps){
    if(this.props.selectedOption !== prevProps.selectedOption){
      this.setState({
        selectedOption: this.props.selectedOption
      });
    }
  }

  render() {
    return (
      <Segment>
        <Header as='h4'>What's your estimate?</Header>
        <Card.Group itemsPerRow={3}>
          {this.renderOptions()}
        </Card.Group>
      </Segment>
    );
  }

  renderOptions() {
    var {options} = this.props;
    var {selectedOption} = this.state;
    var votingOptions = options ? options : VOTING_OPTIONS;

    return votingOptions.map((option, idx) => {
      var isSelected = (option === selectedOption);
      var color = isSelected ? 'red' : 'black';
      return (
        <Card key={option} id={option} onClick={this.handleClick} color={color}>
          <Card.Content content={option} textAlign='center' />
        </Card>
      );
    });
  }

  handleClick(e) {
    var {onSelect} = this.props;
    var votedOption = e.currentTarget.id;
    this.setState({
      selectedOption: votedOption
    });
    onSelect(votedOption);
  }
}

Voting.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string
};
