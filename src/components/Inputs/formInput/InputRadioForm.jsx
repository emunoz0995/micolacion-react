import React from 'react';


export default function InputRadioForm({
  label,
  type,
  spam,
  cols,
  register,
  colors,
  errors,
  errorsTwo,
  defaultChecked
}) {


  return (
    <div
      className={`flex flex-col w-full cols justify-center content-center cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1 text-center">
        <p className='w-full'>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <div className='flex gap-5 w-full justify-center'>
        <div className='flex gap-1'>
          <label htmlFor="">SI</label>
          <input className='w-5'
            type={type}
            value="Cancelado"
            defaultChecked="Cancelado"
            {...register}
          />

        </div>
        <div className='flex gap-1'>
          <label htmlFor="">NO</label>
          <input className='w-5'
            type={type}
            value="Pendiente Pago"
            defaultChecked="Pendiente Pago"
            {...register}
          />
        </div>

      </div>
      {errors}
      {errorsTwo}
    </div>
  );
}
