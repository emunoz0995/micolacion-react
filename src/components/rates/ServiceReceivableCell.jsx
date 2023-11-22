import React from 'react';
import { FaCircle, FaDollarSign, FaPlaneDeparture } from 'react-icons/fa';

const ServiceReceivableCell = ({ servicioPrincipal, servicioTomado, totalBreakFast, totalLunch }) => {
    return (
        <div className='w-full'>
            <div className='flex gap-3 my-2'>
                <FaCircle className='text-green-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{servicioPrincipal} </h3>
                    {servicioPrincipal != "SIN SERVICIO" ?
                        <div>
                            <p className='text-xs text-gray-400'>Refrigerios a favor: {totalBreakFast}</p>
                            <p className='text-xs text-gray-400'>Almuerzos a favor: {totalLunch}</p>
                        </div>
                        : ""
                    }
                </div>
            </div>
            <div className='flex gap-3'>
                <FaCircle className='text-sky-600 mt-[3px]' />
                <div className='flex flex-col'>
                    <h3 className='mb-[-5px] font-semibold'>{servicioTomado}</h3>
                </div>
            </div>
        </div>
    );
};

export default ServiceReceivableCell;