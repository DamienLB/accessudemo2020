import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../containers/DnDContainer';
import cat from '../assets/cat.png';

class Cat extends Component {

  componentDidMount() {
    this.el.notify = this.props.notify(this.el);
  }

	render() {
		return (
	    <dnd-token
	      ref={el => this.el = el}
	      type="cat"
	    >
	      <img src={cat} />
	      <dnd-target type="cat" />
	    </dnd-token>
		);
	}
}

const CatContainer = connect(
  null,
  mapDispatchToProps,
)(Cat);


export default CatContainer;
