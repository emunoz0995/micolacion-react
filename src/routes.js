
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
import GeneralReportForClient from "./containers/reports/GeneralReportForClient";
import MenorFiveReport from "./containers/reports/MenorFivelReport ";
import BreakFastReport from "./containers/reports/BreakFastReport ";
import LunchReport from "./containers/reports/LunchReport ";
//facturation
import ServicesReceivable from "./containers/facturation/ServicesReceivable";
import ServicesGenerateXML from "./containers/facturation/ServicesGenerateXML";
//Refrigerios LCV
import RefrigerioBM from "./containers/lcv/refrigerios/RefrigerioBM";
import RefrigerioBE from "./containers/lcv/refrigerios/RefrigerioBE";
import RefrigerioEventuales from "./containers/lcv/refrigerios/RefrigerioEventuales";
import RefrigerioBS from "./containers/lcv/refrigerios/RefrigerioBS";
import RefrigerioPersonal from "./containers/lcv/refrigerios/RefrigerioPersonal";
import RefrigerioProcesados from "./containers/lcv/refrigerios/RefrigerioProcesados";
//Almuerzos LCV
import AlmuerzoBM from "./containers/lcv/almuerzos/AlmuerzoBM";
import AlmuerzoBE from "./containers/lcv/almuerzos/AlmuerzoBE";
import AlmuerzoEventuales from "./containers/lcv/almuerzos/AlmuerzoEventuales";
import AlmuerzoBS from "./containers/lcv/almuerzos/AlmuerzoBS";
import AlmuerzoPersonal from "./containers/lcv/almuerzos/AlmuerzoPersonal";
import AlmuerzoProcesados from "./containers/lcv/almuerzos/AlmuerzoProcesados";
//Refrigerios CERVANTES
import RefrigerioPrimaria from "./containers/cervantes/refrigerios/RefrigerioPrimaria";
import RefrigerioInicial from "./containers/cervantes/refrigerios/RefrigerioInicial";
import RefrigerioEventualesCervantes from "./containers/cervantes/refrigerios/RefrigerioEventuales";
import RefrigerioSecundaria from "./containers/cervantes/refrigerios/RefrigerioSecundaria";
import RefrigerioProcesadosCervantes from "./containers/cervantes/refrigerios/RefrigerioProcesados";
//Almuerzos CERVANTES
import AlmuerzoPrimaria from "./containers/cervantes/almuerzos/AlmuerzoPrimaria";
import AlmuerzoInicial from "./containers/cervantes/almuerzos/AlmuerzoInicial";
import AlmuerzoEventualesCervantes from "./containers/cervantes/almuerzos/AlmuerzoEventuales";
import AlmuerzoSecundaria from "./containers/cervantes/almuerzos/AlmuerzoSecundaria";
import AlmuerzoProcesadosCervantes from "./containers/cervantes/almuerzos/AlmuerzoProcesados";


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


  //Refrigerios CERVANTES
  {
    path: "/schools/:school_id/refrigerios_primaria",
    component: RefrigerioPrimaria,
  },
  {
     path: "/schools/:school_id/refrigerios_inicial",
     component: RefrigerioInicial,
  },
  {
     path: "/schools/:school_id/refrigerios_secundaria",
     component: RefrigerioSecundaria,
  },
  {
     path: "/schools/:school_id/refrigerios_eventuales_cervantes",
     component: RefrigerioEventualesCervantes,
  },
  {
     path: "/schools/:school_id/refrigerios_procesados_cervantes",
     component: RefrigerioProcesadosCervantes,
  },
  //Almuerzos CERVANTES
  { 
     path: "/schools/:school_id/almuerzos_primaria",
     component: AlmuerzoPrimaria,
   },
   {
     path: "/schools/:school_id/almuerzos_inicial",
     component: AlmuerzoInicial,
   },
   {
     path: "/schools/:school_id/almuerzos_secundaria",
     component: AlmuerzoSecundaria,
   },
   {
     path: "/schools/:school_id/almuerzos_eventuales_cervantes",
     component: AlmuerzoEventualesCervantes,
   },
   {
     path: "/schools/:school_id/almuerzos_procesados_cervantes",
     component: AlmuerzoProcesadosCervantes,
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
  {
    path: "/schools/:school_id/general_report_client/:client_id",
    component: GeneralReportForClient,
  },
  {
    path: "/schools/:school_id/menor5_report",
    component: MenorFiveReport,
  },
  {
    path: "/schools/:school_id/breakFast_report",
    component: BreakFastReport,
  },
  {
    path: "/schools/:school_id/lunch_report",
    component: LunchReport,
  },
  //facturation
  {
    path: "/schools/:school_id/services_receivable",
    component: ServicesReceivable,
  },
  {
    path: "/schools/:school_id/services_generateXML",
    component: ServicesGenerateXML,
  },
 
];

export default routes;
