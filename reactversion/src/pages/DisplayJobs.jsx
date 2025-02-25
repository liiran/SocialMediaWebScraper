import React, { useState, useEffect } from "react";
import styles from '../assets/Home.module.css';
import RedditEmbed from "../assets/redditEmbed";
import LinkedInBadge from "../assets/LinkedinEmbed";
import '../assets/index.css';
import { useLocation } from "react-router-dom";

// Menu component
const Menu = ({ isOpen }) => (
  <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
    <a href="home" id="home">Home</a>
    <a href="job-news" id="jobnews">Job News</a>
    <a href="quizzes" id="quizzes">Quizzes</a>
    <a href="#about" id="about">About</a>
  </div>
);

// JobInfo component
const JobInfo = ({ jobTitle, links }) => (
  <div className={styles.DisplayJobsContent}>
    {/* <h1 className={styles.CenteredHeading}>Posts about {jobTitle}</h1> */}
    {links && links.length > 0 ? (
      links.map((link, index) => {
        let columnStyle;
        columnStyle = styles.DisplayJobsItem;
        if(link.includes('tiktok.com')) {
          columnStyle = styles.DisplayJobsContentTiktok;
        }
        if(link.includes('youtube.com')) {
          columnStyle = styles.DisplayJobsContentYoutube;
        }
        if(link.includes('linkedin.com')) {
          columnStyle = styles.DisplayJobsContentLI;
        }
        return (
          <div key={index} className={columnStyle}>
            {/* Check if the link is a YouTube link or a TikTok link and render the appropriate iframe */}
            {link.includes('youtube.com') ? (
              <iframe
                src={link}
                style={{ width: '920px', height: '810px', border: 'none'}}
                title={`YouTube Video ${index + 1}`}
              ></iframe>
            ) : link.includes('tiktok.com') ? (
              <div className="tiktokwrap">
                <iframe
                  src={link}
                  style={{ width: '100%', height: '760px', border: 'none', maxWidth: '500px', minWidth: '50px', overflow:"hidden"}}
                  title={`TikTok Video ${index + 1}`}
                ></iframe>
              </div>
            ) : link.includes('linkedin.com') ? (
              <div className="llwrap">
                <LinkedInBadge profile={{ permalink: link }} />
              </div>
            ) : link.includes('reddit.com') ? (
              <div className="rwrap">
                <RedditEmbed post={{ permalink: link }} />
              </div>
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            )}
          </div>
        );
      })
    ) : (
      <p>No posts found for {jobTitle}.</p>
    )}
  </div>
);

// DisplayJobs component
function DisplayJobs() {
  const location = useLocation();
  const { state } = location;
  const { links, jobTitle } = state;
  const [isOpen, setIsOpen] = useState(false);
  document.body.style.overflowY


  // useEffect(() => {
  //   // Function to delete links after displaying everything
  //   const deleteLinks = async () => {
  //     try {
  //       // Make a request to the backend to delete the links
  //       const response = await fetch('http://127.0.0.1:8000/scraped/', {
  //         method: 'DELETE',
  //       });

  //       if (response.ok) {
  //         console.log('Links deleted successfully');
  //       } else {
  //         console.error('Failed to delete links');
  //       }
  //     } catch (error) {
  //       console.error('Network error', error);
  //     }
  //   };

  //   // Call the deleteLinks function after rendering the posts
  //   deleteLinks();
  // }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  // Return null if links are being deleted to avoid rendering the component with incomplete data
  if (links === undefined) {
    return null;
  }

  return (
    <>
      {/* Add the button to toggle the menu */}
      <button className={isOpen ? styles.pressed : styles.toggleMenu} onClick={() => setIsOpen(!isOpen)} style={{ border: 'none', outline: 'none' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png" width="46" height="45" />
      </button>

      {/* Include the Menu component */}
      <Menu isOpen={isOpen} style={{ textDecoration: 'none' }} />

      {/* Display job information using the JobInfo component */}
      <div className={`${styles.DisplayJobsGrid}` }>
        <JobInfo jobTitle={jobTitle} links={links} />
        {/* <RedditEmbed post={{ permalink: '/r/VirtualAssistant/comments/18p8uhn/for_hire_digital_marketing_specialist/' }} /> */}
      </div>
    </>
  );
}

export default DisplayJobs;
