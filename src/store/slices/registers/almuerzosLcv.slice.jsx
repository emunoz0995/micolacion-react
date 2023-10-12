import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const almuerzosLcvSlice = createSlice({
    name: 'almuerzosLcv',
    initialState: {
        almuerzos: [],
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestFetchAlmuerzos(state, action) {
            return {
                almuerzos: [],
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchAlmuerzosSuccess(state, action) {
            return {
                almuerzos: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchAlmuerzosError(state) {
            return {
                almuerzos: [],
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getAlmuerzosBMThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_bm/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};
export const getAlmuerzosBEThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_be/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};
export const getAlmuerzosBSThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_bs/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};
export const getAlmuerzosEventualesThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_eventuales/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};
export const getAlmuerzosPersonalThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_personal/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};
export const getAlmuerzosProcesadosThunk = (school_id) => dispatch => {
    dispatch(requestFetchAlmuerzos())
    axios.get(`http://system.micolacion.com:3000/almuerzos_lcv/lunch_procesados/${school_id}`)
        .then(res => {dispatch(fetchAlmuerzosSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchAlmuerzosError(error.response?.data))
            }
        })
};

export const { 
    requestFetchAlmuerzos,
    fetchAlmuerzosSuccess,
    fetchAlmuerzosError } = almuerzosLcvSlice.actions;

export default almuerzosLcvSlice.reducer;