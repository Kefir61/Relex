import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './../store';
import { SymptomItemType } from './symptomSlice';
import { getRecord } from '../../api';

export type RecordItemType = {
     id: string,
     lastName: string,
     firstName: string,
     phoneNumber: string,
     email?: string,
     complaints: string,
     complaintTextArea?: string,
     symptoms: SymptomItemType[],
     desiredDate:string,
     recordingDate: string,
     status: ''
}


interface RecordSliceState {
     items: RecordItemType[],
     status:string
}



const initialState: RecordSliceState = {
     items: [],
     status:''
}


const recordSlice = createSlice({
     name: 'record',
     initialState,
     reducers: {
          minusRecord(state,action){
               let newItems: RecordItemType[] = []
               state.items.map((item) => {
                    if(item.id!=action.payload){
                         newItems.push(item)
                    }
               })
               state.items = newItems
          },

     },
     extraReducers: (builder) => {
          builder.addCase(getRecord.pending, (state) => {
               state.status = "LOADING";
               state.items = []
          })
          builder.addCase(getRecord.fulfilled, (state, action) => {
               state.items = action.payload
               state.status = "SUCCESS"
          })
          builder.addCase(getRecord.rejected, (state) => {
               state.status = 'ERROR'
               state.items = []
          })
     }
})
export const selectRecord = (state: RootState) => state.record
export const selectRecordById  = (id: string) => (state: RootState) => state.record.items.find((item) => item.id == id)
export const { minusRecord} = recordSlice.actions;

export default recordSlice.reducer;