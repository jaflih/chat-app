import React, { Component } from 'react';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import './App.css';

class App extends Component {
  state = {
    messages: {},
    pseudo: 'jihane', //this.props.match.params.pseudo,
  };

  addMessage = (message) => {
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;
    this.setState({ messages });
  };

  render() {
    const messages = Object.keys(this.state.messages).map((key) => (
      <Message key={key} pseudo={this.state.messages[key].pseudo} message={this.state.messages[key].message} />
    ));

    console.log(messages);
    return (
      <div className="box">
        <div>
          <div className="messages">{messages}</div>
        </div>
        <Formulaire addMessage={this.addMessage} pseudo={this.state.pseudo} length={140} />
      </div>
    );
  }
}

export default App;
