import React from 'react';
import './App.css';
import logo from '../../images/Artboard 1_72x.png';

const Home = (props) => {

  
  return (
    <div >
      <header >
        {/* <h5 style={{marginTop: 20}} >
          Bienvenido(a) {props.state.name} a Litty Styles
        </h5> */}
        <img src={logo} alt="logo"/>
      </header>
    </div>
  );
}

export default Home;