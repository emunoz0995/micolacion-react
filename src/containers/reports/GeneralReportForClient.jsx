import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//UI
import MainLoader from '../../components/Loaders/MainLoader';
import SchoolLayout from '../../layouts/SchoolsLayout';
import HeaderSection from '../../components/headers/catalogs/HeaderSection';
import LavelForm from '../../components/Inputs/formInput/LavelForm';
import BtnDashboard from '../../components/buttons/BtnDashboard';
import { Collapse } from 'react-collapse';
import '../../App.css';
// SLICES 
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { getHistoryThunk } from '../../store/slices/facturation/facturation.slice';
import GeneralReportPDF from './GeneralReportPDF';

import BtnTable from '../../components/buttons/BtnTable';


const GeneralReportForClient = () => {

    const { client_id, school_id } = useParams();
    const [data, setData] = useState([]);
    const [openHistory, setOpenHistory] = useState(false);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const historyState = useSelector(state => state.facturations);
    const dispatch = useDispatch();


    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        const results = data.cedulaCliente
        dispatch(getHistoryThunk(results))
    }, [data]);

    const getClient = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/clients/client/${client_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const onSubmit = () => {
        GeneralReportPDF(data , historyState.facturations)
    };

    const handleHistoyClick = () => {
        const results = data.cedulaCliente
        setOpenHistory(!openHistory);
        if (!openHistory) {
            dispatch(getHistoryThunk(results))
        }
    };

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    return (
        <SchoolLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <div className='h-[90%] overflow-y-scroll flex flex-col contenedor'>
                        <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[70px] flex gap-1 justify-end'>
                            <BtnTable action="exit" to={`/schools/${school_id}/general_report`} />
                            <BtnTable action="pdf" funtion={onSubmit}/>
                        </div>
                        <HeaderSection title="Datos estudiante" />
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col p-2'>
                                <LavelForm
                                    type="text"
                                    label="Cedula"
                                    input="input"
                                    value={data.cedulaCliente}
                                />
                                <LavelForm
                                    type="text"
                                    label="Nombres"
                                    input="input"
                                    value={data.firstName}
                                />
                                <LavelForm
                                    type="text"
                                    label="Apellidos"
                                    input="input"
                                    value={data.lastName}
                                />
                                <LavelForm
                                    type="text"
                                    label="Sección"
                                    input="input"
                                    value={data.cliente_seccion?.name}
                                />
                            </div>
                            <div className='flex flex-col p-2'>
                                <LavelForm
                                    type="text"
                                    label="Servicio"
                                    input="input"
                                    value={data.cliente_servicio?.name}
                                />
                                <LavelForm
                                    type="text"
                                    label="Refrigerios a favor"
                                    input="input"
                                    value={data.totalBreakfast}
                                />
                                <LavelForm
                                    type="text"
                                    label="Almuerzos a favor"
                                    input="input"
                                    value={data.totalLunch}
                                />
                            </div>
                        </div>
                        <HeaderSection title="Datos representante" />
                        <div className='flex flex-col p-2'>
                            <LavelForm
                                type="text"
                                label="Cedula"
                                input="input"
                                value={data.cliente_representante?.cedulaRepresentante}
                            />
                            <LavelForm
                                type="text"
                                label="Nombres"
                                input="input"
                                value={data.cliente_representante?.names}
                            />
                            <LavelForm
                                type="text"
                                label="Email"
                                input="input"
                                value={data.cliente_representante?.email}
                            />
                            <LavelForm
                                type="text"
                                label="Teléfono"
                                input="input"
                                value={data.cliente_representante?.telefon}
                            />
                        </div>
                        <div className="flex mt-2 border-[1px] border-sky-500 rounded-[10px] ">
                            <div className='w-full flex flex-col justify-start'>
                                <input className="appearance-none" type="checkbox" id="history"
                                    onClick={handleHistoyClick}
                                />
                                <label htmlFor="history">
                                    <BtnDashboard>
                                        <div className="flex w-[100%] items-center gap-2">
                                            <p>Historial de consumos</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className={`w-3 h-3 transition-all ${openHistory ? 'rotate-90' : ''
                                                    }`}
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </BtnDashboard>
                                </label>
                                <Collapse isOpened={openHistory}>
                                    <div className="overflow-y-scroll h-[87%] contenedor">
                                        <table className="text-[13px] table-sm table-zebra w-full">
                                            <thead className='border-t-[1px] border-t-sky-500' >
                                                <tr className='text-left h-[60px] bg-[#b3b4b6]'>
                                                    <th className='pl-2 w-[250px]'>Nombres</th>
                                                    <th>Seccion</th>
                                                    <th>Servicio</th>
                                                    <th>Consumidos</th>
                                                    <th>Fecha</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {historyState.facturations.map(report => (
                                                    <tr className='h-[60px]' key={report.id}>
                                                        <td className='pl-2'>{report.firstName} {report.lastName}</td>
                                                        <td>{report.history_seccion?.name}</td>
                                                        <td>{report.history_servicio?.name}</td>
                                                        <td className='pl-8' >
                                                            {report.history_servicio?.name === "REFRIGERIO DIARIO" ? report.breakfastConsumed :
                                                             report.history_servicio?.name === "ALMUERZO DIARIO" ? report.lunchesConsumed :
                                                             report.history_servicio?.isExtra ? report.extrasConsumed : ""
                                                            }
                                                        </td>
                                                        <td>{formatDateToLocal(report.createdAt)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default GeneralReportForClient;