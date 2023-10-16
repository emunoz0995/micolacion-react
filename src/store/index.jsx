import { configureStore } from '@reduxjs/toolkit';
//CATALOGS
import users from './slices/catalogs/users.slice';
import clients from './slices/catalogs/clients.slice';
import services from './slices/catalogs/services.slice';
import schools from './slices/catalogs/schools.slice';
import sections from './slices/catalogs/sections.slice';
import refrigeriosLcv from './slices/registers/refrigeriosLcv.slice';
import reports from './slices/reports/reports.slice';
import almuerzosLcv from './slices/registers/almuerzosLcv.slice';
import refrigeriosProcedure from './slices/procedures/refrigerios.slice';
import funtions from './slices/procedures/funtions.slice';
import facturations from "./slices/facturation/facturation.slice";
import isLoadingSlice from './slices/isLoading.slice';


export default configureStore({
  reducer: {
    users,
    clients,
    services,
    schools,
    sections,
    refrigeriosLcv,
    reports,
    refrigeriosProcedure,
    almuerzosLcv,
    funtions,
    facturations,
    isLoadingSlice
	}
})