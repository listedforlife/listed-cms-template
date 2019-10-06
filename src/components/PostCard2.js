import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard2.css'

const PostCard2 = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard2 ${className}`}>
    {featuredImage && (
      <div className="PostCard2--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard2--Content">
      {title && <h3 className="PostCard2--Title">{title}</h3>}
      <div className="PostCard2--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {excerpt && <div className="PostCard2--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default PostCard2
