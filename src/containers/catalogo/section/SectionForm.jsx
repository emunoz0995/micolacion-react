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
import { getSectionThunk, createSectionThunk, updateSectionThunk } from '../../../store/slices/catalogs/sections.slice';
import { getSchoolsThunk } from '../../../store/slices/catalogs/schools.slice';


const SectionForm = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { sections_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const sectionState = useSelector(state => state.sections);
    const schoolState = useSelector(state => state.schools);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSchoolsThunk());
        if (sections_id) {
            dispatch(getSectionThunk(sections_id));
        }
    }, []);

    if (sectionState.error.error === "invalid token") {
        Toast.fire({
            icon: 'error',
            title: 'Su sesión ha caducado!, vuelva a iniciar sesión'
        })
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    const onSubmit = (data) => {
        if (sections_id) {
            dispatch(updateSectionThunk(sections_id, data));
        } else {
            dispatch(createSectionThunk(data));
        }
    };

    if (sectionState.message.message === "resource created successfully" || sectionState.message.message === "resource updated successfully") {
        navigate("/sections");
    }

    if (Object.keys(sectionState.section).length !== 0) {
        setValue('name', sectionState.section.name)
        setValue('active', sectionState.section.active)
        setValue('isLcv', sectionState.section.isLcv)
        setValue('isCervantes', sectionState.section.isCervantes);
        setValue('isDiscovery', serviceState.service.isDiscovery)

    }

    return (
        <HomeLayout>
            {sectionState.fetching || schoolState.fetching || sectionState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Secciones" />
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
                            </div>
                            <div className='grid grid-cols-3 gap-2 p-2'>
                                {
                                    schoolState.schools?.map(school => (
                                        <InputForm
                                            type="checkbox"
                                            label={school.name}
                                            input="checkbox"
                                            spam={false}
                                            cols={1}
                                            register={register(school.code)}
                                        />
                                    ))
                                }
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                                <BtnContent cancel={true} to={'/sections'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default SectionForm;