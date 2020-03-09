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

const calculateCenter = (el) => () => {
  const { x, y, w, h } = el.getShape();
  const originX = x + (w / 2);
  const originY = y + (h / 2);
  return { originX, originY };
}


class Thing extends Component {

  componentDidMount() {
    this.el.notifs = this.props.notifs(this.el);
    this.el.calculateCenter = calculateCenter(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this));
    this.targetel.subscribe('DROPPED', centerOnTarget(this));
    this.targetel.calculateCenter = calculateCenter(this.targetel);


    this.el.subscribe('MOVING_TOWARDS', ({ newx, newy }) => {
      const tokenOrigin = this.el.calculateCenter();
      const targets = this.el.getEligibleTargets();
      const targetOrigins = targets.map(targetel => {
        return targetel.calculateCenter();
      });
      return this.props.checkOriginChanges(tokenOrigin, targetOrigins);
    });  
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
