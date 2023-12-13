import FileUpload from "./components/fileUpload";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import DisplayGroups from "./components/DisplayGroups";

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <FileUpload />
      <DisplayGroups />
      <Footer/>
    </div>
  );
}


export default App;
