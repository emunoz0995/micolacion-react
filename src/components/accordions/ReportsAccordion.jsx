import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BtnDashboard from '../buttons/BtnDashboard';
import { useTranslation } from "react-i18next";
import { FaCircle } from 'react-icons/fa';

const ReportsAccordion = ({school}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <ul className=''>
      <li
        onClick={() => {
          navigate(`/schools/${school}/general_report`);
        }}
        className={`w-full ${location.pathname === `/schools/${school}/general_report` ? 'active' : ''}`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />General</BtnDashboard>
      </li>
      <li
        className={`w-full ${
          location.pathname === '/report_menor_cinco' ? 'active' : ''
        }`}
        onClick={() => {
          navigate('/report_menor_cinco');
        }}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Menor a 5</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/report_refrigerios_diarios');
        }}
        className={`w-full ${
          location.pathname === '/report_refrigerios_diarios' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Refrigerios Diarios</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/report_almuerzos_diarios');
        }}
        className={`w-full ${
          location.pathname === '/report_almuerzos_diarios' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Almuerzos Diarios</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/report_historico');
        }}
        className={`w-full ${
          location.pathname === '/report_historico' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Historico</BtnDashboard>
      </li>
    </ul>
  );
};

export default ReportsAccordion;
