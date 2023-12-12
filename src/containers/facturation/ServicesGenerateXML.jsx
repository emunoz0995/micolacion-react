import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
import GeneralRateCell from '../../components/rates/GeneralRateCell';
import ServiceNameCell from '../../components/rates/ServiceNameCell';
import ServicePriceCell from '../../components/rates/ServicePriceCell';
//SLICE
import { setIsLoading } from '../../store/slices/isLoading.slice';

const ServicesGenerateXML = () => {

    const { school_id } = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getServiceGenereteXML();
    }, []);

    useEffect(() => {
        const results = data.filter(item => {
            let fullName = false
            for (let i=0; i < (item.representante_cliente).length; i++) {
                if (item.representante_cliente[i]?.lastName && item.representante_cliente[i]?.firstName) {
                    fullName = `${item.representante_cliente[i]?.lastName} ${item.representante_cliente[i]?.firstName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase());
                }
                return fullName;
            }
        });
        setSearchResults(results);
    }, [searchTerm, data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getServiceGenereteXML = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/facturations/services_generateXML/${school_id}`)
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
                    <Header title="Generar XML" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Representante</th>
                                    <th>Email</th>
                                    <th className='w-[100px]'>Telefono</th>
                                    <th className='w-[220px]'>Estudiante/s</th>
                                    <th>Servicio</th>
                                    <th>Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                                <tbody>
                                    {searchResults.map(item => (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-3'>{item.names} </td>
                                            <td className='w-[150px]'>{item.email} </td>
                                            <td>{item.telefon} </td>
                                            <td> {item.representante_cliente?.map(representado => (
                                                <GeneralRateCell key={representado.id} client={representado.lastName + " " + representado.firstName} />
                                            ))
                                            }</td>
                                            <td> {item.representante_cliente?.map(representado => (
                                                <ServiceNameCell key={representado.id} client={representado.cliente_servicio?.name} />
                                            ))
                                            }</td>
                                            <td> {item.representante_cliente?.map(representado => (
                                                <ServicePriceCell key={representado.id} client={representado.cliente_servicio?.price} />
                                            ))
                                            }</td>
                                            <td >
                                                <div className='flex gap-1 justify-end items-center p-1'>
                                                    <BtnTable action="view" to={`/schools/${school_id}/factura_XML/${item.id}`} />
                                                </div>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                                :
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

export default ServicesGenerateXML;