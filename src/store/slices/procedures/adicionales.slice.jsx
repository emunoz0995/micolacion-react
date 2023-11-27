import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const adicionalProcedureSlice = createSlice({
    name: 'adicionalProcedure',
    initialState: {
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestUpdateTotal(state, action) {
            return {
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateTotalSuccess(state, action) {
            return {
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateTotalError(state, action) {
            return {
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})



export const decrementAditionalThunk = (id) => dispatch => {
    dispatch(requestUpdateTotal())
    axios.put(`/api/procedures/decrement_adicional/${id}`)
    .then(res => {dispatch(updateTotalSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalError(error.response?.data))
        }
    })
};


export const revertAditionalThunk = (id) => dispatch => {
    dispatch(requestUpdateTotal())
    axios.put(`/api/procedures/revert_adicional/${id}`)
    .then(res => {dispatch(updateTotalSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalError(error.response?.data))
        }
    })
};


export const { 
    requestUpdateTotal,
    updateTotalSuccess,
    updateTotalError,
     } = adicionalProcedureSlice.actions;

export default adicionalProcedureSlice.reducer;