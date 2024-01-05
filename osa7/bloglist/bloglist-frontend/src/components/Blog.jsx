import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(updatedBlog, blog.user)
  }

  return (
    <div
      className='blog'
      style={blogStyle}
      onClick={() => setExpanded(!expanded)}
    >
      <div>
        {blog.title} {blog.author} {' '}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded
        ?
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}
            <button onClick={like}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            {blog.user.username === user.username
              ? <button
                id='deleteButton'
                style={{ backgroundColor: '#349feb' }}
                onClick={() => deleteBlog(blog)}
              >
                delete
              </button>
              : <div></div>
            }
          </div>
        </div>
        :
        <div></div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog