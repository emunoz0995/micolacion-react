import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';


export default function InputFormSearch({
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
  serachRepresetative,
  value,
  link
}) {

  const [representativeCi, setRepresentativeId] = useState("");

  return (
    <div
      className={`flex flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1">
        <p>{label + " "} <a className="text-sky-600" href="https://drive.google.com/file/d/1E_XeEvXUKvCNGforCZdmo7htKsV-tS8K/view?usp=sharing" target="_blank">{link}</a></p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <div className='flex'>
        <input
          className={`${input} ${input === 'file-input'
            ? 'file-input-sm file-input-info file-input-bordered  '
            : 'input-sm'
            }  outline-none input-bordered focus:outline-none focus:ring-1 w-full rounded-l-lg shadow-base-300 shadow-lg`}
          type={type}
          {...register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => setRepresentativeId(e.target.value)}
        />
        <button type='button' className=' z-10 text-white relative w-12 bg-sky-500  right-2 flex justify-center items-center rounded-r-lg' onClick={() => serachRepresetative(representativeCi)}>
          <FaSearch />
        </button>
      </div>
      {errors}
      {errorsTwo}
    </div>
  );
}
