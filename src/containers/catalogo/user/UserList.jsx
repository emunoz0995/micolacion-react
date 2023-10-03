import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
//SLICE
import { getUsersThunk, deleteUserThunk } from '../../../store/slices/catalogs/users.slice';
import axios from 'axios';

const UserList = () => {

    const { t } = useTranslation();
    const userState = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunk());
    }, []);


    if (userState.message.message === "resource deleted successfully") {
        dispatch(getUsersThunk());
    }

    const handleDelete = (user_id) => {
        dispatch(deleteUserThunk(user_id));
    };

    return (
        <HomeLayout>
             {userState.fetching || userState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                <HeaderSimple title='Usuarios' to='/users_new' />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[15px]'></th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userState.users.map(user => (
                                    <tr key={user.id}>
                                        <td><IconStatus active={user.active} /></td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.user_rol.name}</td>
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/users/${user.id}`} />
                                            <BtnTable title={t("user_delete")} action="delete" onclick={() => handleDelete(user.id)} />
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

export default UserList;