import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const refrigeriosLcvSlice = createSlice({
    name: 'refrigeriosLcv',
    initialState: {
        refrigerios: [],
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestFetchRefrigerios(state, action) {
            return {
                refrigerios: [],
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchRefrigeriosSuccess(state, action) {
            return {
                refrigerios: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchRefrigeriosError(state) {
            return {
                refrigerios: [],
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getRefrigeriosBMThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_bm/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};
export const getRefrigeriosBEThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_be/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};
export const getRefrigeriosBSThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_bs/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};
export const getRefrigeriosEventualesThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_eventuales/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};
export const getRefrigeriosPersonalThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_personal/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};
export const getRefrigeriosProcesadosThunk = (school_id) => dispatch => {
    dispatch(requestFetchRefrigerios())
    axios.get(`http://44.197.107.144:4000/refrigerios_lcv/breakfast_procesados/${school_id}`)
        .then(res => {dispatch(fetchRefrigeriosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRefrigeriosError(error.response?.data))
            }
        })
};

export const { 
    requestFetchRefrigerios,
    fetchRefrigeriosSuccess,
    fetchRefrigeriosError } = refrigeriosLcvSlice.actions;

export default refrigeriosLcvSlice.reducer;