import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../../utils/getConfig';
import axios from 'axios';

export const servicesSlice = createSlice({
    name: 'aditionalServices',
    initialState: {
        services: [],
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateService(state) {
            return {
                services: [],
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchServices(state, action) {
            return {
                services: [],
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchServicesSuccess(state, action) {
            return {
                services: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchServicesError(state, action) {
            return {
                services: [],
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
    }
})

export const getAditionalServicesBySchoolThunk = (school_id) => dispatch => {
    dispatch(requestFetchServices())
    axios.get(`/api/services/aditionalServices/${school_id}`, getConfig())
        .then(res => {dispatch(fetchServicesSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchServicesError(error.response?.data))
            }
        })
};


export const { initialStateService,
    requestFetchServices,
    fetchServicesSuccess,
    fetchServicesError,
     } = servicesSlice.actions;

export default servicesSlice.reducer;