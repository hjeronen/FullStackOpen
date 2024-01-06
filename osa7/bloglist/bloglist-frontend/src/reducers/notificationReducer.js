const notificationReducer = (state = { type: '', message: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state = {
        type: action.payload.type,
        message: action.payload.message,
      }
      return state
    case 'CLEAR_NOTIFICATION':
      state = {
        type: '',
        message: '',
      }
      return state
    default:
      return state
  }
}

export const setNotification = (type, message) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      type,
      message,
    },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
