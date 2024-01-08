import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user, addComment }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlog(updatedBlog, blog.user)
  }

  const postComment = async (event) => {
    event.preventDefault()

    const created = await addComment(blog, comment)
    if (created) setComment('')
  }

  return (
    <div className='blog'>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={like}>like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        <div>
          {blog.user.username === user.username ? (
            <button
              id='deleteButton'
              style={{ backgroundColor: '#349feb' }}
              onClick={() => deleteBlog(blog)}
            >
              delete
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <h3>Comments</h3>
        <form onSubmit={postComment}>
          <input
            type='text'
            value={comment}
            name='Comment'
            id='comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>add comment</button>
        </form>
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
