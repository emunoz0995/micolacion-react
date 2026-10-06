// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HistoryReport from './HistoryReport';

vi.mock('axios', () => ({ default: { get: vi.fn(), isCancel: vi.fn(() => false) } }));
vi.mock('react-router-dom', () => ({ useParams: () => ({ school_id: 'schoolHash' }), useNavigate: () => vi.fn() }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
vi.mock('react-redux', () => ({ useDispatch: () => vi.fn(), useSelector: () => false }));
vi.mock('../../layouts/SchoolsLayout', () => ({ default: ({ children, value, onchange }) => <><input aria-label="Buscar" value={value} onChange={onchange} />{children}</> }));

const row = { id: 8, createdAt: '2026-10-06T12:00:00Z', lastName: 'Perez', firstName: 'Ana', history_seccion: { name: 'Primero' }, history_servicio: { name: 'ALMUERZO', isLunch: true }, lunchesConsumed: 3, paidService: true };
beforeEach(() => {
    vi.setSystemTime(new Date('2026-10-06T12:00:00Z'));
    axios.get.mockReset().mockResolvedValue({ data: { rows: [row], total: 120, page: 1, pageSize: 50 } });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

describe('HistoryReport', () => {
    it('solicita una página acotada y muestra los consumos reales', async () => {
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        expect(axios.get.mock.calls[0][1].params).toMatchObject({ page: 1, pageSize: 50, year: '2026' });
        expect(screen.getByText('3')).toBeTruthy();
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.page).toBe(2));
    });

    it('busca en el servidor y vuelve a la primera página', async () => {
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.page).toBe(2));
        fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'Primero' } });
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params).toMatchObject({ page: 1, search: 'Primero' }));
    });

    it('exporta todos los resultados del filtro, sin enviar la página', async () => {
        const open = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        fireEvent.change(screen.getByLabelText('Desde'), { target: { value: '2026-10-01' } });
        fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'Ana' } });
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.search).toBe('Ana'));
        fireEvent.click(screen.getByRole('button', { name: /Exportar Excel/ }));
        const url = new URL(open.mock.calls[0][0]);
        expect(url.searchParams.get('search')).toBe('Ana');
        expect(url.searchParams.get('dateFrom')).toBe('2026-10-01');
        expect(url.searchParams.has('page')).toBe(false);
        open.mockRestore();
    });

    it('muestra un error recuperable cuando falla la API', async () => {
        axios.get.mockRejectedValueOnce(new Error('network'));
        render(<HistoryReport />);
        expect(await screen.findByRole('alert')).toBeTruthy();
        fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
        await screen.findByText('Perez Ana');
    });

    it('ignora respuestas de consultas canceladas al cambiar filtros', async () => {
        let finishOld;
        axios.get.mockImplementationOnce(() => new Promise(resolve => { finishOld = resolve; }));
        render(<HistoryReport />);
        const oldSignal = axios.get.mock.calls[0][1].signal;
        fireEvent.change(screen.getByLabelText('Desde'), { target: { value: '2026-10-01' } });
        await screen.findByText('Perez Ana');
        expect(oldSignal.aborted).toBe(true);
        finishOld({ data: { rows: [{ ...row, firstName: 'Obsoleta' }], total: 1 } });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(screen.queryByText('Perez Obsoleta')).toBe(null);
    });

    it('rechaza rangos invertidos y permite corregirlos', async () => {
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        fireEvent.change(screen.getByLabelText('Desde'), { target: { value: '2026-10-06' } });
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.dateFrom).toBe('2026-10-06'));
        const calls = axios.get.mock.calls.length;
        fireEvent.change(screen.getByLabelText('Hasta'), { target: { value: '2026-10-01' } });
        await screen.findByRole('alert');
        expect(axios.get.mock.calls.length).toBe(calls);
        expect(screen.getByRole('button', { name: 'Exportar Excel' }).disabled).toBe(true);
        fireEvent.change(screen.getByLabelText('Hasta'), { target: { value: '2026-10-07' } });
        await screen.findByText('Perez Ana');
        expect(screen.queryByRole('alert')).toBe(null);
    });

    it('al cambiar año conserva búsqueda, limpia fechas y exporta ese año desde página 1', async () => {
        const open = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'Ana' } });
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.search).toBe('Ana'));
        fireEvent.change(screen.getByLabelText('Desde'), { target: { value: '2026-10-01' } });
        await screen.findByText('Perez Ana');
        fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params.page).toBe(2));
        fireEvent.change(screen.getByLabelText('Año'), { target: { value: '2025' } });
        await waitFor(() => expect(axios.get.mock.calls.at(-1)[1].params).toMatchObject({ year: '2025', page: 1, search: 'Ana', dateFrom: '', dateTo: '' }));
        fireEvent.click(screen.getByRole('button', { name: 'Exportar Excel' }));
        const url = new URL(open.mock.calls[0][0]);
        expect(url.searchParams.get('year')).toBe('2025');
        expect(url.searchParams.get('search')).toBe('Ana');
        expect(url.searchParams.has('dateFrom')).toBe(false);
        expect(url.searchParams.has('page')).toBe(false);
    });

    it('elige el año de Ecuador aunque UTC ya esté en el siguiente año', async () => {
        vi.setSystemTime(new Date('2026-01-01T02:00:00Z'));
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        expect(axios.get.mock.calls[0][1].params.year).toBe('2025');
        expect(screen.getByLabelText('Año').value).toBe('2025');
    });

    it('no consulta ni descarga al dejar el año vacío', async () => {
        render(<HistoryReport />);
        await screen.findByText('Perez Ana');
        const requests = axios.get.mock.calls.length;
        fireEvent.change(screen.getByLabelText('Año'), { target: { value: '' } });
        await screen.findByRole('alert');
        expect(axios.get.mock.calls.length).toBe(requests);
        expect(screen.getByRole('button', { name: 'Exportar Excel' }).disabled).toBe(true);
    });
});
