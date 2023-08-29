import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', message: null })

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
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

  const showNotification = (type, message) => {
    setNotification({ type: type, message: message })
    setTimeout(() => {
      setNotification({ type: '', message: null })
    }, 3000)
  }

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
      showNotification(
        'error',
        `Error: ${exception.response.data.error}`
      )
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

  const updateBlog = async (updatedBlog) => {
    try {
      const newBlog = await blogService.update(updatedBlog)
      newBlog.user = user
      const oldBlogList = blogs.filter(blog => blog.id !== newBlog.id)
      const newBlogList = oldBlogList.concat(newBlog)
      newBlogList.sort((a, b) =>
        a.id > b.id
          ? 1
          : (a.id < b.id ? -1 : 0)
      )
      setBlogs(newBlogList)
    } catch (exception) {
      showNotification(
        'error',
        `Error: ${exception.response.data.error}`
      )
    }
  }

  const renderBlogs = () => {
    return (
      <div>
        {blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
            />
          )}
      </div>
    )
  }

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      const blogUser = {...user, id: createdBlog.user}
      createdBlog.user = blogUser
      setBlogs(blogs.concat(createdBlog))
      showNotification(
        'success',
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      return true
    } catch (exception) {
      showNotification(
        'error',
        `Error: ${exception.response.data.error}`
      )
      return false
    }
  }

  const renderUser = () => {
    return (
      <div>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <Togglable
          buttonLabel={'new blog'}
          addNewBlog={addNewBlog}
        />
        {renderBlogs()}
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification
        type={notification.type}
        message={notification.message}
      />
      {user
        ? renderUser()
        : loginForm()
      }
    </div>
  )
}

export default App
