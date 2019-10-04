import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './ArtistProfile.css'

export const ArtistProfileTemplate = ({
  title,
  date,
  body,
  nextPostURL,
  atURL,
  prevPostURL,
  categories = [],
}) => (
  <main>
    <article
      className="ArtistProfile section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="ArtistProfile--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <div className="ArtistProfile--Content relative">
          <div className="ArtistProfile--Meta">
            {date && (
              <time
                className="ArtistProfile--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {_format(date, 'MMMM Do, YYYY')}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="ArtistProfile--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>
            
          {title && (
            <h1 className="ArtistProfile--Title" itemProp="title">
              {title}
            </h1>
          )}
        

{atURL && (
            <h1 style={{color:'white'}}>
              {atURL}
            </h1>
          )}

          <div className="ArtistProfile--InnerContent">
            <Content source={body} />
          </div>

          <div className="ArtistProfile--Pagination">
            {prevPostURL && (
              <Link
                className="ArtistProfile--Pagination--Link prev"
                to={prevPostURL}
              >
              
                Previous Post
              </Link>
              
            )}
            
            {nextPostURL && (
              <Link
                className="ArtistProfile--Pagination--Link next"
                to={nextPostURL}
              >
                Next Post
              </Link>
            )}

          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const ArtistProfile = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.url || false}
      atURL={post.frontmatter.url || false}
    >
                  
      <ArtistProfileTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <a>{post.frontmatter.url}</a>
    </Layout>
  )
}

export default ArtistProfile

export const pageQuery = graphql`
  ## Query for ArtistProfile data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ArtistProfile($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        url
        title
        template
        subtitle
        date
        excerpt
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`


