import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const refrigeriosProcedureSlice = createSlice({
    name: 'refrigeriosProcedure',
    initialState: {
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestUpdateTotalBreakfast(state, action) {
            return {
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateTotalBreakfastSuccess(state, action) {
            return {
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateTotalBreakfastError(state, action) {
            return {
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})



export const decrementBreakFastThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalBreakfast())
    console.log(client_ci)
    axios.put(`http://localhost:3000/procedures/decrement_breackfast/${client_ci}`)
    .then(res => {dispatch(updateTotalBreakfastSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalBreakfastError(error.response?.data))
        }
    })
};

export const incrementBreakFastThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalBreakfast())
    console.log(client_ci)
    axios.put(`http://localhost:3000/procedures/increment_breackfast/${client_ci}`)
    .then(res => {dispatch(updateTotalBreakfastSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalBreakfastError(error.response?.data))
        }
    })
};

export const revertBreakFastThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalBreakfast())
    console.log(client_ci)
    axios.put(`http://localhost:3000/procedures/revert_breackfast/${client_ci}`)
    .then(res => {dispatch(updateTotalBreakfastSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalBreakfastError(error.response?.data))
        }
    })
};


export const { 
    requestUpdateTotalBreakfast,
    updateTotalBreakfastSuccess,
    updateTotalBreakfastError,
     } = refrigeriosProcedureSlice.actions;

export default refrigeriosProcedureSlice.reducer;