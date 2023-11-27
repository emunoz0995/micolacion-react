import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        client: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateClient(state) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchClients(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchClientsSuccess(state, action) {
            return {
                clients: action.payload,
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchClientsError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchClient(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchClientSuccess(state, action) {
            return {
                clients: [],
                client: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchClientError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateClient(state, action) {
            return {
                clients: [],
                client: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createClientSuccess(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createClientError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateClient(state, action) {
            return {
                clients: [],
                client: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateClientSuccess(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateClientError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteClient(state, action) {
            return {
                clients: [],
                client: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteClientSuccess(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteClientError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninClient(state, action) {
            return {
                clients: [],
                client: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinClientSuccess(state, action) {
            return {
                clients: [],
                client: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinClientError(state, action) {
            return {
                clients: [],
                client: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getClientsThunk = (school_id) => dispatch => {
    dispatch(requestFetchClients())
    axios.get(`/api/clients/${school_id}`)
        .then(res => {dispatch(fetchClientsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchClientsError(error.response?.data))
            }
        })
};


export const getClientThunk = (client_id) => dispatch => {
    dispatch(requestFetchClient());
    axios.get(`/api/clients/client/${client_id}`)
    .then(res => {dispatch(fetchClientSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchClientError(error.response?.data))
        }
    })
};

export const createClientThunk = (data) => dispatch => {
    dispatch(requestCreateClient())
    axios.post(`/api/clients/client`, data)
    .then(res => {dispatch(createClientSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createClientError(error.response?.data))
        }
    })
};

export const createClientForUserThunk = (data) => dispatch => {
    dispatch(requestCreateClient())
    axios.post(`/api/clients/clientForUser`, data)
    .then(res => {dispatch(createClientSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createClientError(error.response?.data))
        }
    })
};


export const updateClientThunk = (client_id, data) => dispatch => {
    dispatch(requestUpdateClient())
    axios.put(`/api/clients/client/${client_id}`, data)
    .then(res => {dispatch(updateClientSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateClientError(error.response?.data))
        }
    })
};


export const deleteClientThunk = (client_id) => dispatch => {
    dispatch(requestDeleteClient())
    axios.delete(`/api/clients/client/${client_id}`)
    .then(res => {dispatch(deleteClientSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteClientError(error.response?.data))
        }
    })
};

export const { initialStateClient,
    requestFetchClients,
    fetchClientsSuccess,
    fetchClientsError,
    requestFetchClient,
    fetchClientSuccess,
    fetchClientError,
    requestCreateClient,
    createClientSuccess,
    createClientError,
    requestUpdateClient,
    updateClientSuccess,
    updateClientError,
    requestDeleteClient,
    deleteClientSuccess,
    deleteClientError,
    requestSigninClient,
    signinClientSuccess,
    signinClientError } = clientsSlice.actions;

export default clientsSlice.reducer;