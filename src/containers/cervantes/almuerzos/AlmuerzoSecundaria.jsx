import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
import Swal from 'sweetalert2';
//SLICES
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { getServicesExtrasThunk } from '../../../store/slices/catalogs/services.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';
import { decrementLunchThunk } from '../../../store/slices/procedures/almuerzos.slice';
import { countLunchProcessThunk} from '../../../store/slices/procedures/countProcess';

const AlmuerzoSecundaria = () => {
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const servicesState = useSelector(state => state.services);
    const countProcces = useSelector(state => state.countProcess);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        getAlmuerzosSecundaria();
        dispatch(getServicesExtrasThunk());
        dispatch(countLunchProcessThunk(school_id));
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let seccionMatch = false;
            let fullName =  false 

            if (item.cliente_seccion.name) {
                seccionMatch = item.cliente_seccion.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.lastName && item.firstName){
                fullName = `${item.lastName}${item.firstName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase());
            }
        
            return fullName || seccionMatch ;
        });
        setSearchResults(results);
    }, [searchTerm, data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePlusBreak = (cedula, id) => {
        dispatch(decrementLunchThunk(cedula));
        setTimeout(() => {
            dispatch(countLunchProcessThunk(school_id));
        }, 500);
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
            getAlmuerzosSecundaria();
        })

    };

    const getAlmuerzosSecundaria = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/almuerzos_cervantes/lunch_secundaria/${school_id}`)
            .then(response => {
                setData(response.data);
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
                        titleOne={'Basica Elemental'} toOne={`/schools/${school_id}/almuerzos_primaria`} activeOne={false}
                        titleTwo={'Inicial'} toTwo={`/schools/${school_id}/almuerzos_inicial`} activeTwo={false}
                        titleTree={'Basical Media/Superior'} toTree={`/schools/${school_id}/almuerzos_secundaria`} activeTree={true}
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/almuerzos_eventuales_cervantes`} activeFour={false}
                        titleSeven={'Procesados'} countProcces={countProcces} toSeven={`/schools/${school_id}/almuerzos_procesados_cervantes`} activeSeven={false}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
                                    <th>Nombre</th>
                                    <th className='flex justify-center'>Almuerzo</th>
                                    <th>Total</th>
                                    <th>Extra</th>
                                    <th>Nivel</th>
                                    <th>Servicio</th>
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
                                                <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(almuerzo.cedulaCliente, almuerzo.id)} /></td>
                                                <td>{almuerzo.totalBreakfast}</td>
                                                <td>
                                                    <select onChange={(e) => handleChange(e.target.value, almuerzo.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                        <option value="">Seleccione</option>
                                                        {servicesState.services.map((service) => (
                                                            <option key={service.id} value={service.id}>{service.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>{almuerzo.cliente_seccion?.name}</td>
                                                <td>{almuerzo.cliente_servicio?.name}</td>
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

export default AlmuerzoSecundaria;