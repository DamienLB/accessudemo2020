import React, { Component } from 'react';
import voiceCommand from '../lib/voiceCommand';

const Context = React.createContext({});
const Provider = Context.Provider;
export const VoiceConsumer = Context.Consumer;



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


class VoiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentWillUnmount() {
    this.recognition.stop();
  }

  componentDidMount() {
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.onresult = (event) => {
      if(event.results[event.results.length-1].isFinal) {
        const transcript = event.results[event.results.length-1][0].transcript;
        const { type, cmd } = voiceCommand(transcript);
        this.setState({ type, cmd  });
        setTimeout(() => {
          this.setState({ cmd: ''  });
        }, 100);
      }
    }
    this.recognition.start();
  }

  render() {
    return (
      <Provider value={this.state}>{this.props.children}</Provider>
    );
  }
}

export default VoiceProvider;

