import React from 'react';
import './App.css';

const Home = (props) => {

  
  return (
    <div className="App">
      <header className="App-header">
        <h5>
          Bienvenido(a) {props.state.name} a Litty Styles
        </h5>
      </header>
    </div>
  );
}

export default Home;