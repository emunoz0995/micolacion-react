import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import axios from 'axios';

//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import SchoolLayout from '../../../layouts/SchoolsLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import HeaderSection from '../../../components/headers/catalogs/HeaderSection';
import BtnContent from '../../../components/buttons/BtnContent';
import DropdownForm from '../../../components/Inputs/formInput/DropdonwForm';
import { FaCircle, FaPlus, FaTrash } from 'react-icons/fa';
import '../../../App.css';
import Toast from '../../../utils/toast';
// SLICES 
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { getServicesBySchoolThunk } from '../../../store/slices/catalogs/services.slice';
import { getAditionalServicesBySchoolThunk } from '../../../store/slices/catalogs/aditionalServices.slice';
import { getSectionsBySchoolThunk } from '../../../store/slices/catalogs/sections.slice';
import getConfig from '../../../utils/getConfig';


const ClientForm = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { client_id, school_id } = useParams();
    const [data, setData] = useState([]);
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const isLoading = useSelector(state => state.isLoadingSlice);
    const serviceState = useSelector(state => state.services);
    const aditionalServicesState = useSelector(state => state.aditionalServices)
    const sectionsState = useSelector(state => state.sections);
    const [clientState, setClientState] = useState("");
    const [items, setItems] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [text, setText] = useState('');
    const [total, setTotal] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setValue('totalBreakfast', 0)
        setValue('totalLunch', 0)
        dispatch(getServicesBySchoolThunk(school_id))
        dispatch(getSectionsBySchoolThunk(school_id))
        dispatch(getAditionalServicesBySchoolThunk(school_id));
        if (client_id) {
            getClient();
        }
    }, []);

    const getClient = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/clients/client/${client_id}`)
            .then(response => {
                setData(response.data?.result);
                setItems(response.data?.studentServices);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const agregarItem = () => {
        if (serviceId && total) {
            const newItem = { servicio: { name: text }, serviceId, total };
            setItems([...items, newItem]);
            setServiceId('');
            setTotal('');
            resetSelect();

        }
    };

    function mostrarSeleccion() {
        var selectElement = document.getElementById("miSelect");
        var valorSeleccionado = selectElement.value;
        var textoSeleccionado = selectElement.options[selectElement.selectedIndex].text;
        setServiceId(valorSeleccionado);
        setText(textoSeleccionado)
    }

    function resetSelect() {
        var selectElement = document.getElementById("miSelect");
        selectElement.value = "";
        for (var i = 0; i < selectElement.options.length; i++) {
            selectElement.options[i].removeAttribute("selected");
        }
    }


    const onSubmit = (data) => {
        if (client_id) {
            const allData = { data, items }
            dispatch(setIsLoading(true));
            axios.put(`/api/clients/client/${client_id}`, allData)
                .then(res => { setClientState(res.data) })
                .catch(error => {
                    setClientState(error.response?.data)
                })
                .finally(() => dispatch(setIsLoading(false)))
        } else {
            const allData = { data, items }
            dispatch(setIsLoading(true));
            axios.post(`/api/clients/client`, allData)
                .then(res => { setClientState(res.data) })
                .catch(error => {
                    setClientState(error.response?.data)
                })
                .finally(() => dispatch(setIsLoading(false)))
        }
    };

    const deleteService = (service_id) => {
        axios.delete(`/api/services/servicesByStudent/${service_id}`,getConfig())
            .then(() => {
                getClient();
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
    }

    if (clientState.message === "resource created successfully" || clientState.message === "resource updated successfully") {
        navigate(`/schools/${school_id}/clients`);
    }

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
        setValue('representativeId', data.cliente_representante.id)
        setValue('cedulaRepresentante', data.cliente_representante.cedulaRepresentante)
        setValue('names', data.cliente_representante.names)
        setValue('email', data.cliente_representante.email)
        setValue('telefon', data.cliente_representante.telefon)
        setValue('adress', data.cliente_representante.adress)
    }

    if (clientState === "Validation error") {
        Toast.fire({
            icon: 'error',
            title: 'El estudiante ya se encuentra registrado!'
        })
    }

    return (
        <SchoolLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Estudiantes" />
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
                            <div className='flex gap-2 p-2 mb-3'>
                                <DropdownForm
                                    label="Sección"
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
                            <HeaderSection title="Servicios adicionales" />
                            <div className='flex gap-2 p-2 w-[50%] items-center'>
                                <div className='flex flex-col w-[50%] cols'>
                                    <label className='text-sm flex items-center m-1'>
                                        <p>Servicio</p>
                                    </label>
                                    <select id="miSelect" onChange={mostrarSeleccion} className="input input-sm outline-none input-bordered focus:outline-none focus:ring-1 rounded-md shadow-base-300 shadow-lg">
                                        <option value="">Seleccione</option>
                                        {aditionalServicesState.services.map((service) => (
                                            <option key={service.id} value={service.id}>{service.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={`flex flex-col w-full cols`} >
                                    <label className="text-sm flex items-center m-1">
                                        <p>Total</p>
                                    </label>
                                    <input
                                        className={`input input-sm outline-none input-bordered focus:outline-none focus:ring-1 rounded-md shadow-base-300 shadow-lg`}
                                        onChange={(e) => setTotal(e.target.value)}
                                        value={total}
                                    />
                                </div>
                                <button onClick={agregarItem} type='button' className="bg-sky-400  hover:bg-sky-600 text-white transition-all active:scale-95 p-2 
                                    rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center mt-7 gap-1 justify-center text-sm">
                                    <FaPlus />
                                </button>
                            </div>
                            {items ?
                                items.map(item => (
                                    <div key={item.id} className='flex gap-2 p-2 w-[50%] border'>
                                        <div className={`flex flex-col w-full cols`} >
                                            <label className="text-sm flex items-center m-1 gap-2">
                                            <FaCircle size={"10px"} color='green'/>
                                                <p>{item.servicio?.name}</p>
                                            </label>

                                        </div>
                                        <div className={`flex flex-col w-full cols`} >
                                            <label className="text-sm flex items-center m-1">
                                                <p>{item.total}</p>
                                            </label>

                                        </div>
                                        <button onClick={()=>deleteService(item.id)} type='button' className="bg-red-400  hover:bg-red-600 text-white transition-all active:scale-95 p-2 
                                             rounded-full font-bold shadow-lg shadow-base-content/30 flex items-center mt-1 gap-1 justify-center text-sm">
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                                : ""
                            }
                            <div className='flex gap-2 p-2 w-full'>
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
                                <input type="text" {...register('representativeId')} hidden />
                                <InputForm
                                    type="text"
                                    label="Cédula"
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
                                    label="Teléfono"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("telefon", { required: true })}
                                    placeholder="Telefono"
                                    errors={errors.telefon && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Dirección"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("adress")}
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