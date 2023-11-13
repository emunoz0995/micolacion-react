import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import axios from 'axios';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { getClientThunk } from '../../store/slices/catalogs/clients.slice';
import GeneralReportPDF from './GeneralReportPDF';


const GeneralReportList = () => {

    //const { t } = useTranslation();
    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    //const clientState = useSelector(state => state.clients)
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        getGeneralReport();
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

    const getGeneralReport = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/reports/generalReport/${school_id}`)
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
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Reporte general" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff]'>
                                    <th className='pl-2 w-[250px]'>Representante</th>
                                    <th className='w-[100px]'>Email</th>
                                    <th>Telefono</th>
                                    <th>Nombres</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th className='sticky right-0'></th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(report => (
                                        <tr className='h-[60px]' key={report.id}>
                                            <td className='pl-2'>{report.cliente_representante?.names} </td>
                                            <td>{report.cliente_representante?.email} </td>
                                            <td>{report.cliente_representante?.telefon} </td>
                                            <td>{report.firstName} {report.lastName}</td>
                                            <td>{report.cliente_seccion?.name}</td>
                                            <td>{report.cliente_servicio?.name}</td>
                                            <td className='flex gap-1 justify-end items-center h-[60px] p-1'>
                                                <BtnTable action="view" to={`/schools/${school_id}/general_report_client/${report.id}`}/>
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

export default GeneralReportList;