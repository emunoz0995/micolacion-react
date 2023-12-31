import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../../utils/getConfig';
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
        fetchSectionsError(state, action) {
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
    }
})

export const getSectionsThunk = () => dispatch => {
    dispatch(requestFetchSections())
    axios.get(`/api/sections`, getConfig())
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
    axios.get(`/api/sections/${school_id}`, getConfig())
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
    axios.get(`/api/sections/section/${section_id}`, getConfig())
    .then(res => {dispatch(fetchSectionSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchSectionError(error.response?.data))
        }
    })
};

export const createSectionThunk = (data) => dispatch => {
    dispatch(requestCreateSection())
    axios.post(`/api/sections/section`, data, getConfig())
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
    axios.put(`/api/sections/section/${section_id}`, data, getConfig())
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
    axios.delete(`/api/sections/section/${section_id}`, getConfig())
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
    } = sectionsSlice.actions;

export default sectionsSlice.reducer;