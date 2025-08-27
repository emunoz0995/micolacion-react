import React from 'react';

export default function DropdownForm({
  label,
  input,
  spam,
  cols,
  defaulValue,
  name,
  register,
  errors,
  options,
  disable
}) {

  return (
    <div
      className={`flex flex-col w-[50%] cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>

      {disable ?
        <select className={`${input} ${input === 'file-input' ? 'file-input-sm file-input-info file-input-bordered'
          : 'input-sm'} outline-none input-bordered focus:outline-none focus:ring-1  rounded-md shadow-base-300 shadow-lg`}
          name={name}
          defaultValue={defaulValue}
          {...register}
          disabled
        >
          <option></option>
          {options?.map((option, index) => (
            <option key={option?.id} value={Number(option?.id)}>{option?.name}</option>
          ))}
        </select>
        :
        <select className={`${input} ${input === 'file-input' ? 'file-input-sm file-input-info file-input-bordered'
          : 'input-sm'} outline-none input-bordered focus:outline-none focus:ring-1  w-[250px] rounded-md shadow-base-300 shadow-lg`}
          name={name}
          defaultValue={defaulValue}
          {...register}

        >
          <option></option>
          {options?.map((option, index) => (
            <option key={option.id} value={Number(option.id)}>{option.name}</option>
          ))}
        </select>
      }
      {errors}
    </div>
  );
}
