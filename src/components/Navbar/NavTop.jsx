import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToolbarStore } from '../../store/VitalStore';
//UI
import { FaSearch, FaUser } from 'react-icons/fa';
import BtnCircle from '../buttons/BtnCircle';
import { useTranslation } from "react-i18next";
import eng from '../../assets/eng.png';
import es from '../../assets/es.png'


const NavTop = ({ onChange, value, view }) => {
  const { openToolbar } = useToolbarStore((state) => state);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [language, setLanguage] = useState("ES");
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logOut = () => {
    localStorage.clear()
  };

  const location = useLocation();

  return (
    <nav className="absolute bg-base-200 shadow-lg flex w-calc md:right-0 h-14 items-center">
      {view === true ?
        <div className=' flex ml-20 w-60 sm:ml-5 sm:items-center ' >
          <input className="outline-none w-full input-bordered focus:outline-none focus:ring-1  text-sm border font-normal p-1 rounded-r-lg" type="text" placeholder={"Buscar..."} value={value} onChange={onChange} />
        </div> : 
        ""
      }

      <div className="md:hidden absolute left-7">
        <BtnCircle btnAction={() => openToolbar()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </BtnCircle>
      </div>
      <div className="absolute right-7 flex h-[100%] items-center">
        <div className='hidden sm:flex sm:h-[88%] sm:border sm:border-gray-300'></div>
        <div className="dropdown dropdown-end h-full">
          <div className='flex justify-end md:justify-between sm:justify-between items-center h-full md:w-[150px] sm:w-[150px]'>
            <BtnCircle>
              <p className='hidden sm:flex sm:text-sm sm:ml-3 sm:mr-2'>{user.userName}</p>
              <FaUser size={"20px"} />
            </BtnCircle>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <Link onClick={logOut} to="/login" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
