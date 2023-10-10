import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
import Swal from 'sweetalert2';
//SLICES
import { getAlmuerzosProcesadosThunk } from '../../../store/slices/registers/almuerzosLcv.slice';
import { getServicesExtrasThunk } from '../../../store/slices/catalogs/services.slice';
import { revertLunchThunk } from '../../../store/slices/procedures/almuerzos.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';

const AlmuerzoProcesados = () => {
    const { school_id } = useParams();
    const almuerzosState = useSelector(state => state.almuerzosLcv);
    const servicesState = useSelector(state => state.services)
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    useEffect(() => {
        dispatch(getServicesExtrasThunk());
        dispatch(getAlmuerzosProcesadosThunk(school_id));
    }, []);


    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handleRevertLunch = (cedula, id) => {
        dispatch(revertLunchThunk(cedula));
        hideRow(id);
    }

    const handleChange = (serviceId, cedulaCliente) => {
        const data = {
            serviceId,
            cedulaCliente,
        }

        dispatch(registerExtrasThunk(data));

        Toast.fire({
            icon: 'success',
            title: '¡Servicio extra registrado!'
          }).then(function(result){
            dispatch(getAlmuerzosProcesadosThunk(school_id));
		})
       
    };

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
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/almuerzos_eventuales`} activeFour={false}
                        titleFive={'Personal'} toFive={`/schools/${school_id}/almuerzos_personal`} activeFive={false}
                        titleSix={'Procesados'} toSix={`/schools/${school_id}/almuerzos_procesados`} activeSix={true}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='p-2'>Nombre</th>
                                    <th>Servicio</th>
                                    <th>Nivel</th>
                                    <th>Revertir</th>
                                    <th>Total</th>
                                    <th>Extras</th>
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
                                            <td>{almuerzo.cliente_servicio?.name}</td>
                                            <td>{almuerzo.cliente_seccion?.name}</td>
                                            <td className='flex justify-center'>
                                                <BtnTable action="revert" funtion={() => handleRevertLunch(almuerzo.cedulaCliente, almuerzo.id)} />
                                            </td>
                                            {almuerzo.cliente_servicio?.name === "SIN SERVICIO" ?
                                                <td>{almuerzo.lunchesConsumed}</td> :
                                                <td>{almuerzo.totalLunch}</td>
                                            }
                                            <td>
                                                <select onChange={(e) => handleChange(e.target.value, refrigerio.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                    <option value={selected}>Seleccione</option>
                                                    {servicesState.services.map((service) => (
                                                        <option key={service.id} value={service.id}>{service.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>{almuerzo.totalExtras}</td>

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

export default AlmuerzoProcesados;