import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './../store';
import { getRecordArchive } from '../../api';
import { RecordItemType } from './recordSlice';



interface RecordSliceState {
     items: RecordItemType[],
     status:string
}



const initialState: RecordSliceState = {
     items: [],
     status:''
}


const archiveRecordSlice = createSlice({
     name: 'archiveRecord',
     initialState,
     reducers: {
     },
     extraReducers: (builder) => {
          builder.addCase(getRecordArchive.pending, (state) => {
               state.status = "LOADING";
               state.items = []
          })
          builder.addCase(getRecordArchive.fulfilled, (state, action) => {
               state.items = action.payload
               state.status = "SUCCESS"
          })
          builder.addCase(getRecordArchive.rejected, (state) => {
               state.status = 'ERROR'
               state.items = []
          })
     }
})
export const selectArchiveRecord = (state: RootState) => state.archiveRecord
export const selectArchiveRecordById  = (id: string) => (state: RootState) => state.archiveRecord.items.find((item) => item.id == id)
export const {} = archiveRecordSlice.actions;

export default archiveRecordSlice.reducer;