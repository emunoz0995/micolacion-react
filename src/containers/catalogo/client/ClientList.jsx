import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import axios from 'axios';

//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
import Swal from 'sweetalert2';
//SLICE
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { useParams } from 'react-router-dom';



const ClientList = () => {

    const {school_id} = useParams();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
 

    useEffect(() => {
        getClients();
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

    const handleDelete = (user_id) => {
        deleteClients(user_id);
    };

    const getClients = () => {
        dispatch(setIsLoading(true));
        axios.get(`https://system.micolacion.com/api/clients/${school_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const deleteClients = (user_id) => {
        dispatch(setIsLoading(true));
        axios.delete(`https://system.micolacion.com/api/clients/client/${user_id}`)
            .then(() =>  {
                setSearchTerm("")
                getClients()})
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
                <HeaderSimple title='Clientes' to={`/schools/${school_id}/clients_new`}/>
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff]'>
                                    <th className='w-[25px]'></th>
                                    <th>Cedula</th>
                                    <th>Nombres</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Refrigerios a favor</th>
                                    <th>Almuerzos a favor</th>    
                                    <th></th>
                                </tr>
                            </thead>
                            {searchResults.length > 0 ?
                            <tbody>
                                {searchResults.map(client => (
                                    <tr className='h-[60px]' key={client.id}>
                                        <td className='p-2'><IconStatus active={client.active} /></td>
                                        <td>{client.cedulaCliente}</td>
                                        <td>{client.firstName} {client.lastName}</td>
                                        <td>{client.cliente_seccion?.name}</td>
                                        <td>{client.cliente_servicio?.name}</td>
                                        <td>{client.totalBreakfast} </td>
                                        <td>{client.totalLunch} </td>
                                        <td className='flex gap-1 justify-end items-center h-[60px] p-1'>
                                            <BtnTable action="edit" to={`/schools/${school_id}/clients/${client.id}`} />
                                            <BtnTable title="¿Quieres eliminar este cliente?" action="delete" onclick={() => handleDelete(client.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>:
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

export default ClientList;