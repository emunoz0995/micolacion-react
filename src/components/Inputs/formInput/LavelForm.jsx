import React from 'react';


export default function LavelForm({
  label,
  type,
  input,
  spam,
  cols,
  register,
  placeholder,
  errors,
  errorsTwo,
  defaultValue,
  onChange,
  disable,
  value,
  link
}) {

  return (
    <div
      className={`flex w-full`}
    >
      <label className="text-sm w-[100px] flex items-center m-1">
        <p>{label +":"}</p>  
      </label>
      <label htmlFor="">
        <p>{value}</p>
      </label>
        {/* <input
          className={`${input} ${input === 'file-input'
            ? 'file-input-sm file-input-info file-input-bordered  '
            : 'input-sm'
            }  outline-none input-bordered focus:outline-none focus:ring-1 rounded-md shadow-base-300 shadow-lg ml-5`}
          type={type}
          {...register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange ? () => onChange() : null}
          disabled
        /> 
      {errors}
      {errorsTwo} */}
    </div>
  );
}
