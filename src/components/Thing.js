import React, { Component } from 'react';
import { centerOnTarget } from './webcomponents/utils';
import mouse from '../assets/mouse.png';
import cat from '../assets/cat.png';
import cheese from '../assets/cheese.png';


const images = {
  mouse,
  cat,
  cheese,
}

class Thing extends Component {

  componentDidMount() {
    this.el.notifs = this.props.notifs(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this));
    this.targetel.subscribe('DROPPED', centerOnTarget(this));
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	    	type={this.props.type}
	    >
	      <img src={images[this.props.type]} />
	      <dnd-target
		      ref={el => this.targetel = el}
		      type={this.props.type}
		    />
	    </dnd-token>
		);
	}
}

export default Thing;
