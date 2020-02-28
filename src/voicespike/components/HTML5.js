import React, { Component } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


export class HTML5 extends Component {
  constructor(props) {
    super(props);
    this.state = { result: 'Waiting for your voice!' };
  }

  componentWillUnmount() {
    this.recognition.stop();
  }

  componentDidMount() {
    this.recognition = new SpeechRecognition();
    this.recognition.lang = this.props.lang;
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.onresult = (event) => {
      if(event.results[event.results.length-1].isFinal) {
        this.setState({ result: `${event.results[event.results.length-1][0].transcript}` });
      }
    }
    this.recognition.start();
  }

  render() {
    return (
      <div ref={(el) => this.el = el}>
        <div className="html5-result">{this.state.result}</div>
      </div>
    );
  }
}
