import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const servicesSlice = createSlice({
    name: 'yards',
    initialState: {
        yards: [],
        yard: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateYard(state) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchYards(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchYardsSuccess(state, action) {
            return {
                yards: action.payload,
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchYardsError(state) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchYard(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchYardSuccess(state, action) {
            return {
                yards: [],
                yard: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchYardError(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateYard(state, action) {
            return {
                yards: [],
                yard: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createYardSuccess(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createYardError(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateYard(state, action) {
            return {
                yards: [],
                yard: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateYardSuccess(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateYardError(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteYard(state, action) {
            return {
                yards: [],
                yard: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteYardSuccess(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteYardError(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninYard(state, action) {
            return {
                yards: [],
                yard: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinYardSuccess(state, action) {
            return {
                yards: [],
                yard: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinYardError(state, action) {
            return {
                yards: [],
                yard: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getYardsThunk = () => dispatch => {
    dispatch(requestFetchYards())
    axios.get(`http://44.197.107.144:4000/yards`)
        .then(res => {dispatch(fetchYardsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchYardsError(error.response?.data))
            }
        })
};


export const getYardThunk = (yards_id) => dispatch => {
    dispatch(requestFetchYard());
    axios.get(`http://44.197.107.144:4000/yards/${yards_id}`)
    .then(res => {dispatch(fetchYardSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchYardError(error.response?.data))
        }
    })
};

export const createYardThunk = (data) => dispatch => {
    dispatch(requestCreateYard())
    axios.post(`http://44.197.107.144:4000/yards/yard`, data)
    .then(res => {dispatch(createYardSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createYardError(error.response?.data))
        }
    })
};


export const updateYardThunk = (yard_id, data) => dispatch => {
    dispatch(requestUpdateYard())
    axios.put(`http://44.197.107.144:4000/yards/yard/${yard_id}`, data)
    .then(res => {dispatch(updateYardSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateYardError(error.response?.data))
        }
    })
};


export const deleteYardThunk = (yard_id) => dispatch => {
    dispatch(requestDeleteYard())
    axios.delete(`http://44.197.107.144:4000/Yards/Yard/${yard_id}`)
    .then(res => {dispatch(deleteYardSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteYardError(error.response?.data))
        }
    })
};

export const { initialStateYard,
    requestFetchYards,
    fetchYardsSuccess,
    fetchYardsError,
    requestFetchYard,
    fetchYardSuccess,
    fetchYardError,
    requestCreateYard,
    createYardSuccess,
    createYardError,
    requestUpdateYard,
    updateYardSuccess,
    updateYardError,
    requestDeleteYard,
    deleteYardSuccess,
    deleteYardError,
    requestSigninYard,
    signinYardSuccess,
    signinYardError } = servicesSlice.actions;

export default servicesSlice.reducer;