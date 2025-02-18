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
import { revertLunchThunk } from '../../../store/slices/procedures/almuerzos.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';
import { paidServiceProcessedThunk } from '../../../store/slices/procedures/funtions.slice';

const AlmuerzoProcesadosCervantes = () => {
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const servicesState = useSelector(state => state.services)
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [countProcess, setCountProcess] = useState('');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getServicesExtrasThunk());
        getAlmuerzosProcesados();
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

    const handleRevertLunch = (cedula, id) => {
        dispatch(revertLunchThunk(cedula));
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
            getAlmuerzosProcesados();
        })

    };

    const handlePaidService = (cedulaCliente) => {
        Toast.fire({
            icon: 'success',
            title: 'Pago registrado, ¡ya puede general XML!'
        })
        dispatch(paidServiceProcessedThunk(cedulaCliente));
        setTimeout(() => {
            getAlmuerzosProcesados();
        }, 2000);

    };

    const getAlmuerzosProcesados = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/almuerzos_cervantes/lunch_procesados/${school_id}`)
            .then(response => {
                setData(response.data.result);
                setCountProcess(response.data.countProcess);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    console.log(searchResults)

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Primaria'} toOne={`/schools/${school_id}/almuerzos_primaria`} activeOne={false}
                        titleTwo={'Inicial'} toTwo={`/schools/${school_id}/almuerzos_inicial`} activeTwo={false}
                        titleTree={'Secundaria '} toTree={`/schools/${school_id}/almuerzos_secundaria`} activeTree={false}
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/almuerzos_eventuales_cervantes`} activeFour={false}
                        titleSeven={'Procesados'} countProcces={countProcess} toSeven={`/schools/${school_id}/almuerzos_procesados_cervantes`} activeSeven={true}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
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
                                    {searchResults.map(almuerzo => {
                                        if (hiddenRows.includes(almuerzo.id)) {
                                            return null;
                                        }
                                        return (
                                            <tr className="uppercase" key={almuerzo.id}>
                                                <td>{almuerzo.lastName} {almuerzo.firstName} </td>
                                                <td>{almuerzo.cliente_servicio?.name}</td>
                                                <td>{almuerzo.cliente_seccion?.name}</td>
                                                <td className='flex justify-center'>
                                                    <BtnTable action="revert" funtion={() => handleRevertLunch(almuerzo.cedulaCliente, almuerzo.id)} />
                                                </td>
                                                {almuerzo.cliente_servicio?.name === "SIN SERVICIO" ?
                                                    <td>{almuerzo.lunchesConsumed}</td> :
                                                    <td>{almuerzo.totalLunch}</td>
                                                }

                                                <td className='flex gap-1 items-center h-[60px] justify-center p-1'>
                                                    <BtnTable action="process" funtion={() => handlePaidService(almuerzo.cedulaCliente)} />
                                                </td>
                                                <td>
                                                    <select onChange={(e) => handleChange(e.target.value, almuerzo.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
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
                                <div className="absolute z-10 top-[200px] left-3 sm:left-[380px]">
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

export default AlmuerzoProcesadosCervantes;