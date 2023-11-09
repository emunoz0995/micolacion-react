import React from 'react';
import useModalStore from '../../store/VitalStore';
import { useNavigate } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

export default function BtnContent({ children, type, cancel, to, onclick, school }) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = () => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Si continuas comenzaras el dia!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Si, Comenzar dia!',
      cancelButtonText: t("canceled_button")
    }).then((result) => {
      if (result.isConfirmed) {
        onclick();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Todo esta listo!',
          text: 'que tengas un buen dia',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          if (result) {
            if(school?.id == 'ERdKGa9kbV'){
              navigate (`/schools/${school?.id}/refrigerios_primaria`);
            } else if (school?.id == 'bEB9ZLKPgW'){
              navigate (`/schools/${school?.id}/refrigerios_bm`);
            }
          }
        })

      }
    })
  }

  if (cancel) {
    return (
      <div
        onClick={() => navigate(`${to}`)}
        className={`bg-gray-400 hover:bg-gray-600 cursor-pointer 
        text-white  transition-all active:scale-95 p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center`}
      >
        {children}
      </div>
    );
  }

  if (type === 'initDay') {
    return (
      <div
        onClick={() => handleDelete()}
        className={`hover:bg-gradient-to-r from-orange-500/30 to-orange-500 cursor-pointer w-[60%] gap-3
        text-white  transition-all active:scale-95 p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/80 flex items-center justify-center`}
      >
        <FaReply />
        {children}
      </div>
    );
  }

  return (
    <button
      type={type && type}
      className={`
        text-white  transition-all p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center justify-center ${type === 'submit'
          ? 'bg-sky-400 hover:bg-sky-600 active:scale-95'
          : 'bg-gray-300'
        }`}
    >
      {children}
    </button>
  );
}
