import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { current: null, all: null },
  reducers: {
    setUser(state, action) {
      return { ...state, current: action.payload }
    },
    setAllUsers(state, action) {
      return { ...state, all: action.payload }
    },
    removeUser(state, action) {
      return { ...state, current: null }
    },
  },
})

export const { setUser, setAllUsers, removeUser } = userSlice.actions
export default userSlice.reducer
