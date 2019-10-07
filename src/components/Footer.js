import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'
import { SocialIcon } from 'react-social-icons';


export default () => (
  <div >
    <h2 className="taCenter" style={{margin:'14px'}}>
      <br>
      </br>
      <a>
      <span style={{margin:'5px'}}>
      <SocialIcon  url="http://twitter.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="http://facebook.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="http://instagram.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="mailto:webmaster@example.com" />
      </span>
      </a>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved.{' '}
        </span>
      </div>
    </footer>
  </div>
)
