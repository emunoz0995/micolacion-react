import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BtnDashboard from '../buttons/BtnDashboard';
import { useTranslation } from "react-i18next";
import { FaCircle } from 'react-icons/fa';

const CatalogoAccordion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <ul className=''>
      <li
        onClick={() => {
          navigate('/gruas_new');
        }}
        className={`w-full ${location.pathname === '/gruas_new' ? 'active' : ''}`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Grua</BtnDashboard>
      </li>
      <li
        className={`w-full ${
          location.pathname === '/agencies' ? 'active' : ''
        }`}
        onClick={() => {
          navigate('/');
        }}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Montacarga</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/');
        }}
        className={`w-full ${
          location.pathname === '/berths' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Bascula</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/');
        }}
        className={`w-full ${
          location.pathname === '/berths' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Carga Suelta</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/');
        }}
        className={`w-full ${
          location.pathname === '/berths' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Garaje</BtnDashboard>
      </li>
    </ul>
  );
};

export default CatalogoAccordion;
