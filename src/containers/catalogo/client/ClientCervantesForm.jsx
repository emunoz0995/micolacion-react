import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import logo from '../../../assets/colacion.png'
import InputForm from '../../../components/Inputs/formInput/InputForm';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import HeaderSection from '../../../components/headers/catalogs/HeaderSection';
import BtnContent from '../../../components/buttons/BtnContent';
import DropdownForm from '../../../components/Inputs/formInput/DropdonwForm';

import '../../../App.css';
// SLICES 
import { createClientForUserThunk } from '../../../store/slices/catalogs/clients.slice';
import { getSectionsBySchoolThunk } from '../../../store/slices/catalogs/sections.slice';
import Swal from 'sweetalert2';


const ClientCervantesForm = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { school_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const clientState = useSelector(state => state.clients);
    const sectionsState = useSelector(state => state.sections)
    const dispatch = useDispatch();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        dispatch(getSectionsBySchoolThunk(school_id))
    }, []);


    const onSubmit = (data) => {
        dispatch(createClientForUserThunk(data));
    };

    if (clientState.message.message === "resource created successfully") {
        Toast.fire({
            icon: 'success',
            title: 'El estudiante ha sido registrado correctamente!'
        }).then(function (result) {
            setValue('cedulaCliente', "")
            setValue('firstName', "")
            setValue('lastName', "")
            setValue('sectionId', "")
            setValue('cedulaRepresentante', "")
            setValue('names', "")
            setValue('email', "")
            setValue('telefon', "")
            setValue('adress', "")
            setValue('readPolitics', "")
        })
    }

    if (clientState.error) {
        Toast.fire({
            icon: 'error',
            title: 'El estudiante ya se encuentra registrado!'
        })
    }

    return (
        <div
            className={`text-[#004841 ] relative transition-all h-full w-full min-h-screen bg-cover bg-center  flex justify-center `}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60 backdrop-blur-sm"></div>
            <div className="w-full mt-2 transition-all sm:w-2/3 md:w-[70%] h-full bg-[#EAFDFA]/60 sm:bg-[#EAFDFA]/50 backdrop-blur-lg shadow-lg shadow-gray-700 flex justify-center">
                <div className="w-full px-5 pt-[3px]">
                    <HeaderForm title="FORMULARIO DE REGISTRO ESTUDIANTES Y REPRESENTANTE ECONOMICO" />
                    <div className='h-[90%] sm:overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <HeaderSection title="Datos estudiante" />
                            <div className='flex flex-col sm:flex-row gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Cédula"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("cedulaCliente", { required: true })}
                                    placeholder="Cédula"
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
                                    errors={errors.lastName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row gap-2 p-2 mb-2'>
                                <DropdownForm
                                    label="Sección"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("sectionId", { required: true })}
                                    options={sectionsState.sections}
                                    errors={errors.sectionId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <HeaderSection title="Datos representante" />
                            <div className='flex flex-col sm:flex-row gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Cédula / Ruc"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("cedulaRepresentante", { required: true })}
                                    placeholder="Cédula / Ruc"
                                    errors={errors.cedulaRepresentante && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Nombre y Apellido"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("names", { required: true })}
                                    placeholder="Nombre y Apellido"
                                    errors={errors.names && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />

                            </div>
                            <div className='flex flex-col sm:flex-row gap-2 p-2'>
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
                                <input type="hidden" value={school_id} {...register('schoolId')} />
                                <InputForm
                                    type="text"
                                    label="Teléfono"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("telefon")}
                                    placeholder="Teléfono"
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row gap-2 p-2'>
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
                            <div className='flex flex-col sm:flex-row gap-2 p-2'>
                                <InputForm
                                    type="checkbox"
                                    label="He leído y acepto las"
                                    link=" Políticas de privacidad"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("readPolitics", { required: true })}
                                    errors={errors.readPolitics && (<span className="text-red-500 text-xs">Debe aceptar la politica de privacidad para continuar</span>)}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="hidden sm:inline sm:absolute sm:w-[180px] sm:h-[20px] sm:z-10 sm:translate-x-0  sm:top-[85%] sm:left-5 sm:rotate-[0.5deg] ">
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default ClientCervantesForm;