import React, { Component } from 'react';
import classnames from 'classnames';
import map from 'lodash.map';


class SelectGesture extends Component {

  constructor(props) {
    super(props);
    this.capture = this.capture.bind(this);
    this.select = React.createRef();
  }

  capture() {
    this.props.capture(this.select.current.value);
  }

  screenReaderText(){
    const select = this.select.current ? this.select.current.value : Object.keys(this.props.gestureObj)[0];
    return `The ${select} command has been captured ${this.props.gestureObj[select]} times.`;
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
          <select id="capture-count" ref={this.select}>
            {items}
          </select>
          <button onClick={this.capture}>Capture</button>
        </div>
        <p aria-live="assertive" aria-atomic="true">{ this.screenReaderText() }</p>
      </div>
    );
  }
}

export default SelectGesture;
