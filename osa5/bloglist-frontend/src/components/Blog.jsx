import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

    updateBlog(updatedBlog)
  }

  return (
    <div
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
        </div>
        :
        <div></div>
      }
    </div>
  )
}

export default Blog