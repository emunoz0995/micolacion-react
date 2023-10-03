import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
//SLICE
import { getClientsThunk, deleteClientThunk } from '../../../store/slices/catalogs/clients.slice';
import { useParams } from 'react-router-dom';


const ClientList = () => {

    const { t } = useTranslation();
    const {school_id} = useParams();
    const clientState = useSelector(state => state.clients);
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(getClientsThunk(school_id));
    }, []);


    if (clientState.message.message === "resource deleted successfully") {
        dispatch(getClientsThunk(school_id));
    }

    const handleDelete = (user_id) => {
        dispatch(deleteClientThunk(user_id));
    };


    return (
        <SchoolLayout>
             {clientState.fetching || clientState.processing ? (
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
                            <tbody>
                                {clientState.clients.map(client => (
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
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default ClientList;