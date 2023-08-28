import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('user')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login to the application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const renderBlogs = () => {
    return (
      <div>
        {blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const createdBlog = await blogService.create(newBlog)
      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const newBlogForm = () => {
    return (
      <form onSubmit={createNewBlog}>
        <h2>Create new blog</h2>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    )
  }

  const renderUser = () => {
    return (
      <div>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        {newBlogForm()}
        {renderBlogs()}
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      {user
        ? renderUser()
        : loginForm()
      }
    </div>
  )
}

export default App