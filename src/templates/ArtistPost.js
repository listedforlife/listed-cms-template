import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './ArtistPost.css'

export const ArtistPostTemplate = ({
  title,
  date,
  body,
  upcomingshows,
  nextPostURL,
  atURL,
  prevPostURL,
  categories = [],
}) => (
  <main>
    <article
      className="ArtistPost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="ArtistPost--BackButton" to="/artists/">
          <ChevronLeft /> BACKasd
        </Link>
        <div className="ArtistPost--Content relative">
          <div className="ArtistPost--Meta">
            {date && (
              <time
                className="ArtistPost--Meta--Date"
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
                    className="ArtistPost--Meta--Category"
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
            <h1 className="ArtistPost--Title" itemProp="title">
              {title}
            </h1>
          )}
        

{atURL && (
            <h1 style={{color:'white'}}>
              {atURL}
            </h1>
          )}

          <div className="ArtistPost--InnerContent">
            <Content source={body} />
          </div>

          <div className="ArtistPost--Pagination">
            {prevPostURL && (
              <Link
                className="ArtistPost--Pagination--Link prev"
                to={prevPostURL}
              >
              
                Previous Post
              </Link>
              
            )}
            
            {nextPostURL && (
              <Link
                className="ArtistPost--Pagination--Link next"
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

// Export Default ArtistPost for front-end
const ArtistPost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.url || false}
      atURL={post.frontmatter.url || false}
    >
                  
      <ArtistPostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <button  onClick={post.frontmatter.excerpt}>downlohhad link</button>
      <a>{post.frontmatter.url}</a>
    </Layout>
  )
}

export default ArtistPost

export const pageQuery = graphql`
  ## Query for ArtistPost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ArtistPost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        excerpt
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "artists" } } }
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
