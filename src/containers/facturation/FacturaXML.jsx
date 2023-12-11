import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//UI
import MainLoader from '../../components/Loaders/MainLoader';
import SchoolLayout from '../../layouts/SchoolsLayout';
import HeaderSection from '../../components/headers/catalogs/HeaderSection';
import LavelForm from '../../components/Inputs/formInput/LavelForm';
import BtnTable from '../../components/buttons/BtnTable';
import '../../App.css';
// SLICES 
import { setIsLoading } from '../../store/slices/isLoading.slice';
//RESORCES
import { API_BASE_URL } from '../../store/constans';
import Swal from 'sweetalert2';
//import GeneralReportPDF from './GeneralReportPDF';

const FacturaXML = () => {

    const { client_ci, school_id } = useParams();
    const [cantidad, setCantidad] = useState("1");
    const [porcentaje, setPorcentaje] = useState("0.00");
    const isLoading = useSelector(state => state.isLoadingSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState([]);

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
        getServiceXMLByClient();
    }, []);

    const getServiceXMLByClient = () => {
        dispatch(setIsLoading(true));
        axios.get(`/api/facturations/services_generateXMLByClient/${client_ci}`)
            .then(response => {
                const formattedData = response.data.map((item) => {
                    return {
                        ci: item.XML_representante?.cedulaRepresentante,
                        names: item.XML_representante?.names,
                        email: item.XML_representante?.email,
                        dir: item.XML_representante?.adress,
                        telefon: item.XML_representante?.telefon,
                        id: item.id,
                        code: item.XML_servicio?.code,
                        description: item.XML_servicio?.name + " - " + item.lastName + " " + item.firstName,
                        percernt: porcentaje,
                        quantity: cantidad,
                        price: item.XML_servicio?.price,
                    };
                })
                setInvoice(formattedData);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API: ' + error);
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    const handleQuantityChange = (itemId, quantity) => {
        const updatedInvoice = invoice.map((item) =>
            item.id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        );
        setInvoice(updatedInvoice);
    };

    const handlePriceChange = (itemId, price) => {
        const updatedInvoice = invoice.map((item) =>
            item.id === itemId ? { ...item, price: parseFloat(price) } : item
        );
        setInvoice(updatedInvoice);
    };

    const calculateSubTotal = () => {
        const subtotal = invoice.reduce((total, item) => total + item.quantity * item.price, 0);
        return subtotal.toFixed(2);
    };

    const calculateIva = () => {
        const subtotal = invoice.reduce((total, item) => total + item.quantity * item.price, 0);
        return (subtotal * 0.12).toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = invoice.reduce((total, item) => total + item.quantity * item.price, 0);
        const iva = (subtotal * 0.12);
        const result = (subtotal + iva)
        return result.toFixed(2);

        // if (iva % 1 >= 0.05) {
        //     return (parseInt(subtotal) + parseFloat(Math.ceil(iva))).toFixed(2);
        // } else {
        //     return (parseInt(subtotal) + parseFloat(iva)).toFixed(2); 
        // }
    };

    const formatDateToLocal = (date) => {
        const formattedDate = new Date(date);
        const dia = formattedDate.getDate().toString().padStart(2, '0');
        const mes = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); 
        const anio = formattedDate.getFullYear();
        return `${dia}${mes}${anio}`;
      }

    const today = new Date();

    const sendDataToBackend = () => {
        try {
            axios.post(`${API_BASE_URL}api/facturations/generateXML`, invoice)
                .then(res => {
                    const xml = res.data
                    // Crea un enlace de descarga oculto en el DOM
                    const downloadLink = document.createElement('a');
                    downloadLink.href = `data:application/xml;charset=utf-8,${encodeURIComponent(xml)}`;
                    downloadLink.download = `Factura_${formatDateToLocal(today)+invoice[0].ci}`;
                    // Simula un clic en el enlace para iniciar la descarga automática
                    downloadLink.click();
                    navigate(`/schools/${school_id}/services_generateXML`);
                })
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: '¡Error al generar XML!',
                text: error
              })
        }
    };

    return (
        <SchoolLayout>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <div className='h-[90%] overflow-y-scroll flex flex-col contenedor'>
                        <div className=' absolute right-3 top-[68px] sm:right-8 sm:top-[70px] flex gap-1 justify-end'>
                            <BtnTable action="exit" to={`/schools/${school_id}/services_generateXML`} />
                            <BtnTable action="xml" funtion={sendDataToBackend} />
                        </div>
                        <HeaderSection title="Datos para facturación" />
                        <div className='flex'>
                            <div className='flex flex-col p-2 mr-5'>
                                <LavelForm
                                    type="text"
                                    label="Cedula"
                                    input="input"
                                    value={invoice[0]?.ci}
                                />
                                <LavelForm
                                    type="text"
                                    label="Nombres"
                                    input="input"
                                    value={invoice[0]?.names}
                                />
                            </div>
                            <div className='flex flex-col p-2'>
                                <LavelForm
                                    type="text"
                                    label="Email"
                                    input="input"
                                    value={invoice[0]?.email}
                                />
                                <LavelForm
                                    type="text"
                                    label="Teléfono"
                                    input="input"
                                    value={invoice[0]?.telefon}
                                />
                            </div>
                            <div className='flex flex-col p-2'>
                                <LavelForm
                                    type="text"
                                    label="Dirección"
                                    input="input"
                                    value={invoice[0]?.dir}
                                />
                            </div>
                        </div>

                        <div className="overflow-y-scroll h-[87%] contenedor">
                            <table className="text-[13px] table-sm table-zebra w-full">
                                <thead className='border-t-[1px] border-t-sky-500' >
                                    <tr className='text-left h-[60px] bg-[#eff2f8]'>
                                        <th className='pl-2 w-[70px]'>Código</th>
                                        <th className='w-[100px]'>Cantidad</th>
                                        <th className='w-[50%]'>Descripción</th>
                                        <th className='text-center'>Precio Unitario</th>
                                        <th className='text-center'>Precio Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.map(item => (
                                        <tr className='h-[60px]' key={item.id}>
                                            <td className='pl-2'>{item.code}</td>
                                            <td >
                                                <input
                                                    className='text-center outline-none border w-[50%] h-[30px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                    defaultValue={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    className='p-1 outline-none border w-[95%] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                    defaultValue={item.description}

                                                />
                                            </td>
                                            <td className='text-center'>
                                                <input
                                                    className='text-center outline-none border w-[50%] h-[30px] input-bordered focus:outline-none focus:ring-1 uppercase rounded-md shadow-base-300 shadow-lg'
                                                    defaultValue={item.price}
                                                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                                />
                                            </td>
                                            <td className='text-center'>
                                                $ {(item.quantity * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <table className="text-[13px] table-xm table-zebra w-full">
                            <thead className='border-t-[1px] border-t-sky-500'>
                                <tr className='text-left bg-[#eff2f8]'>
                                    <th className='p-2 w-[90%] text-end'>SUBTOTAL</th>
                                    <th className='w-[10%] text-center'>${calculateSubTotal()}</th>
                                </tr>
                                <tr className='text-left bg-[#eff2f8]'>
                                    <th className='p-2 w-[90%] text-end'>IVA 12%</th>
                                    <th className='w-[10%] text-center'>${calculateIva()}</th>
                                </tr>
                                <tr className='text-left bg-[#eff2f8]'>
                                    <th className='p-2 w-[90%] text-end'>TOTAL</th>
                                    <th className='w-[10%] text-center'>${calculateTotal()}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            )}
        </SchoolLayout>
    );
};

export default FacturaXML;