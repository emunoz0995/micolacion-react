import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollapsed, useToolbarStore, useCollapsedRate } from '../../store/VitalStore';
import { useTranslation } from "react-i18next";
//UI
import lcv from '../../assets/Logo.png';
import cervantes from '../../assets/cervantes.png'
import BtnDashboard from '../buttons/BtnDashboard';
import { FaBook, FaDollarSign, FaFileExcel, FaReadme, FaSun, FaTree, FaUsers } from 'react-icons/fa';
import ReportsAccordion from '../accordions/ReportsAccordion';
import BtnContent from '../buttons/BtnContent';

const NavLeftSchool = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const school = JSON.parse(localStorage.getItem("schoolInfo"));
  const { isToolbarOpen, closeToolbar } = useToolbarStore((state) => state);

  const { isCollapsedRate, openCollapsedRates, closeCollapsedRates } = useCollapsedRate(
    (state) => state
  );

  return (
    <div
      className={`text-white overflow-y-scroll contenedor shadow-lg fixed top-0 bottom-0 shadow-black/30 md:translate-x-0 transition-all  w-60 bg-gradient-to-t from-[#051937] via-[#004d7a] to-[#008793] z-20 ${isToolbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-center m-auto gap-2 h-16 w-[90%] ">
        <img className="object-contain h-[80px] mt-8 mb-5" src={school?.name == "Liceo Campoverde" ? lcv : cervantes} alt="logo_school" />
      </div>
      <ul className=" flex flex-col h-full items-start justify-start w-[98%] mt-5 gap-3">
        <li
          onClick={(e) => { navigate('/'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/' || location.pathname === 'exit_list' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaReadme />
            <p>Inicio</p>
          </BtnDashboard>
        </li>
        <div className='w-full flex justify-center pl-2'>
          <BtnContent type="initDay">Iniciar Día</BtnContent>
        </div>
        <div className='pl-2 text-[10px] text-sky-200 mb-[-10px] border-b-[1px] border-gray-500 w-[90%]'>Servicios</div>
        <li
          onClick={(e) => { navigate(`/schools/${school?.id}/refrigerios_bm`); closeToolbar(); }}
          className={`w-full ${
            location.pathname === `/schools/${school?.id}/refrigerios_bm` ||
            location.pathname === `/schools/${school?.id}/refrigerios_be` ||
            location.pathname === `/schools/${school?.id}/refrigerios_bs_bgu` ||
            location.pathname === `/schools/${school?.id}/refrigerios_eventuales` ||
            location.pathname === `/schools/${school?.id}/refrigerios_personal` ||
            location.pathname === `/schools/${school?.id}/refrigerios_procesados`
            ? 'active' : ''}`}>
          <BtnDashboard>
            <FaSun />
            <p>Refrigerios</p>
          </BtnDashboard>
        </li>
        <li
          onClick={(e) => { navigate(`/schools/${school?.id}/almuerzos_bm`); closeToolbar(); }}
          className={`w-full ${location.pathname === `/schools/${school?.id}/almuerzos_bm` ||
            location.pathname === `/schools/${school?.id}/almuerzos_be` ||
            location.pathname === `/schools/${school?.id}/almuerzos_bs_bgu` ||
            location.pathname === `/schools/${school?.id}/almuerzos_eventuales` ||
            location.pathname === `/schools/${school?.id}/almuerzos_personal` ||
            location.pathname === `/schools/${school?.id}/almuerzos_procesados`
            ? 'active' : ''}`}>
          <BtnDashboard>
            <FaTree />
            <p>Almuerzos</p>
          </BtnDashboard>
        </li>
        <div className='pl-2 text-[10px] text-sky-200 mb-[-10px] border-b-[1px] border-gray-500 w-[90%]'>Administración</div>
        <li
          onClick={(e) => { navigate(`/schools/${school?.id}/clients`); closeToolbar(); }}
          className={`w-full ${
            location.pathname === `/schools/${school?.id}/clients` ||
            location.pathname === `/schools/${school?.id}/clients_new`
            ? 'active' : ''}`}>
          <BtnDashboard>
            <FaUsers />
            <p>Estudiantes</p>
          </BtnDashboard>
        </li>
        <li className={`w-full group mt-[-25px]`}>
          <input
            className="appearance-none"
            type="checkbox"
            id="rates"
            onChange={(e) => {
              e.target.checked ? openCollapsedRates() : closeCollapsedRates();
            }}
          />
          <label htmlFor="rates">
            <BtnDashboard>
              <FaBook />
              <div className="flex w-[100%] items-center justify-between  gap-2">
                <p>Reportes</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-3 h-3 transition-all ${isCollapsedRate ? 'rotate-90' : ''
                    }`}
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </BtnDashboard>
          </label>
          <Collapse isOpened={isCollapsedRate}>
            <ReportsAccordion  school={school?.id} />
          </Collapse>
        </li>
        <li
          onClick={(e) => { navigate(`/schools/${school?.id}/services_receivable`); closeToolbar(); }}
          className={`w-full ${
            location.pathname === `/schools/${school?.id}/services_receivable`
            ? 'active' : ''}`}>
          <BtnDashboard>
            <FaDollarSign />
            <p>Servicios por cobrar</p>
          </BtnDashboard>
        </li>
        <li
          onClick={(e) => { navigate(`/schools/${school?.id}/generateXML`); closeToolbar(); }}
          className={`w-full ${
            location.pathname === `/schools/${school?.id}/generateXML`
            ? 'active' : ''}`}>
          <BtnDashboard>
            <FaFileExcel />
            <p>Generar XML</p>
          </BtnDashboard>
        </li>
      </ul>
    </div>
  );
};

export default NavLeftSchool;
