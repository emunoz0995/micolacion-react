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
import '../../../App.css';
// SLICES 
import { getSchoolThunk, createSchoolThunk, updateSchoolThunk } from '../../../store/slices/catalogs/schools.slice';


const SchoolForm = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const {schools_id} = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const schoolState = useSelector(state => state.schools);
    const dispatch = useDispatch();

    useEffect(() => {
        if (schools_id) {
            dispatch(getSchoolThunk(schools_id));
        }
    }, []);


    const onSubmit = (data) => {
        if (schools_id) {
            dispatch(updateSchoolThunk(schools_id, data));
        } else {
            dispatch(createSchoolThunk(data));
        }
    };

     if (schoolState.message.message === "resource created successfully" || schoolState.message.message === "resource updated successfully") {
         navigate("/schools");
     }

     if (Object.keys(schoolState.school).length !== 0) {
         setValue('name', schoolState.school.name)
         setValue('active', schoolState.school.active)
     }


     return (
        <HomeLayout>
             {schoolState.fetching || schoolState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Colegios"/>
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
                                <BtnContent cancel={true} to={'/schools'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default SchoolForm;