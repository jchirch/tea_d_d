import logo from '../logo.svg';
import './App.css';
import LandingPage from "./LandingPage"
import SubscriptionDetailsPage from "./SubscriptionDetailsPage"
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";


function App() {
  return (
  //  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/subscriptions/:id" element={<SubscriptionDetailsPage />} />
    </Routes>
  //  </Router>
  );
}

export default App;
