import React from 'react';
import { useTranslation } from "react-i18next";

const StateRateCell = ({ activation_date, inactivation_date, reason_deactivation }) => {
    const { t } = useTranslation();
    return (
        <div className='w-full'>
            {activation_date ? (
                <div className='flex mb-1'>
                    <div className='flex flex-col'>
                        <h3 className='mb-[-5px] font-semibold'>{activation_date} </h3>
                        <p className='text-xs text-gray-400'>{t("date_active_rate")}</p>
                    </div>
                </div>) : (
                null
            )}

            {inactivation_date ? (
                <div className='flex mb-1'>
                    <div className='flex flex-col'>
                        <h3 className='mb-[-5px] font-semibold'>{inactivation_date} </h3>
                        <p className='text-xs text-gray-400'>{t("date_deactivate_rate")}</p>
                    </div>
                </div>) : (
                null
            )}
            <div className='flex mb-1'>
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{reason_deactivation} </h3>
                </div>
            </div>
        </div>
    );
};

export default StateRateCell;