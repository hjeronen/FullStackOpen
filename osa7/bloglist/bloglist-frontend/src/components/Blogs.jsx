import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs, addNewBlog, blogFormRef }) => {
  if (!blogs) {
    return null
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`} className='link'>
                    {blog.title} {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
