import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import io from 'socket.io-client';
import 'react-chat-widget/lib/styles.css';
import './Chat.css'
import logo from './logo-lupy.png';

class Chat extends Component {

    constructor() {
      super();
      this.state = {
        name: null
      }
    }

    componentDidMount() {
      addResponseMessage("Ingresá tu nombrel.");
      this.socket = io(`http://localhost:6000`);
      this.socket.on('message', message => {
        addResponseMessage(`${message}`);
      });
    }
  
    handleNewUserMessage = (newMessage) => {
      if (!this.state.name) {
        this.setState({name: newMessage}, () => {
          const msj = "¡Hola " + (this.state.name) + "! Somos del equipo de Bebidas. Cualquier duda o consulta no dudes en preguntarla."
          addResponseMessage(msj);
          this.socket.emit('auth', this.state.name);
        });
      }

      else {
        const user = {
          name: this.state.name,
          text: newMessage
        }
        this.socket.emit('message', user);
      }
      
      // Now send the message throught the backend API
    }
    render() {
      return (
        <div className="Chat">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            profileAvatar={logo}
            title="¡Chatea con nosotros!"
            subtitle="Te responderemos a la brevedad"
          />
        </div>
      );
    } 
  }
  
  export default Chat;