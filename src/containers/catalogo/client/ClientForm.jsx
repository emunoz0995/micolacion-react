import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import SchoolLayout from '../../../layouts/SchoolsLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import HeaderSection from '../../../components/headers/catalogs/HeaderSection';
import BtnContent from '../../../components/buttons/BtnContent';
import '../../../App.css';
// SLICES 
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { createClientThunk, updateClientThunk } from '../../../store/slices/catalogs/clients.slice';
import { getServicesBySchoolThunk } from '../../../store/slices/catalogs/services.slice';
import { getSectionsBySchoolThunk } from '../../../store/slices/catalogs/sections.slice';
import DropdownForm from '../../../components/Inputs/formInput/DropdonwForm';
import axios from 'axios';
import Swal from 'sweetalert2';


const ClientForm = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { client_id, school_id } = useParams();
    const [data, setData] = useState([]);
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const [clientState, setClientState] = useState("");
    const serviceState = useSelector(state => state.services);
    const sectionsState = useSelector(state => state.sections);
    const dispatch = useDispatch();

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
        setValue('totalBreakfast', 0)
        setValue('totalLunch', 0)
        dispatch(getServicesBySchoolThunk(school_id))
        dispatch(getSectionsBySchoolThunk(school_id))
        if (client_id) {
            getClient(client_id);
        }
    }, []);

    const getClient = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/clients/client/${client_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }


    const onSubmit = (data) => {
        if (client_id) {
            dispatch(setIsLoading(true));
            axios.put(`/api/clients/client/${client_id}`, data)
                .then(res => { setClientState(res.data) })
                .catch(error => {
                    setClientState(error.response?.data)
                })
                .finally(() => dispatch(setIsLoading(false)))
        } else {
            dispatch(setIsLoading(true));
            axios.post(`/api/clients/client`, data)
                .then(res => { setClientState(res.data) })
                .catch(error => {
                    setClientState(error.response?.data)
                })
                .finally(() => dispatch(setIsLoading(false)))
        }
    };

    if (clientState.message === "resource created successfully" || clientState.message === "resource updated successfully") {
        navigate(`/schools/${school_id}/clients`);
    }

    console.log(clientState)

    if (Object.keys(data).length > 0) {
        setValue('cedulaCliente', data.cedulaCliente)
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
        setValue('sectionId', data.sectionId)
        setValue('schoolId', data.schoolId)
        setValue('serviceId', data.serviceId)
        setValue('totalBreakfast', data.totalBreakfast)
        setValue('totalLunch', data.totalLunch)
        setValue('active', data.active)
        setValue('cedulaRepresentante', data.cliente_representante.cedulaRepresentante)
        setValue('names', data.cliente_representante.names)
        setValue('email', data.cliente_representante.email)
        setValue('telefon', data.cliente_representante.telefon)
        setValue('adress', data.cliente_representante.adress)
    }

    return (
        <SchoolLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Clientes" />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <HeaderSection title="Datos estudiante" />
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Cedula"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("cedulaCliente", { required: true })}
                                    placeholder="Cedula"
                                    errors={errors.cedulaCliente && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Nombres"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("firstName", { required: true })}
                                    placeholder="Nombres"
                                    errors={errors.firstName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Apellidos"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("lastName", { required: true })}
                                    placeholder="lastName"
                                    errors={errors.name && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <DropdownForm
                                    label="Seccion"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("sectionId", { required: true })}
                                    options={sectionsState.sections}
                                    errors={errors.sectionId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownForm
                                    label="Servicio"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("serviceId", { required: true })}
                                    options={serviceState.services}
                                    errors={errors.serviceId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <input type="hidden" value={school_id} {...register('schoolId')} />

                                <InputForm
                                    type="text"
                                    label="Refrigerios a favor"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("totalBreakfast")}
                                    placeholder="0"
                                />
                                <InputForm
                                    type="text"
                                    label="Almuerzos a favor"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("totalLunch")}
                                    placeholder="0"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="checkbox"
                                    label="Activo"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("active")}
                                />
                            </div>
                            <HeaderSection title="Datos representante" />
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Cedula"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("cedulaRepresentante", { required: true })}
                                    placeholder="Cedula"
                                    errors={errors.cedulaRepresentante && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Nombres"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("names", { required: true })}
                                    placeholder="Nombres"
                                    errors={errors.names && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />

                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Email"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("email", { required: true })}
                                    placeholder="Email"
                                    errors={errors.email && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Telefono"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("telefon", { required: true })}
                                    placeholder="Telefono"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Dirección"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("adress", { required: true })}
                                    placeholder="Dirección"
                                />
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                                <BtnContent cancel={true} to={`/schools/${school_id}/clients`}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default ClientForm;