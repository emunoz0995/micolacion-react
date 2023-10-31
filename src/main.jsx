import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './localization/i18n';
import axios from 'axios';

import { API_BASE_URL } from './store/constans';

axios.defaults.baseURL = API_BASE_URL

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
);
