import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { getBreakFastReportThunk } from '../../store/slices/reports/reports.slice';


const BreakFastReport = () => {

    const { school_id } = useParams();
    const reportsState = useSelector(state => state.reports);
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getBreakFastReportThunk(school_id));
    }, []);

    return (
        <SchoolLayout>
            {reportsState.fetching || reportsState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Refirgerios diarios" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Nombres</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Refrigerios diarios</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Extras consumidos</th>
                                    <th>Estatus pago</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportsState.reports.map(report => (
                                        <tr className='h-[60px]' key={report.id}>
                                            <td className='p-3'>{report.firstName} {report.lastName} </td>
                                            <td>{report.cliente_seccion?.name}</td>
                                            <td>{report.cliente_servicio?.name}</td>
                                            <td>{report.breakfastConsumed} </td>
                                            <td>{report.totalBreakfast} </td>
                                            <td>{report.totalExtras} </td>
                                            <td>{report.paidService ? "Canselado" : "Pago pendiente"} </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default BreakFastReport;