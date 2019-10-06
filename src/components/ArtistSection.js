import React from 'react'

import ArtistCard from '../components/ArtistCard'
import './ArtistSection.css'

class ArtistSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      <div className="ArtistSection">
                 hjhj
        {title && <h2 className="ArtistSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="ArtistSection--Grid">
            {visiblePosts.map((post, index) => (
              <ArtistCard key={post.title + index} {...post} />
            ))}
   
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ArtistSection
