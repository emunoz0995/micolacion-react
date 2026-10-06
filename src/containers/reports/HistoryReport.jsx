import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SchoolLayout from '../../layouts/SchoolsLayout';
import Header from '../../components/headers/catalogs/Header';
import { API_BASE_URL } from '../../store/constans';
import axios from 'axios';

const dateFormatter = new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil', dateStyle: 'short', timeStyle: 'medium',
});
const currentYear = () => new Intl.DateTimeFormat('en', {
    timeZone: 'America/Guayaquil', year: 'numeric',
}).format(new Date());

const consumed = item => {
    const service = item.history_servicio;
    if (service?.isAditional) return item.aditionalConsumed;
    if (service?.isExtra) return item.extrasConsumed;
    if (service?.isBreakFast) return item.breakfastConsumed;
    if (service?.isLunch) return item.lunchesConsumed;
    // Older services may not have their classification flags configured.
    return (item.aditionalConsumed || 0) + (item.extrasConsumed || 0)
        + (item.breakfastConsumed || 0) + (item.lunchesConsumed || 0);
};

function HistoryReportContent({ school_id }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState(() => ({ page: 1, pageSize: 50, year: currentYear(), search: '', dateFrom: '', dateTo: '' }));
    const [report, setReport] = useState({ rows: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(0);
    const invalidRange = query.dateFrom && query.dateTo && query.dateFrom > query.dateTo;
    const invalidYear = !/^\d{4}$/.test(query.year) || Number(query.year) < 1000 || Number(query.year) > 9998;
    const outsideYear = (query.dateFrom && query.dateFrom.slice(0, 4) !== query.year)
        || (query.dateTo && query.dateTo.slice(0, 4) !== query.year);
    const filterError = invalidYear ? 'Ingresa un año válido de cuatro dígitos.'
        : invalidRange ? 'La fecha Desde debe ser anterior o igual a Hasta.'
            : outsideYear ? 'Las fechas deben pertenecer al año seleccionado.' : '';

    useEffect(() => {
        const timeout = setTimeout(() => {
            setQuery(previous => previous.search === searchTerm.trim()
                ? previous : { ...previous, search: searchTerm.trim(), page: 1 });
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    useEffect(() => {
        if (filterError) {
            setError(filterError);
            setLoading(false);
            setReport({ rows: [], total: 0 });
            return;
        }
        const controller = new AbortController();
        setLoading(true);
        setError('');
        axios.get(`/api/reports/reportHistory/${school_id}`, { params: query, signal: controller.signal })
            .then(({ data }) => {
                if (controller.signal.aborted) return;
                if (!Array.isArray(data.rows) || !Number.isFinite(data.total)) throw new Error('Contrato de historial inválido');
                setReport(data);
                const lastPage = Math.max(1, Math.ceil(data.total / query.pageSize));
                if (query.page > lastPage) setQuery(previous => ({ ...previous, page: lastPage }));
            })
            .catch(reason => {
                if (controller.signal.aborted || axios.isCancel(reason)) return;
                setReport({ rows: [], total: 0 });
                setError('No se pudo cargar el historial. Intenta nuevamente.');
            })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
    }, [school_id, query, reload, filterError]);

    const changeFilter = (name, value) => setQuery(previous => ({
        ...previous, [name]: value, page: 1,
        ...(name === 'year' ? { dateFrom: '', dateTo: '' } : {}),
    }));
    const handleGenerateExcel = () => {
        const url = new URL(`api/reports/history/${encodeURIComponent(school_id)}`, API_BASE_URL);
        for (const [key, value] of Object.entries({ year: query.year, search: searchTerm.trim(), dateFrom: query.dateFrom, dateTo: query.dateTo })) {
            if (value) url.searchParams.set(key, value);
        }
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
    };
    const pages = Math.max(1, Math.ceil(report.total / query.pageSize));

    return (
        <SchoolLayout value={searchTerm} onchange={event => setSearchTerm(event.target.value)} view={true}>
            <div className="mx-5 my-5 w-full min-w-0 flex flex-col pb-16">
                <Header title="Historial de consumos" />
                <div className="flex flex-wrap items-end gap-3 my-3">
                    <label className="text-sm">Año
                        <input aria-label="Año" type="number" min="1000" max="9998" step="1"
                            className="input input-bordered input-sm block w-28" value={query.year}
                            onChange={event => changeFilter('year', event.target.value)} />
                    </label>
                    <label className="text-sm">Desde
                        <input aria-label="Desde" type="date" min={`${query.year}-01-01`} max={`${query.year}-12-31`} className="input input-bordered input-sm block" value={query.dateFrom}
                            onChange={event => changeFilter('dateFrom', event.target.value)} />
                    </label>
                    <label className="text-sm">Hasta
                        <input aria-label="Hasta" type="date" min={`${query.year}-01-01`} max={`${query.year}-12-31`} className="input input-bordered input-sm block" value={query.dateTo}
                            onChange={event => changeFilter('dateTo', event.target.value)} />
                    </label>
                    <label className="text-sm">Filas por página
                        <select aria-label="Filas por página" className="select select-bordered select-sm block" value={query.pageSize}
                            onChange={event => changeFilter('pageSize', Number(event.target.value))}>
                            {[25, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                    </label>
                    <button type="button" className="btn btn-sm btn-success ml-auto" disabled={Boolean(filterError)} onClick={handleGenerateExcel}>Exportar Excel</button>
                </div>
                <p className="text-xs text-gray-500 mb-2">El Excel incluye los resultados del año seleccionado, según la búsqueda y las fechas indicadas.</p>
                {error && <div role="alert" className="flex gap-3 items-center text-red-700 mb-3">
                    <span>{error}</span>
                    {!filterError && <button type="button" className="btn btn-sm" onClick={() => setReload(value => value + 1)}>Reintentar</button>}
                </div>}
                <div className="overflow-auto flex-1 min-h-0 contenedor" aria-busy={loading}>
                    <table className="text-[13px] table-sm table-zebra w-full uppercase">
                        <thead className="border-t-2 border-t-sky-500 sticky top-0 bg-[#f2f7ff]">
                            <tr className="text-left h-[60px]">
                                {['Fecha y Hora', 'Estudiante', 'Sección', 'Servicio', 'Consumidos', 'Cancelado'].map(title => <th className="p-2" key={title}>{title}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan={6} className="p-8 text-center" role="status">Cargando historial…</td></tr>
                                : report.rows.length ? report.rows.map(item => (
                                    <tr className="h-[60px]" key={item.id}>
                                        <td className="p-2">{dateFormatter.format(new Date(item.createdAt))}</td>
                                        <td className="p-2">{item.lastName} {item.firstName}</td>
                                        <td className="p-2">{item.history_seccion?.name}</td>
                                        <td className="p-2">{item.history_servicio?.name}</td>
                                        <td className="p-2">{consumed(item)}</td>
                                        <td className="p-2">{item.paidService ? 'Cancelado' : 'Pago pendiente'}</td>
                                    </tr>
                                )) : <tr><td colSpan={6} className="p-8 text-center text-gray-500">NO HAY DATOS PARA MOSTRAR</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                    <span>{report.total.toLocaleString('es-EC')} registros · Página {query.page} de {pages}</span>
                    <div className="flex gap-2">
                        <button type="button" className="btn btn-sm" disabled={loading || !!error || query.page <= 1}
                            onClick={() => setQuery(previous => ({ ...previous, page: previous.page - 1 }))}>Anterior</button>
                        <button type="button" className="btn btn-sm" disabled={loading || !!error || query.page >= pages}
                            onClick={() => setQuery(previous => ({ ...previous, page: previous.page + 1 }))}>Siguiente</button>
                    </div>
                </div>
            </div>
        </SchoolLayout>
    );
}

export default function HistoryReport() {
    const { school_id } = useParams();
    return <HistoryReportContent key={school_id} school_id={school_id} />;
}
