import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './ArtistCard.css'

const ArtistCard = ({
  featuredImage,
  title,
  excerpt,
  bio,
  numba,
  slug,
  className = '',
  ...props
}) => (
  <Link to={slug} className={`ArtistCard ${className}`}>
    {featuredImage && (
      <div className="ArtistCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ArtistCard--Content">
      asdgdsa this should be being pulled
      {title && <h3 className="ArtistCard--Title">{title}</h3>}

      {excerpt && <div className="ArtistCard--Excerpt">{excerpt}</div>}
      {bio && <div className="ArtistCard--Excerpt">{bio}</div>}
    </div>
  </Link>
)

export default ArtistCard
