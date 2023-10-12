import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const almuerzosProcedureSlice = createSlice({
    name: 'almuerzosProcedure',
    initialState: {
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestUpdateTotalLunch(state, action) {
            return {
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateTotalLunchSuccess(state, action) {
            return {
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateTotalLunchError(state, action) {
            return {
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})



export const decrementLunchThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalLunch())
    console.log(client_ci)
    axios.put(`http://system.micolacion.com:3000/procedures/decrement_lunch/${client_ci}`)
    .then(res => {dispatch(updateTotalLunchSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalLunchError(error.response?.data))
        }
    })
};

export const incrementLunchThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalLunch())
    console.log(client_ci)
    axios.put(`http://system.micolacion.com:3000/procedures/increment_lunch/${client_ci}`)
    .then(res => {dispatch(updateTotalLunchSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalLunchError(error.response?.data))
        }
    })
};

export const revertLunchThunk = (client_ci) => dispatch => {
    dispatch(requestUpdateTotalLunch())
    console.log(client_ci)
    axios.put(`http://system.micolacion.com:3000/procedures/revert_lunch/${client_ci}`)
    .then(res => {dispatch(updateTotalLunchSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateTotalLunchError(error.response?.data))
        }
    })
};


export const { 
    requestUpdateTotalLunch,
    updateTotalLunchSuccess,
    updateTotalLunchError,
     } = almuerzosProcedureSlice.actions;

export default almuerzosProcedureSlice.reducer;