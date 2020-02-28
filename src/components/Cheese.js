import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../containers/DnDContainer';
import cheese from '../assets/cheese.png';

class Cheese extends Component {

  componentDidMount() {
    this.el.notify = this.props.notify(this.el);
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el} 
	    	type="cheese"
	    >
	      <img src={cheese} />
	      <dnd-target type="cheese" />
	    </dnd-token>
		);
	}
}

const CheeseContainer = connect(
  null,
  mapDispatchToProps,
)(Cheese);


export default CheeseContainer;
