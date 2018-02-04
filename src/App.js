import React, { Component } from 'react';
import Wrapper from './components/Wrapper';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		  <header className="App.header">
		  	<h1 className="App.title"> SF Muni Realtime Map</h1>
		  </header>
		  <Wrapper />
      </div>
    );
  }
}

export default App;
