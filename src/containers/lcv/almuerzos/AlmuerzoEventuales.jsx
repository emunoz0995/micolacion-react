import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
//SLICES
import { getAlmuerzosEventualesThunk } from '../../../store/slices/registers/almuerzosLcv.slice';
import { incrementLunchThunk } from '../../../store/slices/procedures/almuerzos.slice';

const AlmuerzoEventuales = () => {
    const { school_id } = useParams();
    const almuerzosState = useSelector(state => state.almuerzosLcv);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);

    useEffect(() => {
        dispatch(getAlmuerzosEventualesThunk(school_id));
    }, []);


    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePlusBreak = (cedula, id) => {
        dispatch(incrementLunchThunk(cedula));
        hideRow(id);
    }

    return (
        <SchoolLayout>
            {almuerzosState.fetching || almuerzosState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Basica Media'} toOne={`/schools/${school_id}/almuerzos_bm`} activeOne={false}
                        titleTwo={'Basica Elemental'} toTwo={`/schools/${school_id}/almuerzos_be`} activeTwo={false}
                        titleTree={'Basica BS-BGU '} toTree={`/schools/${school_id}/almuerzos_bs_bgu`} activeTree={false}
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/almuerzos_eventuales`} activeFour={true}
                        titleFive={'Personal'} toFive={`/schools/${school_id}/almuerzos_personal`} activeFive={false}
                        titleSix={'Procesados'} toSix={`/schools/${school_id}/almuerzos_procesados`} activeSix={false}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[300px]'>Nombre</th>
                                    <th className='flex justify-center'>Almuerzo</th>
                                    <th>Total</th>
                                    <th>Servicio</th>
                                    <th>Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {almuerzosState.almuerzos.map(almuerzo => {
                                    if (hiddenRows.includes(almuerzo.id)) {
                                        return null; 
                                    }
                                    return (
                                        <tr key={almuerzo.id}>
                                            <td>{almuerzo.firstName} {almuerzo.lastName}</td>
                                            <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(almuerzo.cedulaCliente,almuerzo.id)} /></td>
                                            <td>{almuerzo.lunchesConsumed}</td>
                                            <td>{almuerzo.cliente_servicio?.name}</td>
                                            <td>{almuerzo.cliente_seccion?.name}</td>
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

export default AlmuerzoEventuales;