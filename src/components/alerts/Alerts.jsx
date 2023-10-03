import React from 'react';

const Alerts = ({ alert }) => {

    if (alert === 'succefull') {
        return (
            <>
                <div class="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Your purchase has been confirmed!</span>
                </div>
            </>
        );
    } else if (alert === 'warning') {
        return (
            <>
                <div class="alert alert-warning">
                    <span>Warning: Invalid email address!</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
            </>
        );
    } else if (alert === 'error1') {
        return (
            <>
                <div className="alert alert-error h-[20px]">
                    <span>Usuario o contraseña incorrectas.</span>
                </div>
            </>
        );
    } else if (alert === 'error2') {
        return (
            <>
                <div className="alert alert-error h-[20px]">
                    <span>Ingrese contraseña porfavor.</span>
                </div>
            </>
        );
    } else if (alert === 'error3') {
        return (
            <>
                <div className="alert alert-error h-[20px]">
                    <span>Ingrese email porfavor.</span>
                </div>
            </>
        );
    }
};

export default Alerts;