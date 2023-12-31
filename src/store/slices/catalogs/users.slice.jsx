import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../../utils/getConfig';
import axios from 'axios';


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateUser(state) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchUsers(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchUsersSuccess(state, action) {
            return {
                users: action.payload,
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchUsersError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchUser(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchUserSuccess(state, action) {
            return {
                users: [],
                user: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createUserSuccess(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateUserSuccess(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteUserSuccess(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninUser(state, action) {
            return {
                users: [],
                user: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinUserSuccess(state, action) {
            return {
                users: [],
                user: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinUserError(state, action) {
            return {
                users: [],
                user: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getUsersThunk = () => dispatch => {
    dispatch(requestFetchUsers())
    axios.get(`/api/users`, getConfig())
        .then(res => {dispatch(fetchUsersSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchUsersError(error.response?.data))
            }
        })
};


export const getUserThunk = (user_id) => dispatch => {
    dispatch(requestFetchUser());
    axios.get(`/api/users/${user_id}`, getConfig())
    .then(res => {dispatch(fetchUserSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchUserError(error.response?.data))
        }
    })
};

export const createUserThunk = (data) => dispatch => {
    dispatch(requestCreateUser())
    axios.post(`/api/users/user`, data, getConfig())
    .then(res => {dispatch(createUserSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createUserError(error.response?.data))
        }
    })
};


export const updateUserThunk = (user_id, data) => dispatch => {
    dispatch(requestUpdateUser())
    axios.put(`/api/users/user/${user_id}`, data, getConfig())
    .then(res => {dispatch(updateUserSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateUserError(error.response?.data))
        }
    })
};


export const deleteUserThunk = (user_id) => dispatch => {
    dispatch(requestDeleteUser())
    axios.delete(`/api/users/user/${user_id}`, getConfig())
    .then(res => {dispatch(deleteUserSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteUserError(error.response?.data))
        }
    })
};

export const signInThunk = (data) => dispatch => {
    dispatch(requestSigninUser());
    axios.post('/api/users/login', data)
        .then(res => {
            dispatch(signinUserSuccess(res.data))
            let userInfo = {
                userName: `${res.data.firstName} ${res.data.lastName}`,
                accessToken: `${res.data.token}`,
                role: `${res.data.roleId}`,
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('token', res.data.token)
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(signinUserError(error.response?.data))
            }
        })
};


export const { initialStateUser,
    requestFetchUsers,
    fetchUsersSuccess,
    fetchUsersError,
    requestFetchUser,
    fetchUserSuccess,
    fetchUserError,
    requestCreateUser,
    createUserSuccess,
    createUserError,
    requestUpdateUser,
    updateUserSuccess,
    updateUserError,
    requestDeleteUser,
    deleteUserSuccess,
    deleteUserError,
    requestSigninUser,
    signinUserSuccess,
    signinUserError } = usersSlice.actions;

export default usersSlice.reducer;