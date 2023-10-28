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
import BtnTable from '../../components/buttons/BtnTable';
import { Collapse } from 'react-collapse';
import '../../App.css';
// SLICES 
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { getHistoryThunk } from '../../store/slices/facturation/facturation.slice';
//import GeneralReportPDF from './GeneralReportPDF';

const FacturaXML = () => {

    const { client_ci, school_id } = useParams();
    const [data, setData] = useState([]);
    const [openHistory, setOpenHistory] = useState(false);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const historyState = useSelector(state => state.facturations);
    const dispatch = useDispatch();


    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        dispatch(getHistoryThunk())
    }, [data]);

    const getClient = () => {
        dispatch(setIsLoading(true));
        axios.get(`https://system.micolacion.com/api/facturations/client/${client_ci}`)
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const onSubmit = () => {
        GeneralReportPDF(data, historyState.facturations)
    };

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    console.log(data)

    return (
        <SchoolLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <div className='h-[90%] overflow-y-scroll flex flex-col contenedor'>
                        <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[70px] flex gap-1 justify-end'>
                            <BtnTable action="exit" to={`/schools/${school_id}/general_report`} />
                            <BtnTable action="xml" funtion={onSubmit} />
                        </div>
                        <HeaderSection title="Datos para facturación" />
                        <div className='flex'>
                            <div className='flex flex-col p-2 mr-5'>
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
                            </div>
                            <div className='flex flex-col p-2'>
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
                        </div>
                        <div className="overflow-y-scroll h-[87%] contenedor">
                            <table className="text-[13px] table-sm table-zebra w-full">
                                <thead className='border-t-[1px] border-t-sky-500' >
                                    <tr className='text-left h-[60px] bg-[#eff2f8]'>
                                        <th className='pl-2'>Código</th>
                                        <th>Cantidad</th>
                                        <th className='w-[50%]'>Descripción</th>
                                        <th>Precio Unitario</th>
                                        <th>Descuento</th>
                                        <th>Precio Total</th>
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
                    </div>
                </div>

            )}
        </SchoolLayout>
    );
};

export default FacturaXML;