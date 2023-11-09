import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { getMenor5ReportThunk } from '../../store/slices/reports/reports.slice';
import { renewServiceThunk } from '../../store/slices/procedures/funtions.slice';
import Swal from 'sweetalert2';



const MenorFiveReport = () => {

    const { school_id } = useParams();
    const reportsState = useSelector(state => state.reports);
    const dispatch = useDispatch();
    const [totalBreakFast, setTotalBreakFast] = useState('');
    const [totalLunch, setTotalLunch] = useState('');
    const [hiddenRows, setHiddenRows] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    useEffect(() => {
        dispatch(getMenor5ReportThunk(school_id));
    }, []);

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handleRenewService = (clientId, cedulaCliente) => {
        const data = {
            totalBreakfast: totalBreakFast,
            totalLunch: totalLunch
        }
        Toast.fire({
            icon: 'success',
            title: 'Servicio renovado, ¡ya puede general XML!'
          })
        dispatch(renewServiceThunk(cedulaCliente, data));
        hideRow(clientId);
    };


    return (
        <SchoolLayout>
            {reportsState.fetching || reportsState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Servicios por renovar" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Representante</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th className='w-[200px]'>Nombres</th>
                                    <th>Servicio</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Almuerzos a favor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportsState.reports.map(report => {
                                    if (hiddenRows.includes(report.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px] uppercase' key={report.id}>
                                            <td className='p-3'>{report.cliente_representante?.names} </td>
                                            <td className='w-[100px]'>{report.cliente_representante?.email} </td>
                                            <td>{report.cliente_representante?.telefon} </td>
                                            <td>{report.lastName} {report.firstName} </td>
                                            <td>{report.cliente_servicio?.name}</td>
                                            <td className='pl-10' >
                                                <input type="text" className='outline-none border w-[50px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                    defaultValue={report.totalBreakfast}
                                                    onChange={(e) => setTotalBreakFast(e.target.value)} />
                                            </td>
                                            <td className='pl-10'>
                                                <input type="text" className='outline-none border w-[50px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                    defaultValue={report.totalLunch}
                                                    onChange={(e) => setTotalLunch(e.target.value)} />
                                            </td>
                                            <td className='gap-1 justify-end p-1'>
                                                <BtnTable action="process" funtion={() => handleRenewService(report.id, report.cedulaCliente)} />
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

export default MenorFiveReport;