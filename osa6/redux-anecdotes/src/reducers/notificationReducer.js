import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
    dispatch(showNotification(message))
  }
}
export default notificationSlice.reducer
