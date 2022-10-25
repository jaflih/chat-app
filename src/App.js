import React, { Component, createRef } from 'react';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import './App.css';
import './animations.css';

import { db } from './firebase';
import { ref, set, get, update, remove, child } from 'firebase/database';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
    let messages = { ...this.state.messages };
    const messageId = `message-${Date.now()}`;

    messages[messageId] = message;

    if (Object.keys(messages).length > 10) {
      messages = Object.keys(messages).slice(0, 1);
    }
    /* Object.keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null;
      });
*/
    this.setState({ messages });
    console.log(messages);

    /*const db = this.state.db;
    set(ref(db, 'messages/' + messageId), {
      messages: message,
    });*/
  };

  render() {
    const messages = Object.keys(this.state.messages).map((key) => (
      <CSSTransition timeout={2000} classNames="fade" key={key}>
        <Message pseudo={this.state.messages[key].pseudo} message={this.state.messages[key].message} />
      </CSSTransition>
    ));

    return (
      <div className="box">
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">{messages}</TransitionGroup>
          </div>
        </div>
        <Formulaire addMessage={this.addMessage} pseudo={this.state.pseudo} length={140} />
      </div>
    );
  }
}

export default App;
