import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
import Toast from '../../../utils/toast';
//SLICE
import { getServicesThunk, deleteServiceThunk } from '../../../store/slices/catalogs/services.slice';
import HeaderComplete from '../../../components/headers/catalogs/HeaderComplete';

const ServiceList = () => {

    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const serviceState = useSelector(state => state.services);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getServicesThunk());
    }, []);

    if (serviceState.message.message === "resource deleted successfully") {
        dispatch(getServicesThunk());
    }

    const handleDelete = (yard_id) => {
        dispatch(deleteServiceThunk(yard_id));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItinerary = searchTerm
        ? serviceState.services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : serviceState.services;

    if (serviceState.error.error === "invalid token") {
        Toast.fire({
            icon: 'error',
            title: 'Su sesión ha caducado!, vuelva a iniciar sesión'
        })
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    return (
        <HomeLayout>
            {serviceState.fetching || serviceState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <HeaderComplete
                        title='Servicios'
                        to='/services_new'
                        placeholder={"Buscar ..."}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[15px]'></th>
                                    <th>Nombre</th>
                                    <th>Codigo</th>
                                    <th>Precio</th>
                                    <th>Colegio</th>
                                    <th>Tipo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItinerary.map(service => (
                                    <tr key={service.id}>
                                        <td><IconStatus active={service.active} /></td>
                                        <td>{service.name}</td>
                                        <td>{service.code}</td>
                                        <td>{service.price}</td>
                                        <td>
                                            {
                                                service.isCervantes && service.isLcv ? "Cervantes - Liceo Campo Verde" :
                                                    service.isCervantes ? "Cervantes" :
                                                        service.isLcv ? "Liceo Campo Verde" :
                                                            ""
                                            }
                                        </td>
                                        <td>{
                                            service.isExtra ? "Extra" :
                                                service.isAditional ? "Adicional" :
                                                    "Principal"
                                        }</td>
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/services/${service.id}`} />
                                            <BtnTable title="¿Quieres eliminar este servicio?" action="delete" onclick={() => handleDelete(service.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ServiceList;