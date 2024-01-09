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
import DropdownForm from '../../../components/Inputs/formInput/DropdonwForm';
import Toast from '../../../utils/toast';
import '../../../App.css';
// SLICES 
import { getUserThunk, createUserThunk, updateUserThunk } from '../../../store/slices/catalogs/users.slice';
//RESOURCE
import { roles } from '../../../resources/optionsList';


const UserForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const userState = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user_id) {
            dispatch(getUserThunk(user_id));
        }
    }, []);

    if (userState.error.error === "invalid token") {
        Toast.fire({
            icon: 'error',
            title: 'Su sesión ha caducado!, vuelva a iniciar sesión'
        })
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    const onSubmit = (data) => {
        if (user_id) {
            dispatch(updateUserThunk(user_id, data));
        } else {
            dispatch(createUserThunk(data));
        }
    };

    if (userState.message.message === "resource created successfully" || userState.message.message === "resource updated successfully") {
        navigate("/users");
    }

    if (Object.keys(userState.user).length !== 0) {
        setValue('firstName', userState.user.first_name)
        setValue('lastName', userState.user.last_name)
        setValue('roleId', userState.user.role_id)
        setValue('email', userState.user.email)
        setValue('active', userState.user.active)
    }
    return (
        <HomeLayout>
            {userState.fetching || userState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Usuarios" />
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Nombre"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("firstName", { required: true })}
                                    placeholder="Nombre"
                                    errors={errors.firstName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Apellido"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("lastName", { required: true })}
                                    placeholder="Apellido"
                                    errors={errors.lastName && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownForm
                                    label="Rol"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("roleId", { required: true })}
                                    options={roles}
                                    errors={errors.roleId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
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
                                {user_id ? ""
:                                    <InputForm
                                        type="text"
                                        label="Password"
                                        input="input"
                                        spam={true}
                                        cols={1}
                                        register={register("password", { required: true })}
                                        placeholder="Password"
                                        errors={errors.email && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                    />
                                }
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
                                <BtnContent cancel={true} to={'/users'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default UserForm;