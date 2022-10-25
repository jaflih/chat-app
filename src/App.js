import React, { Component, createRef } from 'react';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import './App.css';

import { db } from './firebase';
import { ref, set, get, update, remove, child } from 'firebase/database';

class App extends Component {
  state = {
    db: '',
    messages: {},
    pseudo: 'jihane', //this.props.match.params.pseudo,
  };

  messagesRef = createRef();

  componentDidMount() {
    this.setState({ db: db });
  }

  componentDidUpdate() {
    const ref = this.messagesRef.current;
    ref.scrollTop = ref.scrollHeight;
  }

  addMessage = (message) => {
    const messages = { ...this.state.messages };
    const messageId = `message-${Date.now()}`;

    messages[messageId] = message;
    this.setState({ messages });
    const db = this.state.db;

    set(ref(db, 'messages/' + messageId), {
      messages: message,
    });
  };

  render() {
    const messages = Object.keys(this.state.messages).map((key) => (
      <Message key={key} pseudo={this.state.messages[key].pseudo} message={this.state.messages[key].message} />
    ));

    console.log(messages);
    return (
      <div className="box">
        <div>
          <div className="messages" ref={this.messagesRef}>
            {messages}
          </div>
        </div>
        <Formulaire addMessage={this.addMessage} pseudo={this.state.pseudo} length={140} />
      </div>
    );
  }
}

export default App;
