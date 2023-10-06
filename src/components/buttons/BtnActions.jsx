import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import { FaCheckDouble, FaFilePdf,  FaMoneyBill, FaPlus, FaReply } from 'react-icons/fa';

export default function BtnActions({ action, to, onclick, title, funtion }) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEdit = () => {
    navigate(to);
  };

  const handleFuntion = () => {
    funtion();
  };


  const handleDelete = () => {
    Swal.fire({
      text: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: t("delete_button"),
      cancelButtonText:  t("canceled_button")
    }).then((result) => {
      if (result.isConfirmed) {
        onclick()
      }
    })
  }

  if (action === 'process') {
    return (
      <>
        <button
          onClick={() => handleFuntion()}
          className="bg-green-200  hover:bg-green-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm "
        >
         <FaCheckDouble/>

        </button>
      </>
    );
  } else if (action === 'decrement') {
    return (
      <button
        onClick={() => handleFuntion()}
        className="bg-green-200  hover:bg-green-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <FaPlus/>
      </button>
    );
  } else if (action === 'pay') {
    return (
      <button
        onClick={() => handleFuntion()}
        className="bg-green-200  hover:bg-green-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <FaMoneyBill/>
      </button>
    );
  } else if (action === 'revert') {
    return (
      <button
        onClick={() => handleFuntion()}
        className="bg-green-200  hover:bg-green-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <FaReply/>
      </button>
    );
  } else if (action === 'edit') {
    return (
      <button
        onClick={() => handleEdit()}
        className="bg-sky-200  hover:bg-sky-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    );
  } else if (action === 'pdf') {
    return (
      <button
        onClick={() => handleFuntion()}
        className="bg-rose-200  hover:bg-rose-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <FaFilePdf color='white'/>
      </button>
    );
  } else if (action === 'delete') {
    return (
      <button
        onClick={() => handleDelete()}
        className="bg-rose-200  hover:bg-rose-400 transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    );
  }
}
