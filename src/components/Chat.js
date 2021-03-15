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
      addResponseMessage("Ingresá tu nombre por farol.");
      this.socket = io('http://localhost:4000/');
      this.socket.on('message', message => {
        addResponseMessage(`${message}`);
      });
    }
  
    handleNewUserMessage = (newMessage) => {
      if (!this.state.name) {
        this.setState({name: newMessage}, () => {
          addResponseMessage("¡Hola " + (this.state.name) + "! Soy Tomás del equipo de LUPY. Cualquier duda o consulta no dudes en preguntarla.");
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