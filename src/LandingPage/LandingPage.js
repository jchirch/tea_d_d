import './LandingPage.css';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../pix/TDD_logo.png';



function LandingPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  function getSubscriptions() {
    fetch(
      "http://127.0.0.1:3000/api/v1/subscriptions"
    )
    .then((response) => {
      console.log("RESPONSE HERE:", response)
      if (!response.ok){
        throw new Error("Failed to fetch Subscriptions");
      }
      return response.json();
    })
    .then((data) => {
      console.log("WOW WE GOT DATA", data)
      console.log("WOW WE GOT MOOORE DATA", data.data)
      setSubscriptions(data.data);
    })
    .catch((error) => {
      console.error("Error fetching subscriptions:", error)
    })
  }
console.log("LOOK HERE",subscriptions)
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
   
    <div className='sub-container'>
      <header>
        <h1>Tea Digital Database</h1>
        <img src={logo} alt="logo of website"></img>
      </header>
      
      <div className='sub-body'>
        <ul className='sub-list'>
          {subscriptions.length > 0 ? (
            subscriptions.map((sub) => (
              <li key={sub.id}>
                <Link to={`/subscriptions/${sub.id}`}>{sub.attributes.title}</Link>
              </li>
            ))
          ) : (
            <p>Make some tea while I'm loading all subscriptions</p>
          )
        }
        </ul>
      </div>
    </div>
  );
}
export default LandingPage;