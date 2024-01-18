import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import QuotationsPage from "./components/QuotationsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './userContext';

function App() {

  return (
    <div className="App">
        <UserProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tableaudevis" element={<PrivateRoute><QuotationsPage /></PrivateRoute>} />         
          </Routes>
        </Router>
        </UserProvider>
    </div>
  );
}

export default App;
