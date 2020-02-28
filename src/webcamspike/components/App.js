import React, { Component } from 'react';
import { init, classify, predict } from '../lib/mobileNet.js';
import '../stylesheets/main.scss';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      input: '',
      classes: [],
      prediction: null,

    };

    this.updateInput = this.updateInput.bind(this);
    this.classifyBtn = this.classifyBtn.bind(this);
    this.updatePrediction = this.updatePrediction.bind(this);
    this.updateInputWith = this.updateInputWith.bind(this);
    this.ready = this.ready.bind(this);
  }

  updateInput(e) {
    this.setState({ input: e.target.value });
  }

  updateInputWith(item) {
    this.setState({ input: item });
  }

  classifyBtn() {
    const label = this.state.input;
    if (label) {
      const classes = this.state.classes.slice();
      let classId;
      let firstId;
      if (classes.indexOf(label) !== -1) {
        classId = classes.indexOf(label);
      } else {
        classes.push(label);
        this.setState({ classes });
        classId = classes.length - 1;

        if (classId === 0) { // the first class id was just added; we use this below to start the predict()
          firstId = true;
        }
      }
      classify(classId); // classify the current image with this id.
      if (firstId) {
        predict(this.updatePrediction); // now we can start predicting
      }
      // this.setState({ input: '' });
    }
  }

  updatePrediction(classId) {
    this.setState({ prediction: parseInt(classId) });
  }

  ready() {
    this.setState({ loaded: true });
  }

  componentDidMount() {
    init(this.video, this.ready);
  }

  render() {
    let classifications = (<div className="emptyClassifications">No classifications have been added yet.</div>);
    if (this.state.classes.length) {
      classifications = this.state.classes.map((item) => {
        const id = this.state.classes.indexOf(item);
        const classname = this.state.prediction === id ? 'selected' : 'notselected';
        return (
          <div
          key={id}
          className={classname}
          onClick={() => { this.updateInputWith(item); }}
          >
          {item}
          </div>);
      });
    }
    return (
      <div className="savi-tensorflow-demo1">
        <h2>Webcam Classifier Demo</h2>
        <div className="content">
          <div className="col1">
            <div className="video"><video ref={(el) => this.video = el } autoPlay playsInline muted id="webcam" width="100%" height="100%"></video></div>
          </div>
          <div className="col2">
            <div className="form">
              <div className="instructions">
                <h3>Instructions</h3>
                <ol>
                  <li>Teach the model
                    <ul>
                      <li>Describe in one or two words the image that is displayed on your webcam, then select the Add Class button.</li>
                      <li>Capture multiple images of the same class, then repeat for a different class.</li>
                    </ul>
                  </li>
                  <li>Test the model
                    <ul>
                      <li>The size of the text shows which class the model thinks is being displayed on your webcam.</li>
                    </ul>
                  </li>
                </ol>
              </div>
              <input type="text" size="25" value={this.state.input} onChange={this.updateInput} disabled={!this.state.loaded}/>
              <button onClick={this.classifyBtn} disabled={!this.state.loaded}>Add Class</button>
            </div>
            <div className="classifications">{classifications}</div>
          </div>
        </div>
      </div>
    );
  }
}
