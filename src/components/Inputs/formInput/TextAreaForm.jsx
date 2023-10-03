import React from 'react';


export default function TextAreaForm({
  label,
  input,
  spam,
  cols,
  register,
  placeholder,
  errors,
  errorsTwo,
  defaultValue

}) {


  return (
    <div
      className={`flex flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <textarea 
        className={`${input} ${input === 'file-input'
          ? 'file-input-sm file-input-info file-input-bordered  '
          : 'input-sm'
          }  outline-none input-bordered focus:outline-none focus:ring-1 textarea h-[150px] rounded-md shadow-base-300 shadow-lg`}
        {...register}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {errors}
      {errorsTwo}
    </div>
  );
}
