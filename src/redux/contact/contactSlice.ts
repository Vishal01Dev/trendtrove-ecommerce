import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form';
import { queryHandler } from './contactApi';

const initialState = {
    status: 'idle' as 'loading' | 'idle'
}

export const queryHandlerAsync = createAsyncThunk(
    'contact/add',
    async (data: FieldValues) => {
        const response = await queryHandler(data)
        return response
    }
)

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(queryHandlerAsync.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(queryHandlerAsync.fulfilled,(state)=>{
            state.status = 'idle'
        })
    },
});



export default contactSlice.reducer