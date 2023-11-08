import React from 'react';
import { useTranslation } from "react-i18next";
import { FaCoffee} from 'react-icons/fa';

const ServiceNameCell = ({client,operator,ticket}) => {
    const { t } = useTranslation();
    return (
        <div className='w-full'>
            <div className='flex gap-3 mb-1'>
                <FaCoffee className='text-green-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{client} </h3>
                </div>
            </div>
        </div>
    );
};

export default ServiceNameCell;