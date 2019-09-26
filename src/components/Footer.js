import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      <br>
      </br>
      Follow us{' '}
      <a href="https://www.instagram.com/areulisted/">@areulisted</a>
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
