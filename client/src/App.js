import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import DisplayGroups from "./components/DisplayGroups";
import QuotationsPage from "./components/QuotationsPage";

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <FileUpload />
      <QuotationsPage/>
      <Footer/>
    </div>
  );
}


export default App;
