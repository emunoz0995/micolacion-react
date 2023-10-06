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
          location.pathname === `/schools/${school}/menor5_report` ? 'active' : ''
        }`}
        onClick={() => {
          navigate(`/schools/${school}/menor5_report`);
        }}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Menor a 5</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate(`/schools/${school}/breakFast_report`);
        }}
        className={`w-full ${
          location.pathname === `/schools/${school}/breakFast_report` ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Refrigerios Diarios</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate(`/schools/${school}/lunch_report`);
        }}
        className={`w-full ${
          location.pathname === `/schools/${school}/lunch_report` ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Almuerzos Diarios</BtnDashboard>
      </li>
    </ul>
  );
};

export default ReportsAccordion;
