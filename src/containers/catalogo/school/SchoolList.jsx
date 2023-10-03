import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
//SLICE
import { getSchoolsThunk, deleteSchoolThunk } from '../../../store/slices/catalogs/schools.slice';

const SchoolList = () => {

    const { t } = useTranslation();
    const schoolState = useSelector(state => state.schools);
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(getSchoolsThunk());
    }, []);


    if (schoolState.message.message === "resource deleted successfully") {
        dispatch(getSchoolsThunk());
    }

    const handleDelete = (yard_id) => {
        dispatch(deleteSchoolThunk(yard_id));
    };

    return (
        <HomeLayout>
             {schoolState.fetching || schoolState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                <HeaderSimple title='Colegios' to='/schools_new' />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[15px]'></th>
                                    <th>Nombre</th> 
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {schoolState.schools.map(school => (
                                    <tr key={school.id}>
                                        <td><IconStatus active={school.active} /></td>
                                        <td>{school.name}</td>                        
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/schools/${school.id}`} />
                                            <BtnTable title="¿Quieres eliminar este colegio?" action="delete" onclick={() => handleDelete(school.id)} />
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

export default SchoolList;