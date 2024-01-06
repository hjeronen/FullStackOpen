import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { setBlogs, addBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = [...useSelector((state) => state.blogs)]
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const currentUser = JSON.parse(loggedUser)
      dispatch(setUser(currentUser))
      blogService.setToken(currentUser.token)
    }
  }, [])

  const showSuccessNotification = (message) => {
    dispatch(setNotification({ type: 'success', message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const showError = (message) => {
    dispatch(setNotification({ type: 'error', message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('user')
    dispatch(removeUser())
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
      dispatch(setBlogs(newBlogList))
    } catch (exception) {
      showError(exception)
    }
  }

  const deleteBlog = async (deletedBlog) => {
    if (confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}?`)) {
      try {
        await blogService.deleteBlog(deletedBlog)
        dispatch(setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id)))
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
      dispatch(addBlog(createdBlog))
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
