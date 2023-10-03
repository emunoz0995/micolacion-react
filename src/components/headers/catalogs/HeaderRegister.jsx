import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';


const HeaderRegister = ({ title, titleOne, to }) => {
    return (
        <div className='w-ful flex text-2xl font-semibold justify-between gap-2 mb-5'>
            <h1>{title}</h1>
        </div>
    );
};

export default HeaderRegister;