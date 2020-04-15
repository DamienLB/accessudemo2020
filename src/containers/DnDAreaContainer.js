import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../components/webcomponents/dnd';
import { init } from '../actions';


class DnDArea extends Component {
  
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (<dnd-area keyIncrement="50">{this.props.children}</dnd-area>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(init()),
  }
}

const DnDAreaContainer = connect(
  null,
  mapDispatchToProps,
)(DnDArea);

export default DnDAreaContainer;
