import React, { Component } from 'react';
import { connect } from 'react-redux';
import { centerOnTarget } from './webcomponents/utils';
import { mapDispatchToProps } from '../containers/DnDContainer';
import cheese from '../assets/cheese.png';

class Cheese extends Component {

  componentDidMount() {
    this.el.notifs = this.props.notifs(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this));
    this.targetel.subscribe('DROPPED', centerOnTarget(this));
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el} 
	    	type="cheese"
	    >
	      <img src={cheese} />
	      <dnd-target
		      ref={el => this.targetel = el}
		      type="cheese"
		    />
	    </dnd-token>
		);
	}
}

const CheeseContainer = connect(
  null,
  mapDispatchToProps,
)(Cheese);


export default CheeseContainer;
