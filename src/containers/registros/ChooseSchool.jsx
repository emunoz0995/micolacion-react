import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
//UI
import HomeLayout from '../../layouts/HomeLayout';
import MainLoader from '../../components/Loaders/MainLoader';
import HeaderForm from '../../components/headers/catalogs/HeaderForm'
import LogoLCV from '../../assets/Logo.png'
import LogoCervantes from '../../assets/cervantes.png'
//SLICE
import { getSchoolsThunk } from '../../store/slices/catalogs/schools.slice';
import { Link } from 'react-router-dom';


const ChooseSchool = () => {

    const { t } = useTranslation();
    const schoolState = useSelector(state => state.schools);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSchoolsThunk());
    }, []);

    if (schoolState.message.message === "resource deleted successfully") {
        dispatch(getRegistersThunk());
    }

    console.log(schoolState)

    return (
        <HomeLayout>
            {schoolState.fetching || schoolState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <HeaderForm title='Escoja la empresa a la que desea ingresar' />
                    <div className='flex gap-3'>
                        {schoolState.schools.map(school => (
                            <Link key={school.id} to={school.name === "Liceo Campoverde" ? `schools/${school.id}/refrigerios_bm`:''} className="w-[300px] bg-base-100 shadow-xl image-full hover:bg-slate-200 hover:delay-75">
                                <img src={school.name === "Liceo Campoverde" ? LogoLCV : LogoCervantes} alt="lcv" />
                            </Link>
                        ))
                        }
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ChooseSchool;