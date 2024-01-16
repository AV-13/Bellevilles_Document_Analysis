import React from 'react';
import Header from "./header";
import Footer from "./footer";
import Body from "./body";
import FileUpload from "./fileUpload";
import DisplayGroups from "./DisplayGroups";

const HomePage = () => {

  return (
    <>
      <Header/>
      <div style={{marginTop: '5em'}}></div>
      <Body/>
      <FileUpload />
      <Footer/>
    </>
  )
}

export default HomePage;
