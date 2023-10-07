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
import { getRefrigeriosProcesadosThunk } from '../../../store/slices/registers/refrigeriosLcv.slice';
import { getServicesExtrasThunk } from '../../../store/slices/catalogs/services.slice';
import { revertBreakFastThunk } from '../../../store/slices/procedures/refrigerios.slice';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';


const RefrigerioProcesados = () => {
    const { school_id } = useParams();
    const refrigeriosState = useSelector(state => state.refrigeriosLcv);
    const servicesState = useSelector(state => state.services)
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [selected, setSelected] = useState("");

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
        dispatch(getRefrigeriosProcesadosThunk(school_id));
    }, []);

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handleRevertBreak = (cedula, id) => {
        dispatch(revertBreakFastThunk(cedula));
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
            dispatch(getRefrigeriosProcesadosThunk(school_id));
		})
       
    };

    return (
        <SchoolLayout>
            {refrigeriosState.fetching || refrigeriosState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                    <TabParts
                        titleOne={'Basica Media'} toOne={`/schools/${school_id}/refrigerios_bm`} activeOne={false}
                        titleTwo={'Basica Elemental'} toTwo={`/schools/${school_id}/refrigerios_be`} activeTwo={false}
                        titleTree={'Basica BS-BGU '} toTree={`/schools/${school_id}/refrigerios_bs_bgu`} activeTree={false}
                        titleFour={'Eventuales'} toFour={`/schools/${school_id}/refrigerios_eventuales`} activeFour={false}
                        titleFive={'Personal'} toFive={`/schools/${school_id}/refrigerios_personal`} activeFive={false}
                        titleSix={'Procesados'} toSix={`/schools/${school_id}/refrigerios_procesados`} activeSix={true}
                    />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff]'>
                                    <th className='p-2'>Nombre</th>
                                    <th>Servicio</th>
                                    <th>Nivel</th>
                                    <th>Revertir</th>
                                    <th>Total</th>
                                    <th>Extras</th>
                                </tr>
                            </thead>
                            <tbody>
                                {refrigeriosState.refrigerios.map(refrigerio => {
                                    if (hiddenRows.includes(refrigerio.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px]' key={refrigerio.id}>
                                            <td className='p-2'>{refrigerio.firstName} {refrigerio.lastName}</td>
                                            <td>{refrigerio.cliente_servicio?.name}</td>
                                            <td>{refrigerio.cliente_seccion?.name}</td>
                                            <td className='flex gap-1 items-center h-[60px] p-1'>
                                                <BtnTable action="revert" funtion={() => handleRevertBreak(refrigerio.cedulaCliente, refrigerio.id)} />
                                            </td>
                                            {refrigerio.cliente_servicio?.name === "SIN SERVICIO" ?
                                                <td>{refrigerio.breakfastConsumed}</td> :
                                                <td>{refrigerio.totalBreakfast}</td>
                                            }
                                            <td>
                                                <select onChange={(e)=>handleChange(e.target.value, refrigerio.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                    <option value={selected}>Seleccione</option>
                                                    {servicesState.services.map((service) => (
                                                        <option key={service.id} value={service.id}>{service.name}</option>
                                                    ))}
                                                </select>
                                            </td>
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

export default RefrigerioProcesados;