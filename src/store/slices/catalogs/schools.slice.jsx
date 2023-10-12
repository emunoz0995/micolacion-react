import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const schoolsSlice = createSlice({
    name: 'schools',
    initialState: {
        schools: [],
        school: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateSchool(state) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchSchools(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchSchoolsSuccess(state, action) {
            return {
                schools: action.payload,
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchSchoolsError(state) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchSchool(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchSchoolSuccess(state, action) {
            return {
                schools: [],
                school: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchSchoolError(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateSchool(state, action) {
            return {
                schools: [],
                school: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createSchoolSuccess(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createSchoolError(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateSchool(state, action) {
            return {
                schools: [],
                school: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateSchoolSuccess(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateSchoolError(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteSchool(state, action) {
            return {
                schools: [],
                school: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteSchoolSuccess(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteSchoolError(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninSchool(state, action) {
            return {
                schools: [],
                school: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinSchoolSuccess(state, action) {
            return {
                schools: [],
                school: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinSchoolError(state, action) {
            return {
                schools: [],
                school: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getSchoolsThunk = () => dispatch => {
    dispatch(requestFetchSchools())
    axios.get(`https://system.micolacion.com/api/schools`)
        .then(res => {dispatch(fetchSchoolsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchSchoolsError(error.response?.data))
            }
        })
};


export const getSchoolThunk = (schools_id) => dispatch => {
    dispatch(requestFetchSchool());
    axios.get(`https://system.micolacion.com/api/schools/${schools_id}`)
    .then(res => {dispatch(fetchSchoolSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchSchoolError(error.response?.data))
        }
    })
};

export const createSchoolThunk = (data) => dispatch => {
    console.log(data)
    dispatch(requestCreateSchool())
    axios.post(`https://system.micolacion.com/api/schools/school`, data)
    .then(res => {dispatch(createSchoolSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createSchoolError(error.response?.data))
        }
    })
};


export const updateSchoolThunk = (school_id, data) => dispatch => {
    dispatch(requestUpdateSchool())
    axios.put(`https://system.micolacion.com/api/schools/school/${school_id}`, data)
    .then(res => {dispatch(updateSchoolSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateSchoolError(error.response?.data))
        }
    })
};


export const deleteSchoolThunk = (school_id) => dispatch => {
    dispatch(requestDeleteSchool())
    axios.delete(`https://system.micolacion.com/api/schools/school/${school_id}`)
    .then(res => {dispatch(deleteSchoolSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteSchoolError(error.response?.data))
        }
    })
};

export const { initialStateSchool,
    requestFetchSchools,
    fetchSchoolsSuccess,
    fetchSchoolsError,
    requestFetchSchool,
    fetchSchoolSuccess,
    fetchSchoolError,
    requestCreateSchool,
    createSchoolSuccess,
    createSchoolError,
    requestUpdateSchool,
    updateSchoolSuccess,
    updateSchoolError,
    requestDeleteSchool,
    deleteSchoolSuccess,
    deleteSchoolError,
    requestSigninSchool,
    signinSchoolSuccess,
    signinSchoolError } = schoolsSlice.actions;

export default schoolsSlice.reducer;