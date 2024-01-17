import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import QuotationsPage from "./components/QuotationsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import ProfilePage from './components/profilePage';
import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './userContext';


export const UserContext = createContext();

function App() {
  // const [context, setContext] = useState({ userInfo: null, isLoggedIn: false });

  return (
    <div className="App">
      {/* <UserContext.Provider value={[context, setContext]}> */}
        <UserProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tableaudevis" element={<PrivateRoute><QuotationsPage /></PrivateRoute>} />         
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
        </UserProvider>
      {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;
