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
import { getServiceGenereteXMLThunk } from '../../store/slices/facturation/facturation.slice';


const ServicesGenerateXML = () => {

    const { school_id } = useParams();
    const generateXMLState = useSelector(state => state.facturations);
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
        dispatch(getServiceGenereteXMLThunk(school_id));
    }, []);

    const hideRow = (id) => {
        setHiddenRows([...hiddenRows, id]);
    };


    const handleGenerateXML = () => {
        const url = "http://44.197.107.144:4000/facturations/generateXML";
        window.open(url, "_self");
        
    };


    return (
        <SchoolLayout>
            {generateXMLState.fetching || generateXMLState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <Header title="Generar XML" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table-sm table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='text-left h-[60px] bg-[#f2f7ff] sticky top-0'>
                                    <th className='p-3 w-[200px]'>Representante</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th className='w-[200px]'>Estudiante</th>
                                    <th>Servicio</th>   
                                    <th>Valor</th>                
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {generateXMLState.facturations.map(item => {
                                    if (hiddenRows.includes(item.id)) {
                                        return null;
                                    }
                                    return (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='p-3'>{item.XML_representante?.names} </td>
                                            <td className='w-[150px]'>{item.XML_representante?.email} </td>
                                            <td>{item.XML_representante?.telefon} </td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.XML_servicio?.name}</td>
                                            <td>$ {item.XML_servicio?.price}</td>
                                            <td className='gap-1 justify-end p-1'>
                                                <BtnTable action="process" funtion={() => handleGenerateXML()} />
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

export default ServicesGenerateXML;