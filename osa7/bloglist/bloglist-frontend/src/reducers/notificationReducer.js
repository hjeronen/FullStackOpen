import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = {
        type: action.payload.type,
        message: action.payload.message,
      }
      return state
    },
    clearNotification(state, action) {
      state = initialState
      return state
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
