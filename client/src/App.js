import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import QuotationsPage from "./components/QuotationsPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/profilePage';
import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './userContext';
import LoadingScreen from './components/loadingScreen';



function App() {

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
