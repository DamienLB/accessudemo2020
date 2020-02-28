import React, { Component } from 'react';
import { load } from '../lib/annyang';


export class Annyang extends Component {
  constructor(props) {
    super(props);
    this.setupAnyang = this.setupAnyang.bind(this);
    this.state = { result: 'Waiting for your voice!' };
  }

  setupAnyang() {
    if (annyang) {
      const commands = {
        'hello': () => {
          this.setState({ result: 'Hello!' });
        },
        'sweet': () => {
          this.setState({ result: 'Sweet!' });
        },
        'my name is *name': (name) => {
          this.setState({ result: `Your name is ${name}!` });
        }
      };
      annyang.addCommands(commands);
      annyang.addCallback('resultNoMatch', (phrases) => {
        this.setState({ result: `${phrases[0]}` });
      });
      annyang.setLanguage(this.props.lang);
      annyang.start();
    }
  }

  componentWillUnmount() {
    if (annyang) {
      annyang.abort();
      delete window.annyang;
    }
  }

  componentDidMount() {
    load(this.el, this.setupAnyang);
  }

  render() {
    return (
      <div ref={(el) => this.el = el}>
        <div className="annyang-result">{this.state.result}</div>
      </div>
    );
  }
}
