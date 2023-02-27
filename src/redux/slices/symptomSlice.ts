import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './../store';

export type SymptomItemType = {
    id: string,
    name: string,
    mark:number
}


interface SymptomSliceState {
    symptoms: SymptomItemType[]

}

const initialState: SymptomSliceState = {
    symptoms: [
        {
            id: '1',
            name: 'Температура',
            mark: -1
        },
        {
            id: '2',
            name: 'Боль головы',
            mark: -1
        },
        {
            id: '3',
            name: 'Кашель',
            mark: -1
        },
        {
            id: '4',
            name: 'Насморк',
            mark: -1
        },

     ]
}


const symptomSlice = createSlice({
     name: 'symptom',
     initialState,
     reducers: {
          changeIndicator(state,action){
            state.symptoms.map((obj) => {
                if(obj.id == action.payload.item.id){
                    obj.mark = action.payload.idLike
                }
            })   
          },
          updateSymptoms(state){
            state.symptoms.map((obj) => {
                    obj.mark = -1
            })   
          }

     }
})
export const selectSymptom = (state: RootState) => state.symptoms
export const { changeIndicator, updateSymptoms} = symptomSlice.actions;

export default symptomSlice.reducer;