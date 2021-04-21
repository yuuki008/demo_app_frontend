import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux'


export const getHeaderInfo = (ctx) => {
  const dispatch = useDispatch()
  const cookies = new Cookies(ctx.req && ctx.req.headers.cookie)
  const headerInfo = {
    'access-token': cookies.get('access-token'),
    client: cookies.get('client'),
    uid: cookies.get('uid'),
  }
  dispatch(authSlice.actions.headerInfo(headerInfo))
}

const authSlice:any = createSlice({
  name: 'auth',
  initialState: {
    // success: false,
    user: {
      info: {},
      sign_in: false,
    },
    headerInfo: {
      'access-token': "",
      client: '',
      uid: ''
    }
  },
  reducers: {
    signIn(state, action){
      state.user.sign_in = true
      state.user.info = action.payload
    },
    signOut(state){
      state.user.sign_in = false
      state.user.info = {}
    },
    headerInfo(state, action){
      state.headerInfo = action.payload
    }
  }
})

export const selectUser = (state) => state.user
export const { signIn, signOut, headerInfo} = authSlice.actions
export default authSlice.reducer