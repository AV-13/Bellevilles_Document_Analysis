import React from 'react';
import Header from "./header";
import Footer from "./footer";
import Body from "./body";
import Login from './login'

const LoginPage = () => {

  return (
    <>
      <Header/>
      <div style={{marginTop: '5em'}}></div>
      <Login/>
      <Footer/>
    </>
  )
}

export default LoginPage;
