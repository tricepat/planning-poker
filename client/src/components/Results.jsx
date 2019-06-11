import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Message, Label, Header, Segment} from 'semantic-ui-react';

export default class Results extends Component {

  render() {
    return (
      <Segment>
        <Header as='h4'>Results</Header>
        <Card.Group itemsPerRow={3}>
          {this.renderValues()}
        </Card.Group>
      </Segment>
    );
  }

  renderValues() {
    var {values} = this.props;
    var sortedValues = this.sortValues(values);
    return (sortedValues.length > 0) ?
      sortedValues.map((value, idx) => {
        return (
          <Card key={value[0]} id={value[0]}  color='black'>
            <Label color='orange' floating>
              {value[1]}
            </Label>
            <Card.Content content={value[0]} textAlign='center' />
          </Card>
        );
      })
      : <Message icon='warning circle' content='No one has voted!' />;
  }

  sortValues(values) {
    var isDescending = (!this.props.descending==null) ? this.props.descending : true; // sort in descending order by default
  	var sortable=[];
  	Object.keys(values).forEach(key => { // convert Object into array for sorting
  		if(values.hasOwnProperty(key)) { sortable.push([key, values[key]]); }
  	});
  	sortable.sort(function(a, b) { return isDescending ? b[1]-a[1] : a[1]-b[1]; });
  	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }
}

Results.propTypes = {
  values: PropTypes.object.isRequired,
  descending: PropTypes.bool
};
