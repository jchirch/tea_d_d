import './LandingPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../pix/TDD_logo.png';

function LandingPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  function getSubscriptions() {
    fetch(
      "http://127.0.0.1:3000/api/v1/subscriptions"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Subscriptions");
        }
        return response.json();
      })
      .then((data) => {
        setSubscriptions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching subscriptions:", error)
      })
  }
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className='sub-container'>
      <aside>
        <header className='landing-header'>
          <h1>Tea Digital Database</h1>
          <img src={logo} alt="logo of website"></img>
        </header>
      </aside>
      <div className='sub-body'>
        <h2>Subscription List</h2>
        <ul className='sub-list'>
          {subscriptions.length > 0 ? (
            subscriptions.map((sub) => (
              <Link to={`/subscriptions/${sub.id}`} key={sub.id} style={{ textDecoration: 'none' }}>
                <li className="subscription-item">{sub.attributes.title}</li>
              </Link>
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