import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const ReportsSlice = createSlice({
    name: 'reports',
    initialState: {
        reports: [],
      
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        requestFetchReports(state, action) {
            return {
                reports: [],
              
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchReportsSuccess(state, action) {
            return {
                reports: action.payload,
              
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchReportsError(state) {
            return {
                reports: [],
              
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
    }
})

export const getGeneralReportThunk = (school_id) => dispatch => {
    dispatch(requestFetchReports())
    axios.get(`http://localhost:4000/reports/generalReport/${school_id}`)
        .then(res => {dispatch(fetchReportsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchReportsError(error.response?.data))
            }
        })
};

export const getMenor5ReportThunk = (school_id) => dispatch => {
    dispatch(requestFetchReports())
    axios.get(`http://localhost:4000/reports/menorFiveReport/${school_id}`)
        .then(res => {dispatch(fetchReportsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchReportsError(error.response?.data))
            }
        })
};

export const getBreakFastReportThunk = (school_id) => dispatch => {
    dispatch(requestFetchReports())
    axios.get(`http://localhost:4000/reports/reportBreakFast/${school_id}`)
        .then(res => {dispatch(fetchReportsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchReportsError(error.response?.data))
            }
        })
};

export const getLunchReportThunk = (school_id) => dispatch => {
    dispatch(requestFetchReports())
    axios.get(`http://localhost:4000/reports/reportLunches/${school_id}`)
        .then(res => {dispatch(fetchReportsSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchReportsError(error.response?.data))
            }
        })
};



export const { 
    requestFetchReports,
    fetchReportsSuccess,
    fetchReportsError,
 } = ReportsSlice.actions;

export default ReportsSlice.reducer;