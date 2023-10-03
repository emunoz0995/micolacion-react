import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import SchoolLayout from '../../layouts/SchoolsLayout';
import BtnTable from '../../components/buttons/BtnTable';
import Header from '../../components/headers/catalogs/Header';
import MainLoader from '../../components/Loaders/MainLoader';
//SLICE
import { getGeneralReportThunk} from '../../store/slices/reports/reports.slice';
import GeneralReportPDF from './GeneralReportPDF';
import { useParams } from 'react-router-dom';


const GeneralReportList = () => {

    const { t } = useTranslation();
    const {school_id} = useParams();
    const reportsState = useSelector(state => state.reports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGeneralReportThunk(school_id));
    }, []);

    const handleGeneratePDF = (client_id) => {
        GeneralReportPDF()
    };


    return (
        <SchoolLayout>
             {reportsState.fetching || reportsState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                <Header title="Reporte general" />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr >
                                    <th></th>
                                    <th>Nombres</th>
                                    <th>Seccion</th>
                                    <th>Servicio</th>
                                    <th>Representante</th>
                                    <th>Email</th>
                                    <th>Telefono</th>    
                                    <th>Refrigerios a favor</th>
                                    <th>Almuerzos a favor</th>   
                                    <th>Refrigerios consumidos</th>
                                    <th>Almuerzos consumidos</th>    
                                    <th className='sticky right-0'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportsState.reports.map(report => (
                                    <tr className='h-[60px]' key={report.id}>
                                        <td></td>
                                        <td>{report.firstName} {report.lastName}</td>
                                        <td>{report.cliente_seccion?.name}</td>
                                        <td>{report.cliente_servicio?.name}</td>
                                        <td>{report.cliente_representante?.names} </td>
                                        <td>{report.cliente_representante?.email} </td>
                                        <td>{report.cliente_representante?.telefon} </td>
                                        <td>{report.totalBreakfast} </td>
                                        <td>{report.totalLunch} </td>
                                        <td>{report.breakfastConsumed} </td>
                                        <td>{report.lunchesConsumed} </td>
                                        <td className='gap-1 justify-end p-1 sticky right-0'>
                                            <BtnTable action="pdf" funtion={() => handleGeneratePDF(report.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </SchoolLayout>
    );
};

export default GeneralReportList;