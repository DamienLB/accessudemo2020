import React, { Component } from 'react';
import classnames from 'classnames';
import map from 'lodash.map';


class SelectGesture extends Component {

  constructor(props) {
    super(props);
    this.capture = this.capture.bind(this);
  }

  capture() {
    this.props.capture(this.select.value);
  }

  render() {
    const wrapperclass = classnames('select-gesture', { enabled: this.props.enabled });
    const items = map(this.props.gestureObj, (count, item) => {
      return (<option value={item} key={item}>{`${item} - ${count}`}</option>)
    });
    return (
      <div className={wrapperclass}>
        <label htmlFor="capture-count">Capture a gesture for this action:</label>
        <div>
          <select id="capture-count" ref={el => this.select = el}>
            {items}
          </select>
          <button onClick={this.capture}>Capture</button>
        </div>
      </div>
    );
  }
}

export default SelectGesture;
