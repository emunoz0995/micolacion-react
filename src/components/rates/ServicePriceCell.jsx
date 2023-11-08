import React from 'react';
import { useTranslation } from "react-i18next";
import { FaDollarSign, FaPlaneDeparture, FaUser } from 'react-icons/fa';

const ServicePriceCell = ({client,operator,ticket}) => {
    const { t } = useTranslation();
    return (
        <div className='w-full'>
            <div className='flex gap-3 mb-1'>
                <FaDollarSign className='text-sky-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{client} </h3>
                </div>
            </div>
        </div>
    );
};

export default ServicePriceCell;