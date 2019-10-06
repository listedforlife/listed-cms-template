import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav2.css'

const PostCategoriesNav2 = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav2">
    <Link className="NavLink" exact="true" to={`/artists/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PostCategoriesNav2