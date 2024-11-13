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
    console.log("LOOKY HERE", {subDetails})
    // <div className='sub-detail-container'>

    //   <aside>
    //     <header className='landing-header'>
    //       <h1>Tea Digital Database</h1>
    //       <img src={logo} alt="logo of website"></img>
    //     </header>
    //   </aside>
    //   <h1>hiiiiiii you found it</h1>
    //   <div className='tea-details'>
    //     <h2>{subDetails}</h2>
    //   </div>
    // </div>

  );





}

export default SubscriptionDetailsPage;