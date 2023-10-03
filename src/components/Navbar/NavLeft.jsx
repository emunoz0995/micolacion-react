import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToolbarStore } from '../../store/VitalStore';
import { useTranslation } from "react-i18next";
//UI
import logo from '../../assets/colacion.png';
import BtnDashboard from '../buttons/BtnDashboard';
import {  FaReadme, FaRulerVertical, FaSchool, FaSellcast, FaServicestack, FaUsers } from 'react-icons/fa';


const NavLeft = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isToolbarOpen, closeToolbar } = useToolbarStore((state) => state);

  return (
    <div
      className={`text-white shadow-lg fixed top-0 bottom-0 shadow-black/30 md:translate-x-0 transition-all  w-60 bg-gradient-to-t from-[#051937] via-[#004d7a] to-[#008793] z-20 ${isToolbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-center m-auto gap-2 h-16 w-[90%]">
        <img className="object-contain h-[80px] mt-8 mb-5" src={logo} alt="logo" />
      </div>
      <ul className=" flex flex-col h-full items-start justify-start w-[98%] mt-5 gap-3">
        <li
          onClick={(e) => { navigate('/'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/' || location.pathname === 'exit_list' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaReadme/>
            <p>Inicio</p>
          </BtnDashboard>
        </li>
        <div className='pl-2 text-[10px] text-sky-200 mb-[-10px]'>{t("administration_tag")}</div>
        <li
          onClick={(e) => { navigate('/users'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/users' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaUsers />
            <p>Usuarios</p>
          </BtnDashboard>
        </li>
        <li
          onClick={(e) => { navigate('/services'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/services' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaServicestack />
            <p>Servicios</p>
          </BtnDashboard>
        </li>
        <li
          onClick={(e) => { navigate('/schools'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/schools' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaSchool />
            <p>Colegios</p>
          </BtnDashboard>
        </li>
        <li
          onClick={(e) => { navigate('/sections'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/sections' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaSellcast />
            <p>Secciones</p>
          </BtnDashboard>
        </li>
      </ul>
    </div>
  );
};

export default NavLeft;
