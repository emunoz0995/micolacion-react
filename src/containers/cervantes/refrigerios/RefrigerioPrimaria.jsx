import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import SchoolLayout from '../../../layouts/SchoolsLayout';
import TabParts from '../../../components/breadcrumbs/TabParts';
import MainLoader from '../../../components/Loaders/MainLoader';
import BtnTable from '../../../components/buttons/BtnTable';
import Swal from 'sweetalert2';
//SLICES
import { getSchoolThunk } from '../../../store/slices/catalogs/schools.slice';
import { getServicesExtrasThunk } from '../../../store/slices/catalogs/services.slice';
import { setIsLoading } from '../../../store/slices/isLoading.slice';
import { decrementBreakFastThunk } from '../../../store/slices/procedures/refrigerios.slice';
import { countBreakFastProcessThunk } from '../../../store/slices/procedures/countProcess';
import { registerExtrasThunk } from '../../../store/slices/procedures/funtions.slice';


const RefrigerioPrimaria = () => {
    const { school_id } = useParams();
    const schoolState = useSelector(state => state.schools);
    const servicesState = useSelector(state => state.services);
    const isLoading = useSelector(state => state.isLoadingSlice);
    const countProcces = useSelector(state => state.countProcess);
    const dispatch = useDispatch();
    const [hiddenRows, setHiddenRows] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
        getRefrigeriosPrimaria();
        dispatch(getSchoolThunk(school_id));
        dispatch(getServicesExtrasThunk());
        dispatch(countBreakFastProcessThunk(school_id));       
    }, []);

    if (Object.keys(schoolState.school).length !== 0) {
        let schoolInfo = {
            name: `${schoolState.school.name}`,
            active: `${schoolState.school.active}`,
            id: `${schoolState.school.id}`,
        };

        localStorage.setItem("schoolInfo", JSON.stringify(schoolInfo));
    }

    useEffect(() => {
        const results = data.filter(item => {
            let seccionMatch = false;
            let fullName =  false 

            if (item.cliente_seccion.name) {
                seccionMatch = item.cliente_seccion.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (item.lastName && item.firstName){
                fullName = `${item.lastName}${item.firstName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase());
            }
        
            return fullName || seccionMatch ;
        });
        setSearchResults(results);
    }, [searchTerm, data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };

    const handlePlusBreak = (cedula, id) => {
        dispatch(decrementBreakFastThunk(cedula));
        setTimeout(() => {
            dispatch(countBreakFastProcessThunk(school_id));
        }, 500);       
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
            getRefrigeriosPrimaria();
		})
       
    };
    
    const getRefrigeriosPrimaria = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/refrigerios_cervantes/breakfast_primaria/${school_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <SchoolLayout value={searchTerm} onchange={handleSearch} view={true}>
             {isLoading ? (
                <MainLoader />
            ) : (
            <div className="mx-5 my-5 w-full">
                <TabParts
                    titleOne={'Basical Elemental'} toOne={`/schools/${school_id}/refrigerios_primaria`} activeOne={true}
                    titleTwo={'Inicial'} toTwo={`/schools/${school_id}/refrigerios_inicial`} activeTwo={false}
                    titleTree={'Basical Media/Superior'} toTree={`/schools/${school_id}/refrigerios_secundaria`} activeTree={false}
                    titleFour={'Eventuales'} toFour={`/schools/${school_id}/refrigerios_eventuales_cervantes`} activeFour={false}
                    titleSeven={'Procesados'} countProcces={countProcces} toSeven={`/schools/${school_id}/refrigerios_procesados_cervantes`} activeSeven={false}
                />
                <div className="overflow-y-scroll h-[87%] contenedor">
                    <table className="text-[13px] table table-zebra w-full">
                        <thead className='sticky top-0 border-t-2 border-t-sky-500' >
                            <tr>
                                <th>Nombre</th>
                                <th className='flex justify-center'>Refrigerio</th>
                                <th>Total</th>
                                <th>Extra</th>
                                <th>Nivel</th>
                                <th>Servicio</th>
                            </tr>
                        </thead>
                        {searchResults.length > 0 ?
                        <tbody>
                                {searchResults.map(refrigerio => {
                                    if (hiddenRows.includes(refrigerio.id)) {
                                        return null; 
                                    }
                                    return (
                                        <tr className='uppercase' key={refrigerio.id}>
                                            <td>{refrigerio.lastName} {refrigerio.firstName} </td>
                                            <td className='flex justify-center'> <BtnTable action="decrement" funtion={() => handlePlusBreak(refrigerio.cedulaCliente,refrigerio.id)} /></td>
                                            <td>{refrigerio.totalBreakfast}</td>
                                            <td>
                                                <select onChange={(e)=>handleChange(e.target.value, refrigerio.cedulaCliente)} className="file-input-sm file-input-info outline-none input-bordered focus:outline-none focus:ring-1  w-[120px] rounded-md shadow-base-300 shadow-lg">
                                                    <option value="">Seleccione</option>
                                                    {servicesState.services.map((service) => (
                                                        <option key={service.id} value={service.id}>{service.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>{refrigerio.cliente_seccion?.name}</td>
                                            <td>{refrigerio.cliente_servicio?.name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            :
                                <div className="absolute z-10 top-[200px] left-3 sm:left-[380px]">
                                    <h1 className='font-semibolt text-[22px] sm:text-[25px] text-gray-400'>NO HAY DATOS PARA MOSTRAR</h1>
                                </div>
                            }
                    </table>
                </div>
            </div>
            )}
        </SchoolLayout>
    );
};

export default RefrigerioPrimaria;