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
import { decrementLunchThunk } from '../../../store/slices/procedures/almuerzos.slice';


const AlmuerzoSecundaria = () => {
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getAlmuerzosSecundaria();
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let nameMatch = false;
            let lastNameMatch = false;
            let seccionMatch = false;
            if (item.lastName) {
                nameMatch = item.lastName.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.firstName) {
                lastNameMatch = item.firstName.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.firstName) {
                seccionMatch = item.cliente_seccion.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return nameMatch || lastNameMatch || seccionMatch;
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
        hideRow(id);
    }

    const getAlmuerzosSecundaria = () => {
        dispatch(setIsLoading(true));
        axios.get(`https://system.micolacion.com/api/almuerzos_cervantes/lunch_secundaria/${school_id}`)
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
                      titleOne={'Primaria'} toOne={`/schools/${school_id}/almuerzos_primaria`} activeOne={false}
                      titleTwo={'Inicial'} toTwo={`/schools/${school_id}/almuerzos_inicial`} activeTwo={false}
                      titleTree={'Secundaria '} toTree={`/schools/${school_id}/almuerzos_secundaria`} activeTree={true}
                      titleFour={'Eventuales'} toFour={`/schools/${school_id}/almuerzos_eventuales_cervantes`} activeFour={false}
                      titleSix={'Procesados'} toSix={`/schools/${school_id}/almuerzos_procesados_cervantes`} activeSix={false}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[300px]'>Nombre</th>
                                    <th className='flex justify-center'>Almuerzo</th>
                                    <th>Total</th>
                                    <th>Servicio</th>
                                    <th>Nivel</th>
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
                                            <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(almuerzo.cedulaCliente,almuerzo.id)} /></td>
                                            <td>{almuerzo.totalLunch}</td>
                                            <td>{almuerzo.cliente_servicio?.name}</td>
                                            <td>{almuerzo.cliente_seccion?.name}</td>
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