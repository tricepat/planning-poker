import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import API from '../api/index';

const VOTING_OPTIONS = ['0', '1/2', '1', '2', '3', '5', '8', '13'];

export default class Voting extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: this.props.selectedOption
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({
        selectedOption: nextProps.selectedOption
      });
    }
  }

  render() {
    return (
      <Card.Group itemsPerRow={3}>
        {this.renderOptions()}
      </Card.Group>
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
