import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const funtionsSlice = createSlice({
    name: 'funtions',
    initialState: {
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateFuntions(state) {
            return {
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        requestUpdateService(state, action) {
            return {
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateServiceSuccess(state, action) {
            return {
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateServiceError(state, action) {
            return {
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})



export const renewServiceThunk = (client_ci, data) => dispatch => {
    dispatch(requestUpdateService())
    axios.put(`/api/procedures/renew_service/${client_ci}`, data)
    .then(res => {dispatch(updateServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const paidServiceThunk = (client_id,data) => dispatch => {
    dispatch(requestUpdateService())
    axios.put(`/api/procedures/paid_service/${client_id}`,data)
    .then(res => {dispatch(updateServiceSuccess(res.data.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const paidServiceProcessedThunk = (client_ci,data) => dispatch => {
    dispatch(requestUpdateService())
    axios.put(`/api/procedures/paidServiceFromProcessed/${client_ci}`,data)
    .then(res => {dispatch(updateServiceSuccess(res.data.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const startDayThunk = (school_id) => dispatch => {
    dispatch(requestUpdateService())
    axios.put(`/api/procedures/start_day/${school_id}`)
    .then(res => {dispatch(updateServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const registerExtrasThunk = (data) => dispatch => {
    dispatch(requestUpdateService())
    axios.post(`/api/procedures/register_serviceExtra`, data)
    .then(res => {dispatch(updateServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const registerAditionalThunk = (data) => dispatch => {
    dispatch(requestUpdateService())
    axios.post(`/api/procedures/register_serviceAditional`, data)
    .then(res => {dispatch(updateServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};

export const { 
    initialStateFuntions,
    requestUpdateService,
    updateServiceSuccess,
    updateServiceError,
     } = funtionsSlice.actions;

export default funtionsSlice.reducer;