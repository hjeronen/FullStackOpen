import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.length === 0) {
    return null
  }

  return (
    <div id={type} style={type === 'success' ? success : error}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
}

export default Notification
