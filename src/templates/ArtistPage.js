import React from 'react'
import { graphql } from 'gatsby'
import Content from '../components/Content'
import Layout from '../components/Layout'
import ArtistSection from '../components/ArtistSection'
import { Location } from '@reach/router'
import qs from 'qs'


/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (artistProfiles, title, contentType) => {
  const isCategory = contentType === 'artistProfiles'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? artistProfiles.filter(byCategory) : artistProfiles
}

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  body,
  bio,
  featuredImage,
  artistProfiles = [],
  postCategories = [],
  enableSearch = true,
  contentType
}) => (

  <Location>

    {({ location }) => {
      let filteredPosts =
      artistProfiles && !!artistProfiles.length
          ? byCategory(byDate(artistProfiles), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Blog">
   

<section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>



          {!!artistProfiles.length && (
            <section className="section">
              <div className="container">
                <ArtistSection artistProfiles={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
    
  </Location>
  
)
const ArtistPage = ({ data: { page, artistProfiles } }) => (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
      
      >
  
      <DefaultPageTemplate
  
        {...page}
        {...page.fields}
        {...page.frontmatter}
        
        artistProfiles={artistProfiles.edges.map(post => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
  
      />
      <div style={{textAlign:'center'}}>
        
        <DefaultPageTemplate       body={page.html} 
        
  ></DefaultPageTemplate></div>
    </Layout>
)
export default ArtistPage

export const pageQuery = graphql`
## Query for artistPage data
## Use GraphiQL interface (http://localhost:8000/___graphql)
## $id is processed via gatsby-node.js
## query name must be unique to this file
query artistPage($id: String!) {

  page: markdownRemark(id: { eq: $id }) {
    ...Meta
    html
    fields {
      contentType
    }
    frontmatter {
      title
      bio
      excerpt
      template
      subtitle
      featuredImage
    }
  }

  artistProfiles: allMarkdownRemark(
    filter: { fields: { contentType: { eq: "artistProfiles" } } }
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date
          categories {
            category
          }
          featuredImage
        }
      }
    }
  }
  postCategories: allMarkdownRemark(
    filter: { fields: { contentType: { eq: "postCategories" } } }
    sort: { order: ASC, fields: [frontmatter___title] }
  ) {
    edges {
      node {
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

