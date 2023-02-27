import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLs } from 'utils/getUserFromLS';
import { RootState } from './../store';



interface UserSliceState {
     email: string;
     id: string;
}
const userData = getUserFromLs()

const initialState: UserSliceState = {
     email: userData.email,
     id: userData.id
}


const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
          setUser(state, action) {
               state.email = action.payload.email;
               state.id = action.payload.id;
          },
          removeUser(state) {
               state.email = '';
               state.id = '';
          },

     }
})
export const selectUser = (state: RootState) => state.user
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;