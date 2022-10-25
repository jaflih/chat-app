import React, { Component } from 'react';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="box">
        <div>
          <div className="messages">
            <Message />
          </div>
        </div>
        <Formulaire />
      </div>
    );
  }
}

export default App;
