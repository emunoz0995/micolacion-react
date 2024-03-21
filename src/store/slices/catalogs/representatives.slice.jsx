import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const representativesSlice = createSlice({
    name: 'representatives',
    initialState: {
        representatives: [],
        representative: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateRepresentative(state) {
            return {
                representatives: [],
                representative: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },

        requestFetchRepresentative(state, action) {
            return {
                representatives: [],
                representative: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchRepresentativeSuccess(state, action) {
            return {
                representatives: [],
                representative: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchRepresentativeError(state, action) {
            return {
                representatives: [],
                representative: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
    }
})

export const getRepresentativeThunk = (representative_id) => dispatch => {
    dispatch(requestFetchRepresentative());
    axios.get(`/api/representatives/representative/${representative_id}`)
        .then(res => {
            dispatch(fetchRepresentativeSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRepresentativeError(error.response?.data))
            }
        })
};


export const { initialStateRepresentative,
    requestFetchRepresentative,
    fetchRepresentativeSuccess,
    fetchRepresentativeError,
} = representativesSlice.actions;

export default representativesSlice.reducer;