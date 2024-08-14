import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';

const HeaderComplete = ({ title, to, placeholder, value, onChange }) => {

    return (
        <div className='w-ful flex text-2xl font-semibold justify-between mb-5 items-center'>
            <div className='flex gap-2'>
                <h1>{title}</h1>
                <BtnAdd to={to} />
            </div>
            <div className='flex items-center ' >
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="outline-none input-bordered focus:outline-none focus:ring-1  text-sm border font-normal p-1 rounded-lg w-[300px]" type="text"  />
            </div>

        </div>
    );
};

export default HeaderComplete;