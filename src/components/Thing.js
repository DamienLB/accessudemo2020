import React, { Component } from 'react';
import { centerOnTarget } from './webcomponents/utils';
import mouse from '../assets/mouse-transparent.png';
import cat from '../assets/cat-transparent.png';
import cheese from '../assets/cheese-transparent.png';


const images = {
  mouse,
  cat,
  cheese,
}

const tabindices = {
  mouse: 1,
  cat: 2,
  cheese: 3,
}

const calculateCenter = (el) => () => {
  const { x, y, w, h } = el.getShape();
  const originX = x + (w / 2);
  const originY = y + (h / 2);
  return { originX, originY };
}


class Thing extends Component {
  componentDidMount() {
    this.props.registerToken(this.el, this.props.type);
    this.el.notifs = this.props.notifs(this.el);
    this.el.calculateCenter = calculateCenter(this.el);
    this.targetel.subscribe('MOVING_TO', centerOnTarget(this.targetel));
    this.targetel.subscribe('DROPPED', centerOnTarget(this.targetel));
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

  componentWillUpdate(nextProps) {
    switch(nextProps.cmd) {
      case 'focus':
        this.el.focus();
        break;
      case 'left':
      case 'move left':
        if (this.el.pickedup) this.el.moveLeft(true);
        break;
      case 'right':
      case 'move right':
        if (this.el.pickedup) this.el.moveRight(true);
        break;
      case 'up':
      case 'move up':
        if (this.el.pickedup) this.el.moveUp(true);
        break;
      case 'down':
      case 'move down':
        if (this.el.pickedup) this.el.moveDown(true);
        break;
      case 'next':
        if (this.el.pickedup) {
          this.el.moveToNextTarget();
        }
        break;
        case 'back':
          if (this.el.pickedup) {
            this.el.moveToPrevTarget();
          }
        break;
      case 'drop':
      case 'drop the item':
        // if (this.el.pickedup) {
          this.el.drop();
        // }
        break;
      case 'pick up':
      case 'pickup':
      case 'pickup mouse':
      case 'pickup cat':
      case 'pickup cheese':
        // if (!this.el.pickedup) {
          this.el.focus();
          this.el.pickup();
        // }
        break;
    }
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	    	type={this.props.type}
        aria-label={this.props.type}
	    >
	      <img src={images[this.props.type]} alt={this.props.type} />
	      <dnd-target
		      ref={el => this.targetel = el}
		      type={this.props.type}
		    />
	    </dnd-token>
		);
	}
}

export default Thing;
