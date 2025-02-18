import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
import Toast from '../../../utils/toast';
//SLICES
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { getServicesExtrasThunk } from '../../../store/slices/catalogs/services.slice';
import { revertBreakFastThunk } from '../../../store/slices/procedures/refrigerios.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';
import { paidServiceProcessedThunk, initialStateFuntions } from '../../../store/slices/procedures/funtions.slice';


const RefrigerioProcesadosCervantes = () => {
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const servicesState = useSelector(state => state.services)
    const funtionsState = useSelector(state => state.funtions)
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [countProcess, setCountProcess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getServicesExtrasThunk());
        getRefrigeriosProcesados();
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let seccionMatch = false;
            let fullName = false

            if (item.cliente_seccion.name) {
                seccionMatch = item.cliente_seccion.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.lastName && item.firstName) {
                fullName = `${item.lastName} ${item.firstName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase());
            }

            return fullName || seccionMatch;
        });
        setSearchResults(results);
    }, [searchTerm, data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handleRevertBreak = (cedula, id) => {
        dispatch(revertBreakFastThunk(cedula));
        hideRow(id);
    }

    const handleChange = (serviceId, cedulaCliente) => {
        const data = {
            serviceId,
            cedulaCliente,
        }
        dispatch(registerExtrasThunk(data));
        Toast.fire({
            icon: 'success',
            title: '¡Servicio extra registrado!'
        }).then(function (result) {
            getRefrigeriosProcesados();
        })
    };

    const handlePaidService = (cedulaCliente) => {
        dispatch(paidServiceProcessedThunk(cedulaCliente));
        setTimeout(() => {
            getRefrigeriosProcesados();
        }, 2000);
    };

    if (funtionsState.message === 'service paid successfully') {
        Toast.fire({
            icon: 'success',
            title: 'Pago registrado, ¡ya puede general XML!'
        }).then(
            dispatch(initialStateFuntions())
        );
    }

    const getRefrigeriosProcesados = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/refrigerios_cervantes/breakfast_procesados/${school_id}`)
            .then(response => {
                setData(response.data.result);
                setCountProcess(response.data.countProcess);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Basica Elemental'} toOne={`/schools/${school_id}/refrigerios_primaria`} activeOne={false}
                        titleTwo={'Inicial'} toTwo={`/schools/${school_id}/refrigerios_inicial`} activeTwo={false}
                        titleTree={'Basica Media/Superior '} toTree={`/schools/${school_id}/refrigerios_secundaria`} activeTree={false}
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/refrigerios_eventuales_cervantes`} activeFour={false}
                        titleSeven={'Procesados'} countProcces={countProcess} toSeven={`/schools/${school_id}/refrigerios_procesados_cervantes`} activeSeven={true}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff]'>
                                    <th className='p-2'>Nombre</th>
                                    <th>Servicio</th>
                                    <th>Nivel</th>
                                    <th>Revertir</th>
                                    <th>Total</th>
                                    <th>Cancelado</th>
                                    <th>Extras</th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(refrigerio => {
                                        if (hiddenRows.includes(refrigerio.id)) {
                                            return null;
                                        }
                                        return (
                                            <tr className='h-[60px] uppercase' key={refrigerio.id}>
                                                <td className='p-2'>{refrigerio.lastName} {refrigerio.firstName} </td>
                                                <td>{refrigerio.cliente_servicio?.name}</td>
                                                <td>{refrigerio.cliente_seccion?.name}</td>
                                                <td className='flex gap-1 items-center h-[60px] p-1'>
                                                    <BtnTable action="revert" funtion={() => handleRevertBreak(refrigerio.cedulaCliente, refrigerio.id)} />
                                                </td>
                                                {refrigerio.cliente_servicio?.name === "SIN SERVICIO" ?
                                                    <td>{refrigerio.breakfastConsumed}</td> :
                                                    <td>{refrigerio.totalBreakfast}</td>
                                                }

                                                <td className='flex gap-1 items-center h-[60px] justify-center p-1'>
                                                    <BtnTable action="process" funtion={() => handlePaidService(refrigerio.cedulaCliente)} />
                                                </td>

                                                <td>
                                                    <select onChange={(e) => handleChange(e.target.value, refrigerio.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                        <option value="">Seleccione</option>
                                                        {servicesState.services.map((service) => (
                                                            <option key={service.id} value={service.id}>{service.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody> :
                                <div className="absolute z-10 top-[450px] left-[30px] sm:top-[350px] sm:left-[630px]">
                                    <h1 className='font-semibolt text-[22px] sm:text-[25px] text-gray-400'>NO HAY DATOS PARA MOSTRAR</h1>
                                </div>
                            }
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default RefrigerioProcesadosCervantes;