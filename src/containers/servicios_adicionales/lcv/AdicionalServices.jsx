import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';

//SLICES
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { decrementAditionalThunk } from '../../../store/slices/procedures/adicionales.slice';
import { countAdicionalProcessThunk } from '../../../store/slices/procedures/countProcess';
import { getAditionalServicesBySchoolThunk } from '../../../store/slices/catalogs/aditionalServices.slice';
import getConfig from '../../../utils/getConfig';

const AdicionalServices = () => {
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
        const results = data?.filter(item => {
            let seccionMatch = false;
            let fullName = false

            if (item.cliente?.cliente_seccion?.name) {
                seccionMatch = item.cliente?.cliente_seccion?.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.cliente?.lastName && item.cliente?.firstName) {
                fullName = `${item.cliente?.lastName} ${item.cliente?.firstName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase());
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

    const handlePlusBreak = (id) => {
        console.log(id)
        dispatch(decrementAditionalThunk(id));
         setTimeout(() => {
             dispatch(countAdicionalProcessThunk(school_id));
         }, 500);
        hideRow(id);
    }

    const getServicesAditionalLcv = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/aditional_lcv/aditional_services_lcv/${school_id}`,getConfig())
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const getServicesAditionalById = (serviceId) => {
        if (serviceId === "all") {
            getServicesAditionalLcv();
        } else {
            dispatch(setIsLoading(true));
            axios.get(`/api/aditional_lcv/aditionalServiceById/${serviceId}`,getConfig())
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener datos de la API: ' + error);
                })
                .finally(() => dispatch(setIsLoading(false)))
        }
    }

    return (
        <SchoolLayout value={searchTerm} options={aditionalServicesState.services} onchange={handleSearch}
            view={true} viewOption={true} onChangeSelect={getServicesAditionalById}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Servicios Adicionales'} toOne={`/schools/${school_id}/aditional_services_lcv`} activeOne={true}
                        titleSeven={'Procesados'} countProcces={countProcces} toSeven={`/schools/${school_id}/aditional_servicesProcess_lcv`} activeSeven={false}
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
                                                <td>{adicional.cliente?.lastName} {adicional.cliente?.firstName} </td>
                                                <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(adicional.id)} /></td>
                                                <td>{adicional.total}</td>
                                                <td>{adicional.cliente.cliente_seccion?.name}</td>
                                                <td>{adicional.servicio?.name}</td>

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

export default AdicionalServices;