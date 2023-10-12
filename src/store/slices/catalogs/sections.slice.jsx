import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: {
        sections: [],
        section: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateSection(state) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchSections(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchSectionsSuccess(state, action) {
            return {
                sections: action.payload,
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchSectionsError(state) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchSection(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchSectionSuccess(state, action) {
            return {
                sections: [],
                section: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchSectionError(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateSection(state, action) {
            return {
                sections: [],
                section: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createSectionSuccess(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createSectionError(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateSection(state, action) {
            return {
                sections: [],
                section: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateSectionSuccess(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateSectionError(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteSection(state, action) {
            return {
                sections: [],
                section: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteSectionSuccess(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteSectionError(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninSection(state, action) {
            return {
                sections: [],
                section: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinSectionSuccess(state, action) {
            return {
                sections: [],
                section: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinSectionError(state, action) {
            return {
                sections: [],
                section: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getSectionsThunk = () => dispatch => {
    dispatch(requestFetchSections())
    axios.get(`https://system.micolacion.com/api/sections`)
        .then(res => {dispatch(fetchSectionsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchSectionsError(error.response?.data))
            }
        })
};

export const getSectionsBySchoolThunk = (school_id) => dispatch => {
    dispatch(requestFetchSections())
    axios.get(`https://system.micolacion.com/api/sections/${school_id}`)
        .then(res => {dispatch(fetchSectionsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchSectionsError(error.response?.data))
            }
        })
};


export const getSectionThunk = (section_id) => dispatch => {
    dispatch(requestFetchSection());
    axios.get(`https://system.micolacion.com/api/sections/section/${section_id}`)
    .then(res => {dispatch(fetchSectionSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchSectionError(error.response?.data))
        }
    })
};

export const createSectionThunk = (data) => dispatch => {
    console.log(data)
    dispatch(requestCreateSection())
    axios.post(`https://system.micolacion.com/api/sections/section`, data)
    .then(res => {dispatch(createSectionSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createSectionError(error.response?.data))
        }
    })
};


export const updateSectionThunk = (section_id, data) => dispatch => {
    dispatch(requestUpdateSection())
    axios.put(`https://system.micolacion.com/api/sections/section/${section_id}`, data)
    .then(res => {dispatch(updateSectionSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateSectionError(error.response?.data))
        }
    })
};


export const deleteSectionThunk = (section_id) => dispatch => {
    dispatch(requestDeleteSection())
    axios.delete(`https://system.micolacion.com/api/sections/section/${section_id}`)
    .then(res => {dispatch(deleteSectionSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteSectionError(error.response?.data))
        }
    })
};

export const { initialStateSection,
    requestFetchSections,
    fetchSectionsSuccess,
    fetchSectionsError,
    requestFetchSection,
    fetchSectionSuccess,
    fetchSectionError,
    requestCreateSection,
    createSectionSuccess,
    createSectionError,
    requestUpdateSection,
    updateSectionSuccess,
    updateSectionError,
    requestDeleteSection,
    deleteSectionSuccess,
    deleteSectionError,
    requestSigninSection,
    signinSectionSuccess,
    signinSectionError } = sectionsSlice.actions;

export default sectionsSlice.reducer;