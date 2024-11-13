import './SubscriptionDetailsPage.css'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../pix/TDD_logo.png';

function SubscriptionDetailsPage() {
  const { id } = useParams()
  const [subDetails, setSubDetails] = useState(null);

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

  return (
    // console.log({subDetails})
    <div className='sub-detail-container'>
      <aside>
        <header className='landing-header'>
          <h1>Tea Digital Database</h1>
          <img src={logo} alt="logo of website"></img>
        </header>
      </aside>
      <div className='tea-details'>
      <h1>Subscription Details</h1>
        {subDetails && subDetails.attributes ? (
          <>
            <h2>{subDetails.attributes.title}, ${subDetails.attributes.price}</h2>
            <p className='tea-info'>The {subDetails.attributes.title} subscription contains {subDetails.attributes.tea_details.title}, 
              a tea that connoisseurs describe as: {subDetails.attributes.tea_details.description}. 
              For best results, brew for {subDetails.attributes.tea_details.brewtime} minutes at {subDetails.attributes.tea_details.temperature} degrees.</p>
            <p>Subscription Frequency: {subDetails.attributes.frequency}</p>
            <p>Status: {subDetails.attributes.activestatus ? "Active" : "Inactive"}</p>
          </>
        ) : (
          <h1>Loading Teas...</h1>
        )}
  
        {subDetails && subDetails.relationships && subDetails.relationships.customer ? (
          <div className='customer-details'>
            <h3>Customers on Subscription</h3>
            <p>Customer ID: {subDetails.relationships.customer.data.id}</p>
            {/* <p>Customer Name: {customerData.attributes.firstname}</p> */}
          </div>
        ) : (
          <p>Loading Customer Info...</p>
        )}
      </div>
    </div>
  );
}

export default SubscriptionDetailsPage;