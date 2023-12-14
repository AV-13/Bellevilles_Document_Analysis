import FileUpload from "./components/fileUpload";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import DisplayGroups from "./components/DisplayGroups";
import Login from './components/login'
import Register from './components/registerForm'

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <FileUpload />
      <DisplayGroups />
      <Footer/>
      <Login/>
      <Register/>
    </div>
  );
}


export default App;
