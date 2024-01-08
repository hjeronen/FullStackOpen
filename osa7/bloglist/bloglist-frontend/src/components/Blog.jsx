import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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
