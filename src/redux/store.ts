import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import symptomReduser from './slices/symptomSlice'
import recordReduser from './slices/recordSlice'
import archiveRecordReduser from './slices/archiveRecordSlice'
import userReduser from './slices/userSlice'

export const store = configureStore({
     reducer: {
          symptoms: symptomReduser,
          record: recordReduser,
          archiveRecord:archiveRecordReduser,
          user: userReduser
     },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store