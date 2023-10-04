import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { geMenor5ReportThunk } from '../../store/slices/reports/reports.slice';



const MenorFiveReport = () => {

    const { school_id } = useParams();
    const reportsState = useSelector(state => state.reports);
    const dispatch = useDispatch();
    const [totalBreakFast, setTotalBreakFast] = useState('');
    const [totalLunch, setTotalLunch] = useState('');

    useEffect(() => {
        dispatch(geMenor5ReportThunk(school_id));
    }, []);

    const handleGeneratePDF = (client_id) => {
       const data ={
        totalBreakfast: totalBreakFast,
        totalLunch: totalLunch
       }

       console.log(data)
    };


console.log(reportsState)
    return (
        <SchoolLayout>
            {reportsState.fetching || reportsState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Servicios por renovar" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff]'>
                                    <th className='p-3'>Representante</th>
                                    <th className='w-150px'>Nombres</th>
                                    <th>Servicio</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Almuerzos a favor</th>
                                    <th className='sticky right-0'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportsState.reports.map(report => (
                                    <tr className='h-[60px]' key={report.id}>
                                        <td className='p-3'>{report.cliente_representante?.names} </td>
                                        <td>{report.firstName} {report.lastName}</td>
                                        <td>{report.cliente_servicio?.name}</td>
                                        <td className='w-[150px]'>{report.cliente_representante?.email} </td>
                                        <td>{report.cliente_representante?.telefon} </td>
                                        <td >
                                            <input type="text" className='border' defaultValue={report.totalBreakfast} onChange={(e)=>setTotalBreakFast(e.target.value)} />
                                        </td>
                                        <td>
                                            <input type="text" className='border' defaultValue={report.totalLunch} onChange={(e)=>setTotalLunch(e.target.value)}/>
                                        </td>
                                        <td className='gap-1 justify-end p-1 sticky right-0'>
                                            <BtnTable action="process" funtion={() => handleGeneratePDF(report.id)} />
                                        </td>
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

export default MenorFiveReport;