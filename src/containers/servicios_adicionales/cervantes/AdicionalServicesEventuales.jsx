import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import Toast from '../../../utils/toast'

//SLICES
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { countAdicionalProcessThunk } from '../../../store/slices/procedures/countProcess';
import { getAditionalServicesBySchoolThunk } from '../../../store/slices/catalogs/aditionalServices.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';
import getConfig from '../../../utils/getConfig';


const AdicionalesCervantesEventuales = () => {
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const countProcces = useSelector(state => state.countProcess);
    const aditionalServicesState = useSelector(state => state.aditionalServices)
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        getServicesAditionalLcv();
        dispatch(getAditionalServicesBySchoolThunk(school_id))
        dispatch(countAdicionalProcessThunk(school_id));
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let seccionMatch = false;
            let fullName = false

            if (item.cliente_seccion?.name) {
                seccionMatch = item.cliente_seccion?.name.toLowerCase().includes(searchTerm.toLowerCase());
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

    const getServicesAditionalLcv = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/clients/${school_id}`,getConfig())
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const handleChange = (serviceId, cedulaCliente) => {
        const data = {
            serviceId,
            cedulaCliente,
        }
        dispatch(registerExtrasThunk(data));
        Toast.fire({
            icon: 'success',
            title: '¡Servicio registrado!'
        }).then(function (result) {
            getAlmuerzoPrimaria();
        })

    };


    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch}
            view={true} >
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Servicios Adicionales'} toOne={`/schools/${school_id}/aditional_services_cervantes`} activeOne={false}
                        titleTwo={'Eventuales'} toTwo={`/schools/${school_id}/aditional_servicesEventuales_cervantes`} activeTwo={true}
                        titleSeven={'Procesados'} countProcces={countProcces} toSeven={`/schools/${school_id}/aditional_servicesProcess_cervantes`} activeSeven={false}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full uppercase">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
                                    <th>Nombre</th>
                                    <th className='flex justify-center'>Asignar</th>
                                    <th>Total</th>
                                    <th>Nivel</th>
                                    <th>Servicio</th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(adicional => {
                                        if (hiddenRows.includes(adicional.id)) {
                                            return null;
                                        }
                                        return (
                                            <tr key={adicional.id}>
                                                <td>{adicional.lastName} {adicional.firstName} </td>
                                                <td>
                                                    <select onChange={(e) => handleChange(e.target.value, adicional.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                        <option value="">Seleccione</option>
                                                        {aditionalServicesState.services.map((service) => (
                                                            <option key={service.id} value={service.id}>{service.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>{adicional.lastName}</td>
                                                <td>{adicional.cliente_seccion?.name}</td>
                                                <td>{adicional.cliente_servicio?.name}</td> 

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

export default AdicionalesCervantesEventuales;