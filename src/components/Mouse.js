import React, { Component } from 'react';
import { connect } from 'react-redux';
import { centerOnTarget } from './webcomponents/utils';
import { mapDispatchToProps } from '../containers/DnDContainer';
import mouse from '../assets/mouse.png';

class Mouse extends Component {

  componentDidMount() {
    this.el.notifs = this.props.notifs(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this));
    this.targetel.subscribe('DROPPED', centerOnTarget(this));
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	    	type="mouse"
	      id="mouse"
	    >
	      <img src={mouse} />
	      <dnd-target
		      ref={el => this.targetel = el}
		      type="mouse"
		    />
	    </dnd-token>
		);
	}
}

const MouseContainer = connect(
  null,
  mapDispatchToProps,
)(Mouse);


export default MouseContainer;
