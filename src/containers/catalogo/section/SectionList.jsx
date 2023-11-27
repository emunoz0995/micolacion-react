import React, { useEffect } from 'react';
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
import { getSectionsThunk, deleteSectionThunk } from '../../../store/slices/catalogs/sections.slice';


const SectionList = () => {

    const { t } = useTranslation();
    const sectionState = useSelector(state => state.sections);
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(getSectionsThunk());
    }, []);


    if (sectionState.message.message === "resource deleted successfully") {
        dispatch(getSectionsThunk());
    }

    const handleDelete = (section_id) => {
        dispatch(deleteSectionThunk(section_id));
    };

    if (sectionState.error.error === "invalid token") {
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
             {sectionState.fetching || sectionState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                <HeaderSimple title='Secciones' to='/sections_new' />
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
                                {sectionState.sections.map(section => (
                                    <tr key={section.id}>
                                        <td><IconStatus active={section.active} /></td>
                                        <td>{section.name}</td>                        
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/sections/${section.id}`} />
                                            <BtnTable title="¿Quieres eliminar este colegio?" action="delete" onclick={() => handleDelete(section.id)} />
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

export default SectionList;