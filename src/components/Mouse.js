import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../containers/DnDContainer';
import mouse from '../assets/mouse.png';

class Mouse extends Component {

  componentDidMount() {
    this.el.notify = this.props.notify(this.el);
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	    	type="mouse"
	    >
	      <img src={mouse} />
	      <dnd-target type="mouse" />
	    </dnd-token>
		);
	}
}

const MouseContainer = connect(
  null,
  mapDispatchToProps,
)(Mouse);


export default MouseContainer;
