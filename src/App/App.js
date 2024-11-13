// import logo from '../logo.svg';
import './App.css';
import LandingPage from "../LandingPage/LandingPage"
import SubscriptionDetailsPage from "../SubscriptionDetailsPage/SubscriptionDetailsPage"

import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/subscriptions/:id" element={<SubscriptionDetailsPage />} />
    </Routes>
  );
}

export default App;