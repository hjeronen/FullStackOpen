import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const notification = useSelector((state) => state)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessNotification = (message) => {
    dispatch(setNotification('success', message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const showError = (exception) => {
    dispatch(setNotification('error', exception))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError(exception)
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
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='loginButton' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  const updateBlog = async (updatedBlog, blogUser) => {
    try {
      const newBlog = await blogService.update(updatedBlog)
      newBlog.user = blogUser
      const newBlogList = blogs
        .filter((blog) => blog.id !== newBlog.id)
        .concat(newBlog)
      setBlogs(newBlogList)
    } catch (exception) {
      showError(exception)
    }
  }

  const deleteBlog = async (deletedBlog) => {
    if (confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}?`)) {
      try {
        await blogService.deleteBlog(deletedBlog)
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
        showSuccessNotification('Blog deleted')
      } catch (exception) {
        showError(exception)
      }
    }
  }

  const renderBlogs = () => {
    return (
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    )
  }

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      const blogUser = { ...user, id: createdBlog.user }
      createdBlog.user = blogUser
      setBlogs(blogs.concat(createdBlog))
      showSuccessNotification(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      blogFormRef.current.toggleVisibility()
      return true
    } catch (exception) {
      showError(exception)
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
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm createBlog={addNewBlog} />
        </Togglable>
        {renderBlogs()}
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification type={notification.type} message={notification.message} />
      {user ? renderUser() : loginForm()}
    </div>
  )
}

export default App
