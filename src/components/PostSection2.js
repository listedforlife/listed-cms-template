import React from 'react'

import PostCard2 from '../components/PostCard2'
import './PostSection2.css'

class PostSection2 extends React.Component {
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
      <div className="PostSection2">
        {title && <h2 className="PostSection2--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection2--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard2 key={post.title + index} {...post} />
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

export default PostSection2
