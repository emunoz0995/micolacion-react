import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function BtnAdd({to}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`${to}`)
      }}
      className="bg-sky-400  hover:bg-sky-600 text-white transition-all active:scale-95 p-2 rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm"
    >
      <FaPlus />
    </button>
  );
}
