import React, { Component } from 'react';
import { connect } from 'react-redux';
import { centerOnTarget } from './webcomponents/utils';
import { mapDispatchToProps } from '../containers/DnDContainer';
import cat from '../assets/cat.png';

class Cat extends Component {

  componentDidMount() {
    this.el.notifs = this.props.notifs(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this));
    this.targetel.subscribe('DROPPED', centerOnTarget(this));
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	      type="cat"
	    >
	      <img src={cat} />
	      <dnd-target
		    ref={el => this.targetel = el}
		    type="cat"
		  />
	    </dnd-token>
		);
	}
}

const CatContainer = connect(
  null,
  mapDispatchToProps,
)(Cat);


export default CatContainer;
