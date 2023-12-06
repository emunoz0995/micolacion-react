import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
import Toast from '../../utils/toast';
//SLICE
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { paidServiceThunk } from '../../store/slices/procedures/funtions.slice';
import ServiceReceivableCell from '../../components/rates/ServiceReceivableCell';
//RESORCES
import { API_BASE_URL } from '../../store/constans';
import axios from 'axios';

const ServicesReceivable = () => {

    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getServicesReceivable();
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

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePaidService = (clientId, cedulaCliente) => {
        Toast.fire({
            icon: 'success',
            title: 'Pago registrado, ¡ya puede general XML!'
        })
        const data = {
            cedulaCliente
        }
        dispatch(paidServiceThunk(clientId, data));
        hideRow(clientId);
    };

    const getServicesReceivable = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/facturations/services_receivable/${school_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const handleGenerateExcel = () => {
        const url = `${API_BASE_URL}api/reports/serviciosPorCobrar/${school_id}`;
        window.open(url, "_self");

    };

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date).toLocaleString();
        return formattedDate;
    }

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Servicios por cobrar" />
                    <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[85px] flex gap-1 justify-end'>
                        <BtnTable action="xml" funtion={handleGenerateExcel} />
                    </div>
                    <div className="overflow-y-scroll h-[87%] contenedor uppercase">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[150px]'>Fecha</th>
                                    <th className='w-[250px]'>Estudiante</th>
                                    <th className='w-[250px]'>Servicio</th>
                                    <th>Informacion Contacto</th>
                                    <th>Valor</th>
                                    <th className='px-3'>Consumidos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(item => {
                                    if (hiddenRows.includes(item.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-3'>{formatDateToLocal(item.createdAt)} </td>
                                            <td>{item.lastName} {item.firstName}</td>
                                            <td>
                                                <ServiceReceivableCell
                                                    servicioPrincipal={item.history_servicioPrincipal?.name}
                                                    servicioTomado={item.history_servicio?.name}
                                                    totalBreakFast={item.totalBreakfast}
                                                    totalLunch={item.totalLunch}
                                                />
                                            </td>
                                            <td className='p-3'>
                                                <div className='flex flex-col'>
                                                    <p>{item.history_representante?.names}</p>
                                                    <p>{item.history_representante?.email}</p>
                                                    <p>{item.history_representante?.telefon}</p>
                                                </div>

                                            </td>
                                            <td>$ {item.history_servicio?.price}</td>
                                            <td className='pl-8' >
                                                {item.history_servicio?.name === "REFRIGERIO INDIVIDUAL CAMPOVERDE" || item.history_servicio?.name ==="REFRIGERIO INDIVIDUAL CERVANTES" ? item.breakfastConsumed :
                                                    item.history_servicio?.name === "ALMUERZO INDIVIDUAL CAMPOVERDE" || item.history_servicio?.name === "ALMUERZO INDIVIDUAL CERVANTES" ? item.lunchesConsumed :
                                                        item.history_servicio?.isExtra ? item.extrasConsumed : "1"
                                                }
                                            </td>
                                            <td className='gap-1 justify-end p-1'>
                                                <BtnTable action="process" funtion={() => handlePaidService(item.id, item.cedulaCliente)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default ServicesReceivable;