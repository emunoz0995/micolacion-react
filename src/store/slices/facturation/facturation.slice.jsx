import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const FacturationsSlice = createSlice({
    name: 'facturations',
    initialState: {
        facturations: [],
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestFetchFacturations(state, action) {
            return {
                facturations: [],
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchFacturationsSuccess(state, action) {
            return {
                facturations: action.payload,  
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchFacturationsError(state) {
            return {
                facturations: [],
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
    }
})

export const getServicesReceivableThunk = (school_id) => dispatch => {
    dispatch(requestFetchFacturations())
    console.log(school_id)
    axios.get(`https://system.micolacion.com/api/facturations/services_receivable/${school_id}`)
        .then(res => {dispatch(fetchFacturationsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchFacturationsError(error.response?.data))
            }
        })
};

export const getServiceGenereteXMLThunk = (school_id) => dispatch => {
    dispatch(requestFetchFacturations())
    axios.get(`https://system.micolacion.com/api/facturations/services_generateXML/${school_id}`)
        .then(res => {dispatch(fetchFacturationsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchFacturationsError(error.response?.data))
            }
        })
};

export const getHistoryThunk = (cliente_ci) => dispatch => {
    dispatch(requestFetchFacturations())
    axios.get(`https://system.micolacion.com/api/facturations/history/${cliente_ci}`)
        .then(res => {dispatch(fetchFacturationsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchFacturationsError(error.response?.data))
            }
        })
};



export const { 
    requestFetchFacturations,
    fetchFacturationsSuccess,
    fetchFacturationsError,
 } = FacturationsSlice.actions;

export default FacturationsSlice.reducer;