import { configureStore } from '@reduxjs/toolkit';
//CATALOGS
import users from './slices/catalogs/users.slice';
import clients from './slices/catalogs/clients.slice';
import representatives from './slices/catalogs/representatives.slice';
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
import countProcess from './slices/procedures/countProcess';
import aditionalServices from './slices/catalogs/aditionalServices.slice';
import adicionalProcedure from './slices/procedures/adicionales.slice';


export default configureStore({
  reducer: {
    users,
    clients,
    representatives,
    services,
    schools,
    sections,
    refrigeriosLcv,
    reports,
    refrigeriosProcedure,
    almuerzosLcv,
    funtions,
    facturations,
    isLoadingSlice,
    countProcess,
    aditionalServices,
    adicionalProcedure
	}
})