import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';
import { FaSearch } from 'react-icons/fa';


const HeaderComplete = ({ title, to, placeholder, register,  onclick }) => {

    return (
        <div className='w-ful flex text-2xl font-semibold justify-between mb-5'>
            <div className='flex gap-2'>
                <h1>{title}</h1>
                <BtnAdd to={to} />
            </div>
            <div className='flex items-center ' >
                <input className="outline-none input-bordered focus:outline-none focus:ring-1  text-sm border font-normal p-1 rounded-l-lg" type="text" placeholder={placeholder} {...register} />
                <button
                    className="bg-sky-400  hover:bg-sky-600 text-white transition-all active:scale-95 p-2 rounded-r-lg font-bold shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center text-sm "
                    type="submit"
                    onClick={onclick}
                >
                    <FaSearch />
                </button>
            </div>

        </div>
    );
};

export default HeaderComplete;