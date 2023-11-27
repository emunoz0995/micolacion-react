import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import HomeLayout from '../../../layouts/HomeLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import BtnContent from '../../../components/buttons/BtnContent';
import Toast from '../../../utils/toast';
import '../../../App.css';
// SLICES 
import { getServiceThunk, createServiceThunk, updateServiceThunk } from '../../../store/slices/catalogs/services.slice';


const ServiceForm = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { services_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const serviceState = useSelector(state => state.services);
    const dispatch = useDispatch();

    useEffect(() => {
        setValue('price', "0.00")
        if (services_id) {
            dispatch(getServiceThunk(services_id));
        }
    }, []);

    if (serviceState.error.error === "invalid token") {
        Toast.fire({
            icon: 'error',
            title: 'Su sesión ha caducado!, vuelva a iniciar sesión'
        })
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    const onSubmit = (data) => {
        if (services_id) {
            dispatch(updateServiceThunk(services_id, data));
        } else {
            dispatch(createServiceThunk(data));
        }
    };

    if (serviceState.message.message === "resource created successfully" || serviceState.message.message === "resource updated successfully") {
        navigate("/services");
    }

    if (Object.keys(serviceState.service).length !== 0) {
        setValue('name', serviceState.service.name)
        setValue('code', serviceState.service.code)
        setValue('price', serviceState.service.price)
        setValue('isLcv', serviceState.service.isLcv)
        setValue('isCervantes', serviceState.service.isCervantes)
        setValue('isExtra', serviceState.service.isExtra)
        setValue('isAditional', serviceState.service.isAditional)
        setValue('active', serviceState.service.active)
    }

    return (
        <HomeLayout>
            {serviceState.fetching || serviceState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Servicios" />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Nombre"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("name", { required: true })}
                                    placeholder="Nombre"
                                    errors={errors.name && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Codigo"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("code", { required: true })}
                                    placeholder="Codigo"
                                    errors={errors.code && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Precio"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("price")}
                                    placeholder="Precio"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="checkbox"
                                    label="Liceo Campoverde"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("isLcv")}
                                />
                                <InputForm
                                    type="checkbox"
                                    label="Cervantes"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("isCervantes")}
                                />
                                <InputForm
                                    type="checkbox"
                                    label="Extra"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("isExtra")}
                                />
                                <InputForm
                                    type="checkbox"
                                    label="Adicional"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("isAditional")}
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
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                                <BtnContent cancel={true} to={'/services'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ServiceForm;