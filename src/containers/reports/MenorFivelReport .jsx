import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
import Swal from 'sweetalert2';
//SLICE
import { getMenor5ReportThunk } from '../../store/slices/reports/reports.slice';
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { renewServiceThunk } from '../../store/slices/procedures/funtions.slice';
//RESORCES
import { API_BASE_URL } from '../../store/constans';




const MenorFiveReport = () => {

    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [totalBreakFast, setTotalBreakFast] = useState('');
    const [totalLunch, setTotalLunch] = useState('');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        getMenor5ReportThunk();
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

    const handleRenewService = (clientId, cedulaCliente) => {
        const data = {
            totalBreakfast: totalBreakFast,
            totalLunch: totalLunch
        }

        if (data.totalBreakfast <= 5 && data.totalLunch <= 5) {
            Toast.fire({
                icon: 'error',
                title: 'Refrigerios y/o Almuerzos sin asignar!'
            })
        } else if (data.totalBreakfast > 5 && data.totalLunch <= 5) {
            Toast.fire({
                icon: 'success',
                title: 'Servicio renovado,!ya puede generar XML!'
            })
            dispatch(renewServiceThunk(cedulaCliente, data));
            hideRow(clientId);
            setTotalBreakFast(0);
            setTotalLunch(0);
        } else if (data.totalBreakfast <= 5 && data.totalLunch > 5) {
            Toast.fire({
                icon: 'success',
                title: 'Servicio renovado !ya puede generar XML!'
            })
            dispatch(renewServiceThunk(cedulaCliente, data));
            hideRow(clientId);
            setTotalBreakFast(0);
            setTotalLunch(0);
        } else {
            Toast.fire({
                icon: 'success',
                title: 'Servicio renovado !ya puede generar XML!'
            })
            dispatch(renewServiceThunk(cedulaCliente, data));
            hideRow(clientId);
            setTotalBreakFast(0);
            setTotalLunch(0);
        }
    };

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const getMenor5ReportThunk = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/reports/menorFiveReport/${school_id}`)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGenerateExcel = () => {
        const url = `${API_BASE_URL}api/reports/reportMenorFive/${school_id}`;
        window.open(url, "_self");
        
    };


    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Servicios por renovar" />
                    <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[85px] flex gap-1 justify-end'>
                        <BtnTable action="xml" funtion={handleGenerateExcel} />
                    </div>
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full uppercase">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Representante</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th className='w-[200px]'>Nombres</th>
                                    <th>Servicio</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Almuerzos a favor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(report => {
                                        if (hiddenRows.includes(report.id)) {
                                            return null;
                                        }
                                        return (
                                            <tr className='h-[60px] uppercase' key={report.id}>
                                                <td className='p-3'>{report.cliente_representante?.names} </td>
                                                <td className='w-[100px]'>{report.cliente_representante?.email} </td>
                                                <td>{report.cliente_representante?.telefon} </td>
                                                <td>{report.lastName} {report.firstName} </td>
                                                <td>{report.cliente_servicio?.name}</td>
                                                <td className='pl-10' >
                                                    <input type="text" className='outline-none border w-[50px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                        defaultValue={report.totalBreakfast}
                                                        onChange={(e) => setTotalBreakFast(e.target.value)} />
                                                </td>
                                                <td className='pl-10'>
                                                    <input type="text" className='outline-none border w-[50px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                        defaultValue={report.totalLunch}
                                                        onChange={(e) => setTotalLunch(e.target.value)} />
                                                </td>
                                                <td className='gap-1 justify-end p-1'>
                                                    <BtnTable action="process" funtion={() => handleRenewService(report.id, report.cedulaCliente)} />
                                                </td>
                                            </tr>
                                        );
                                    })}
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

export default MenorFiveReport;