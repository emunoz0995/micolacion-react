import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
//SLICES
import { getSchoolThunk } from '../../../store/slices/catalogs/schools.slice';
import { getRefrigeriosBMThunk } from '../../../store/slices/registers/refrigeriosLcv.slice';
import { decrementBreakFastThunk } from '../../../store/slices/procedures/refrigerios.slice';
const RefrigerioBM = () => {
    const { school_id } = useParams();
    const schoolState = useSelector(state => state.schools);
    const refrigeriosState = useSelector(state => state.refrigeriosLcv);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);

    useEffect(() => {
        dispatch(getSchoolThunk(school_id));
        dispatch(getRefrigeriosBMThunk(school_id));
    }, []);

    if (Object.keys(schoolState.school).length !== 0) {
        let schoolInfo = {
            name: `${schoolState.school.name}`,
            active: `${schoolState.school.active}`,
            id: `${schoolState.school.id}`,
        };

        localStorage.setItem("schoolInfo", JSON.stringify(schoolInfo));
    }

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePlusBreak = (cedula, id) => {
        dispatch(decrementBreakFastThunk(cedula));
        hideRow(id);
    }
    
    console.log(refrigeriosState)
    return (
        <SchoolLayout>
             {refrigeriosState.fetching || refrigeriosState.processing ? (
                <MainLoader />
            ) : (
            <div className="mx-5 my-5 w-full">
                <TabParts
                    titleOne={'Basica Media'} toOne={`/schools/${school_id}/refrigerios_bm`} activeOne={true}
                    titleTwo={'Basica Elemental'} toTwo={`/schools/${school_id}/refrigerios_be`} activeTwo={false}
                    titleTree={'Basica BS-BGU '} toTree={`/schools/${school_id}/refrigerios_bs_bgu`} activeTree={false}
                    titleFour={'Eventuales'} toFour={`/schools/${school_id}/refrigerios_eventuales`} activeFour={false}
                    titleFive={'Personal'} toFive={`/schools/${school_id}/refrigerios_personal`} activeFive={false}
                    titleSix={'Procesados'} toSix={`/schools/${school_id}/refrigerios_procesados`} activeSix={false}
                />
                <div className="overflow-y-scroll h-[87%] contenedor">
                    <table className="text-[13px] table table-zebra w-full">
                        <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                            <tr>
                                <th className='w-[300px]'>Nombre</th>
                                <th className='flex justify-center'>Refrigerio</th>
                                <th>Total</th>
                                <th>Servicio</th>
                                <th>Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                                {refrigeriosState.refrigerios.map(refrigerio => {
                                    if (hiddenRows.includes(refrigerio.id)) {
                                        return null; 
                                    }
                                    return (
                                        <tr key={refrigerio.id}>
                                            <td>{refrigerio.firstName} {refrigerio.lastName}</td>
                                            <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(refrigerio.cedulaCliente,refrigerio.id)} /></td>
                                            <td>{refrigerio.totalBreakfast}</td>
                                            <td>{refrigerio.cliente_servicio?.name}</td>
                                            <td>{refrigerio.cliente_seccion?.name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                    </table>
                </div>
            </div>
            )}
        </SchoolLayout>
    );
};

export default RefrigerioBM;