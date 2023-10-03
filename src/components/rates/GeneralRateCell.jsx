import React from 'react';
import { useTranslation } from "react-i18next";
import { FaDollarSign, FaPlaneDeparture } from 'react-icons/fa';

const GeneralRateCell = ({client,operator,ticket}) => {
    const { t } = useTranslation();
    return (
        <div className='w-full'>
            <div className='flex gap-3 mb-1'>
                <FaDollarSign className='text-sky-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{client} </h3>
                    <p className='text-xs text-gray-400'>{t("general_client")}</p>
                </div>
            </div>
            <div className='flex gap-3'>
                <FaDollarSign className='text-sky-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{operator}</h3>
                    <p className='text-xs text-gray-400'>{t("operator")}</p>
                </div>
            </div>
            <div className='flex gap-3'>
                <FaPlaneDeparture className='text-rose-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <p >{ticket === 1 ? t("general_priceInclude") : t("general_priceNotInclude")} </p>
                </div>
            </div>
        </div>
    );
};

export default GeneralRateCell;