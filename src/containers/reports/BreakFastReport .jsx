import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
import BtnTable from '../../components/buttons/BtnTable';
//SLICE
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { API_BASE_URL } from '../../store/constans';
import axios from 'axios';



const BreakFastReport = () => {

    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getBreakFastReport();
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

    const getBreakFastReport = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/reports/reportBreakFast/${school_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const handleGenerateExcel = () => {
        const url = `${API_BASE_URL}api/reports/breakfast/${school_id}`;
        window.open(url, "_self");

    };

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Refirgerios diarios" />
                    <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[85px] flex gap-1 justify-end'>
                        <BtnTable action="xml" funtion={handleGenerateExcel} />
                    </div>
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Nombres</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Refrigerios diarios</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Extras consumidos</th>
                                    <th>Estatus pago</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(report => (
                                        <tr className='h-[60px]' key={report.id}>
                                            <td className='p-3'>{report.firstName} {report.lastName} </td>
                                            <td>{report.cliente_seccion?.name}</td>
                                            <td>{report.cliente_servicio?.name}</td>
                                            <td>{report.breakfastConsumed} </td>
                                            <td>{report.totalBreakfast} </td>
                                            <td>{report.totalExtras} </td>
                                            <td>{report.paidService ? "Canselado" : "Pago pendiente"} </td>
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

export default BreakFastReport;