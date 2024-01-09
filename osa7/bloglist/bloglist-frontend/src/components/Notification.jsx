import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Notification = ({ type, message }) => {
  if (!message) {
    return null
  }

  if (message.length === 0) {
    return null
  }

  return (
    <Alert id={type} variant={type === 'success' ? 'success' : 'danger'}>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
}

export default Notification
