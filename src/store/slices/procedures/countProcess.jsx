import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from '../isLoading.slice';
import axios from 'axios';

export const countProcessSlice = createSlice({
    name: 'countProcess',
    initialState: 0,
    reducers: {
        setCount(state,action) {
            return action.payload
        }
    }
})


export const countBreakFastProcessThunk = (school_id) => dispatch => {
    axios.get(`/api/procedures/countBreakfast_procesados/${school_id}`)
    .then(res => dispatch(setCount(res.data)))
};

export const countLunchProcessThunk = (school_id) => dispatch => {
    axios.get(`/api/procedures/countLuch_procesados/${school_id}`)
    .then(res => dispatch(setCount(res.data)))
};

export const countAdicionalProcessThunk = (school_id) => dispatch => {
    axios.get(`/api/procedures/countAdicional_procesados/${school_id}`)
    .then(res => dispatch(setCount(res.data)))
};


export const { 
    setCount,
     } = countProcessSlice.actions;

export default countProcessSlice.reducer;