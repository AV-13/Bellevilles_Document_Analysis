import React from 'react';
import Header from "./header";
import Footer from "./footer";
import Body from "./body";
import Register from './registerForm';

const RegisterPage = () => {

  return (
    <>
      <Header/>
      <div style={{marginTop: '5em'}}></div>
      <Register/>
      <Footer/>
    </>
  )
}

export default RegisterPage;
