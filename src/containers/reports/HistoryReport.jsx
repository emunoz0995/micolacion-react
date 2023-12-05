import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { setIsLoading } from '../../store/slices/isLoading.slice';
//RESORCES
import { API_BASE_URL } from '../../store/constans';
import axios from 'axios';

const HistoryReport = () => {

    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getHistoryReportThunk();
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let seccionMatch = false;
            let fullName = false

            if (item.cliente_seccion?.name) {
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

    const getHistoryReportThunk = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/reports/reportHistory/${school_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    const handleGenerateExcel = () => {
        const url = `${API_BASE_URL}api/reports/history/${school_id}`;
        window.open(url, "_self");

    };

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Historial de consumos" />
                    <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[85px] flex gap-1 justify-end'>
                        <BtnTable action="xml" funtion={handleGenerateExcel} />
                    </div>
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='w-[200px] p-2'>Fecha y Hora</th>
                                    <th className='w-[200px] p-2'>Estudiante</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Consumidos</th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(item => (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-2'>{formatDateToLocal(item.createdAt)}</td>
                                            <td className='p-2'>{item.lastName} {item.firstName}</td>
                                            <td>{item.history_seccion?.name}</td>
                                            <td>{item.history_servicio?.name}</td>
                                            <td className='pl-8' >
                                                { 
                                                    item.history_servicio.isAditional ? item.aditionalConsumed :
                                                    item.history_servicio?.isExtra ? item.extrasConsumed : 
                                                    item.history_servicio?.name === "REFRIGERIO INDIVIDUAL CAMPOVERDE" || item.history_servicio?.name === "REFRIGERIO INDIVIDUAL CERVANTES" ? item.breakfastConsumed :
                                                    item.history_servicio?.name === "ALMUERZO INDIVIDUAL CAMPOVERDE" || item.history_servicio?.name ==="ALMUERZO INDIVIDUAL CERVANTES" ? item.lunchesConsumed : ""
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> :
                                <div className="absolute z-10 top-[400px] left-8 sm:top-[350px] sm:left-[610px]">
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

export default HistoryReport;