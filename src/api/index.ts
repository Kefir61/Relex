import axios from 'axios';
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import { RecordItemType } from '../redux/slices/recordSlice';
import { SymptomItemType } from 'redux/slices/symptomSlice';

export type PostRecordType = {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    email: string;
    complaints: string;
    complaintTextArea: string;
    desiredDate: string;
    recordingDate: string;
    symptoms: SymptomItemType[];
    status: string;
}

export const postRecord = createAsyncThunk('postRecord/fetchPostRecordStatus', async (obj:PostRecordType) => {
    const {lastName, firstName, phoneNumber, email, complaints, complaintTextArea, symptoms, desiredDate, recordingDate, status} = obj
    await axios.post(`https://63f8cec86978b1f91061b941.mockapi.io/records`, {
         lastName,
         firstName,
         phoneNumber,
         email,
         complaints,
         complaintTextArea,
         symptoms,
         desiredDate,
         recordingDate,
         status
    })
})

export const getRecord = createAsyncThunk<RecordItemType[]>('getRecord/fetchRecordStatus', async () => {
    const { data } = await axios.get<RecordItemType[]>(`https://63f8cec86978b1f91061b941.mockapi.io/records?sortBy=recordingDate&order=desc`)
    return data;
})
export const getRecordArchive = createAsyncThunk<RecordItemType[]>('getRecordArchive/fetchRecordArchiveStatus', async () => {
    const { data } = await axios.get<RecordItemType[]>(`https://63f8cec86978b1f91061b941.mockapi.io/archive?sortBy=recordingDate&order=desc`)
    return data;
})

export const postRecordArchive = createAsyncThunk('postRecordArchive/fetchPostRecordArchiveStatus', async (params:PostRecordType) => {
    const {lastName, firstName, phoneNumber, email, complaints, complaintTextArea, symptoms, desiredDate, recordingDate, status} = params
    await axios.post(`https://63f8cec86978b1f91061b941.mockapi.io/archive`, {
         lastName,
         firstName,
         phoneNumber,
         email,
         complaints,
         complaintTextArea,
         symptoms,
         desiredDate,
         recordingDate,
         status
    })
})
export const deleteRecord = createAsyncThunk('deleteRecord/fetchStatus', async (params:string) => {
    const id = params
    await axios.delete(`https://63f8cec86978b1f91061b941.mockapi.io/records/${id}`)
})