import './SubscriptionDetailsPage.css'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../pix/TDD_logo.png';
import t1 from '../tea_pix/chunkytea.png'
import t2 from '../tea_pix/floraltea1.png'
import t4 from '../tea_pix/greeeeentea.png'
import t5 from '../tea_pix/loosepuer.png'
import t6 from '../tea_pix/loosetea1.png'
import t7 from '../tea_pix/teanhoney.png'
import t8 from '../tea_pix/whatisthistea.png'

const teaPix = [t1, t2, t4, t5, t6, t7, t8]

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * teaPix.length);
  return teaPix[randomIndex];
};

function SubscriptionDetailsPage() {
  const { id } = useParams()
  const [subDetails, setSubDetails] = useState(null);

  const activateSub = () => {
    fetch(
      `http://127.0.0.1:3000/api/v1/subscriptions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activestatus: true }),
      }
    )
      .then(response => response.json())
      .then(updatedSubDetails => {
        setSubDetails(updatedSubDetails.data); 
      })
      .catch(error => console.error("Error updating subscription active status:", error));
  };
  
  const deactivateSub = () => {
    fetch(
      `http://127.0.0.1:3000/api/v1/subscriptions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activestatus: false }),
      }
    )
      .then(response => response.json())
      .then(updatedSubDetails => {
        setSubDetails(updatedSubDetails.data);
      })
      .catch(error => console.error("Error updating subscription active status:", error));
  };

  function getSubDetails() {
    fetch(
      `http://127.0.0.1:3000/api/v1/subscriptions/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Subscriptions");
        }
        return response.json();
      })
      .then((data) => {
        setSubDetails(data.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription:", error)
      })
  }
  useEffect(() => {
    getSubDetails()
  }, [id]);

  const randomTea = getRandomImage()

  return (
    <div className='sub-detail-container'>
      <Link to={'/'}>
      <aside>
        <header className='landing-header'>
          <h1>Tea Digital Database</h1>
          <img src={logo} alt="logo of website"></img>
        </header>
      </aside>
      </Link>
      <div className='tea-details'>
      <h1>Subscription Details</h1>
        {subDetails && subDetails.attributes ? (
          <>
            <h2>{subDetails.attributes.title}, ${subDetails.attributes.price}</h2>
            <img className='tea-pic' src={randomTea} alt="A picture of loose tea"/>
            <p className='tea-info'>The {subDetails.attributes.title} subscription contains {subDetails.attributes.tea_details.title}, 
              a tea that connoisseurs describe as: {subDetails.attributes.tea_details.description}. 
              For best results, brew for {subDetails.attributes.tea_details.brewtime} minutes at {subDetails.attributes.tea_details.temperature} degrees.</p>
            <p>Subscription Frequency: {subDetails.attributes.frequency}</p>
            <p>Status: {subDetails.attributes.activestatus ? "Active" : "Inactive"}</p>          </>
        ) : (
          <h1>Loading Teas...</h1>
        )}
  
        {subDetails && subDetails.relationships && subDetails.relationships.customer ? (
          <div className='customer-details'>
            <h3>Customers on Subscription</h3>
            <p>{subDetails.attributes.customer_details.firstname} {subDetails.attributes.customer_details.lastname}, Customer ID: {subDetails.relationships.customer.data.id}</p>
          </div>
        ) : (
          <p>Loading Customer Info...</p>
        )}
        <div className='button-row'>
        <button className='activate' onClick={activateSub}>Activate Subscription</button>
        <button className='deactivate' onClick={deactivateSub}>Cancel Subscription</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetailsPage;