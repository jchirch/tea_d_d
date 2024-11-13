import './LandingPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../pix/TDD_logo.png';

function LandingPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchItem, setSearchItem] = useState("");

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

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.attributes.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className='sub-container'>
      <aside>
        <header className='landing-header'>
          <h1>Tea Digital Database</h1>
          <img src={logo} alt="logo of website"></img>
        </header>
      </aside>
      <div className='sub-body'>
        <h2>Subscription List
        <input className='searchbar'
          placeholder="Search List..."
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
          style={{ float: 'right', margin: '10px' }}
        />
        </h2>
        <ul className='sub-list'>
          {filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map((sub) => (
              <Link to={`/subscriptions/${sub.id}`} key={sub.id} style={{ textDecoration: 'none' }}>
                <li className="subscription-item">{sub.attributes.title}</li>
              </Link>
            ))
          ) : (
            <p>Make some tea while I'm loading all subscriptions</p>
          )}
        </ul>
      </div>
    </div>
  );
}
export default LandingPage;