import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
import Swal from 'sweetalert2';
//SLICE
import { getServicesReceivableThunk } from '../../store/slices/facturation/facturation.slice';
import { paidServiceThunk } from '../../store/slices/procedures/funtions.slice';
import ServiceReceivableCell from '../../components/rates/ServiceReceivableCell';


const ServicesReceivable = () => {

    const { school_id } = useParams();
    const receivableServiceState = useSelector(state => state.facturations);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        dispatch(getServicesReceivableThunk(school_id));
    }, []);

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePaidService = (clientId, cedulaCliente) => {
        Toast.fire({
            icon: 'success',
            title: 'Pago registrado, ¡ya puede general XML!'
        })
        const data = {
            cedulaCliente
        }
        dispatch(paidServiceThunk(clientId, data));
        hideRow(clientId);
    };

    console.log(receivableServiceState)

    return (
        <SchoolLayout>
            {receivableServiceState.fetching || receivableServiceState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Servicios por cobrar" />
                    <div className="overflow-y-scroll h-[87%] contenedor uppercase">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[150px]'>Representante</th>
                                    <th>Email</th>
                                    <th className='px-5' >Telefono</th>
                                    <th className='w-[150px]'>Estudiante</th>
                                    <th className='w-[280px]'>Servicio</th>
                                    <th>Valor</th>
                                    <th>Consumidos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {receivableServiceState.facturations.map(item => {
                                    if (hiddenRows.includes(item.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-3'>{item.history_representante?.names} </td>
                                            <td className='w-[150px]'>{item.history_representante?.email} </td>
                                            <td className='px-5'>{item.history_representante?.telefon} </td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>
                                               <ServiceReceivableCell
                                               servicioPrincipal={item.history_servicioPrincipal?.name}
                                               servicioTomado={item.history_servicio?.name}
                                               totalBreakFast={item.totalBreakfast}
                                               totalLunch={item.totalLunch}
                                               />
                                            </td>
                                            <td>$ {item.history_servicio?.price}</td>
                                            <td className='pl-8' >
                                                {item.history_servicio?.name === "REFRIGERIO INDIVIDUAL CAMPOVERDE" || "REFRIGERIO INDIVIDUAL CERVANTES" ? item.breakfastConsumed :
                                                 item.history_servicio?.name === "ALMUERZO INDIVIDUAL CAMPOVERDE" || "ALMUERZO INDIVIDUAL CERVANTES" ? item.lunchesConsumed :
                                                 item.history_servicio?.isExtra ? item.extrasConsumed : ""
                                                }
                                            </td>
                                            <td className='gap-1 justify-end p-1'>
                                                <BtnTable action="process" funtion={() => handlePaidService(item.id, item.cedulaCliente)} />
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

export default ServicesReceivable;