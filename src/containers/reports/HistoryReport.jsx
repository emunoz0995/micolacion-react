import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { getHistoryReportThunk } from '../../store/slices/reports/reports.slice';
//RESORCES
import { API_BASE_URL } from '../../store/constans';

const HistoryReport = () => {

    const { school_id } = useParams();
    const reportState = useSelector(state => state.reports);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);

    useEffect(() => {
        dispatch(getHistoryReportThunk(school_id));
    }, []);

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    const handleGenerateExcel = () => {
        const url = `${API_BASE_URL}api/reports/history/${school_id}`;
        window.open(url, "_self");
        
    };

    return (
        <SchoolLayout>
            {reportState.fetching || reportState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Historial de consumos" />
                    <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[85px] flex gap-1 justify-end'>
                        <BtnTable action="xml" funtion={handleGenerateExcel} />
                    </div>
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='w-[200px] p-2'>Fecha y Hora</th>
                                    <th className='w-[200px] p-2'>Estudiante</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Consumidos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportState.reports.map(item => {
                                    if (hiddenRows.includes(item.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-2'>{formatDateToLocal(item.createdAt)}</td>
                                            <td className='p-2'>{item.lastName} {item.firstName}</td>
                                            <td>{item.history_seccion?.name}</td>
                                            <td>{item.history_servicio?.name}</td>
                                            <td className='pl-8' >
                                                {item.history_servicio?.name === "REFRIGERIO DIARIO" ? item.breakfastConsumed :
                                                    item.history_servicio?.name === "ALMUERZO DIARIO" ? item.lunchesConsumed :
                                                        item.history_servicio?.isExtra ? item.extrasConsumed : ""
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default HistoryReport;