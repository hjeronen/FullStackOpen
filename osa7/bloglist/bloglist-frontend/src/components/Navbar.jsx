import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  const navbarStyle = {
    display: 'flex',
    backgroundColor: 'lightGray',
    padding: '5px',
  }

  const elementStyle = {
    paddingRight: '5px',
  }

  return (
    <div style={navbarStyle}>
      <Link style={elementStyle} to='/'>
        blogs
      </Link>
      <Link style={elementStyle} to='/users'>
        users
      </Link>
      <div style={elementStyle}>{user.name} logged in</div>
      <div style={elementStyle}>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
