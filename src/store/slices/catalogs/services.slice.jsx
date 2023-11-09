import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        service: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateService(state) {
            return {
                services: [],
                service: {},
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
                service: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchServicesSuccess(state, action) {
            return {
                services: action.payload,
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchServicesError(state) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchService(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchServiceSuccess(state, action) {
            return {
                services: [],
                service: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchServiceError(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateService(state, action) {
            return {
                services: [],
                service: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createServiceSuccess(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createServiceError(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateService(state, action) {
            return {
                services: [],
                service: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateServiceSuccess(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateServiceError(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteService(state, action) {
            return {
                services: [],
                service: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteServiceSuccess(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteServiceError(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninService(state, action) {
            return {
                services: [],
                service: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinServiceSuccess(state, action) {
            return {
                services: [],
                service: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinServiceError(state, action) {
            return {
                services: [],
                service: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getServicesThunk = () => dispatch => {
    dispatch(requestFetchServices())
    axios.get(`/api/services`)
        .then(res => {dispatch(fetchServicesSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchServicesError(error.response?.data))
            }
        })
};

export const getServicesBySchoolThunk = (school_id) => dispatch => {
    dispatch(requestFetchServices())
    axios.get(`/api/services/${school_id}`)
        .then(res => {dispatch(fetchServicesSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchServicesError(error.response?.data))
            }
        })
};

export const getServicesExtrasThunk = () => dispatch => {
    dispatch(requestFetchServices())
    axios.get(`/api/services/service/extras`)
        .then(res => {dispatch(fetchServicesSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchServicesError(error.response?.data))
            }
        })
};


export const getServiceThunk = (services_id) => dispatch => {
    dispatch(requestFetchService());
    axios.get(`/api/services/service/${services_id}`)
    .then(res => {dispatch(fetchServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchServiceError(error.response?.data))
        }
    })
};

export const createServiceThunk = (data) => dispatch => {
    dispatch(requestCreateService())
    axios.post(`/api/services/service`, data)
    .then(res => {dispatch(createServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createServiceError(error.response?.data))
        }
    })
};


export const updateServiceThunk = (service_id, data) => dispatch => {
    dispatch(requestUpdateService())
    axios.put(`/api/services/service/${service_id}`, data)
    .then(res => {dispatch(updateServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateServiceError(error.response?.data))
        }
    })
};


export const deleteServiceThunk = (service_id) => dispatch => {
    dispatch(requestDeleteService())
    axios.delete(`/api/services/service/${service_id}`)
    .then(res => {dispatch(deleteServiceSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteServiceError(error.response?.data))
        }
    })
};

export const { initialStateService,
    requestFetchServices,
    fetchServicesSuccess,
    fetchServicesError,
    requestFetchService,
    fetchServiceSuccess,
    fetchServiceError,
    requestCreateService,
    createServiceSuccess,
    createServiceError,
    requestUpdateService,
    updateServiceSuccess,
    updateServiceError,
    requestDeleteService,
    deleteServiceSuccess,
    deleteServiceError,
    requestSigninService,
    signinServiceSuccess,
    signinServiceError } = servicesSlice.actions;

export default servicesSlice.reducer;