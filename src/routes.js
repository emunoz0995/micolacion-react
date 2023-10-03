
import ChooseSchool from "./containers/registros/ChooseSchool";
//Services
import ServiceForm from "./containers/catalogo/service/ServiceForm";
import ServiceList from "./containers/catalogo/service/ServiceList";
//School
import SchoolForm from "./containers/catalogo/school/SchoolForm";
import SchoolList from "./containers/catalogo/school/SchoolList";
//Sections
import SectionForm from "./containers/catalogo/section/SectionForm";
import SectionList from "./containers/catalogo/section/SectionList";
//Client
import ClientList from "./containers/catalogo/client/ClientList";
import ClientForm from "./containers/catalogo/client/ClientForm";
//Users
import UserList from "./containers/catalogo/user/UserList";
import UserForm from "./containers/catalogo/user/UserForm";
//Reports
import GeneralReportList from "./containers/reports/GeneralReport";
//Refrigerios BM
import RefrigerioBM from "./containers/lcv/refrigerios/RefrigerioBM";
import RefrigerioBE from "./containers/lcv/refrigerios/RefrigerioBE";
import RefrigerioEventuales from "./containers/lcv/refrigerios/RefrigerioEventuales";
import RefrigerioBS from "./containers/lcv/refrigerios/RefrigerioBS";
import RefrigerioPersonal from "./containers/lcv/refrigerios/RefrigerioPersonal";
import RefrigerioProcesados from "./containers/lcv/refrigerios/RefrigerioProcesados";
//Almuerzos BM
import AlmuerzoBM from "./containers/lcv/almuerzos/AlmuerzoBM";
import AlmuerzoBE from "./containers/lcv/almuerzos/AlmuerzoBE";
import AlmuerzoEventuales from "./containers/lcv/almuerzos/AlmuerzoEventuales";
import AlmuerzoBS from "./containers/lcv/almuerzos/AlmuerzoBS";
import AlmuerzoPersonal from "./containers/lcv/almuerzos/AlmuerzoPersonal";
import AlmuerzoProcesados from "./containers/lcv/almuerzos/AlmuerzoProcesados";


const routes = [
  // Registros
  {
    path: "/",
    component: ChooseSchool,
  },

  //Services
  {
    path: "/services",
    component: ServiceList,
  },
  {
    path: "/services_new",
    component: ServiceForm,
  },
  {
    path: "/services/:services_id",
    component: ServiceForm,
  },
   //Sections
   {
    path: "/sections",
    component: SectionList,
  },
  {
    path: "/sections_new",
    component: SectionForm,
  },
  {
    path: "/sections/:sections_id",
    component: SectionForm,
  },
  //Schools
  {
    path: "/schools",
    component: SchoolList,
  },
  {
    path: "/schools_new",
    component: SchoolForm,
  },
  {
    path: "/schools/:schools_id",
    component: SchoolForm,
  },
  //Refrigerios LCV
  {
    path: "/schools/:school_id/refrigerios_bm",
    component: RefrigerioBM,
  },
  {
    path: "/schools/:school_id/refrigerios_be",
    component: RefrigerioBE,
  },
  {
    path: "/schools/:school_id/refrigerios_bs_bgu",
    component: RefrigerioBS,
  },
  {
    path: "/schools/:school_id/refrigerios_eventuales",
    component: RefrigerioEventuales,
  },
  {
    path: "/schools/:school_id/refrigerios_personal",
    component: RefrigerioPersonal,
  },
  {
    path: "/schools/:school_id/refrigerios_procesados",
    component: RefrigerioProcesados,
  },
  //Almuerzos LCV
  {
    path: "/schools/:school_id/almuerzos_bm",
    component: AlmuerzoBM,
  },
  {
    path: "/schools/:school_id/almuerzos_be",
    component: AlmuerzoBE,
  },
  {
    path: "/schools/:school_id/almuerzos_bs_bgu",
    component: AlmuerzoBS,
  },
  {
    path: "/schools/:school_id/almuerzos_eventuales",
    component: AlmuerzoEventuales,
  },
  {
    path: "/schools/:school_id/almuerzos_personal",
    component: AlmuerzoPersonal,
  },
  {
    path: "/schools/:school_id/almuerzos_procesados",
    component: AlmuerzoProcesados,
  },

  //Clients
  {
    path: "/schools/:school_id/clients",
    component: ClientList,
  },
  {
    path: "/schools/:school_id/clients_new",
    component: ClientForm,
  },
  {
    path: "/schools/:school_id/clients/:client_id",
    component: ClientForm,
  },

  //Users
  {
    path: "/users",
    component: UserList,
  },
  {
    path: "/users_new",
    component: UserForm,
  },
  {
    path: "/users/:user_id",
    component: UserForm,
  },
  //reports
  {
    path: "/schools/:school_id/general_report",
    component: GeneralReportList,
  },
 
];

export default routes;
