import { useState } from 'react'
import BlogForm from './BlogForm'

const Togglable = ({ buttonLabel, addNewBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          createBlog={addNewBlog}
          toggle={toggleVisibility}
        />
        <button onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable
