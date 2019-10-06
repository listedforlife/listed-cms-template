import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost2.css'

export const SinglePostTemplate2 = ({
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
      className="SinglePost2 section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost2--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost2--Content relative">
          <div className="SinglePost2--Meta">
            {date && (
              <time
                className="SinglePost2--Meta--Date"
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
                    className="SinglePost2--Meta--Category"
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
            <h1 className="SinglePost2--Title" itemProp="title">
              {title}
            </h1>
          )}
        

{atURL && (
            <h1 style={{color:'white'}}>
              {atURL}
            </h1>
          )}

          <div className="SinglePost2--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost2--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost2--Pagination--Link prev"
                to={prevPostURL}
              >
              
                Previous Post
              </Link>
              
            )}
            
            {nextPostURL && (
              <Link
                className="SinglePost2--Pagination--Link next"
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
const SinglePost2 = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.url || false}
      atURL={post.frontmatter.url || false}
    >
                  
      <SinglePostTemplate2
        {...post}
        {...post.frontmatter}
        body={post.html}

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <button  onClick={post.frontmatter.excerpt}>download link</button>
      <a>{post.frontmatter.url}</a>
    </Layout>
  )
}

export default SinglePost2

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost2($id: String!) {
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
      filter: { fields: { contentType: { eq: "posts2" } } }
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
