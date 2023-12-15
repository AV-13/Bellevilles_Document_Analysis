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
      <Body/>
      <FileUpload />
      <Footer/>
    </>
  )
}

export default HomePage;
