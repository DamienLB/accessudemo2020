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
        if (this.el.pickedup) this.el.moveLeft(true);
        break;
      case 'right':
        if (this.el.pickedup) this.el.moveRight(true);
        break;
      case 'up':
        if (this.el.pickedup) this.el.moveUp(true);
        break;
      case 'down':
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
        if (this.el.pickedup) {
          this.el.drop();
        }
        break;
      case 'pick up':
        if (!this.el.pickedup) {
          this.el.focus();
          this.el.pickup();
        }
        break;
    }
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
