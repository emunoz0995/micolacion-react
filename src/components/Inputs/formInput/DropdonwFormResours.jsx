import React from 'react';
import { useTranslation } from "react-i18next";

export default function DropdownFormResours({
  label,
  input,
  spam,
  cols,
  defaulValue,
  name,
  register,
  errors,
  options
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <select className={`${input} ${input === 'file-input'
        ? 'file-input-sm file-input-info file-input-bordered  '
        : 'input-sm'
        }  outline-none input-bordered focus:outline-none focus:ring-1  rounded-md shadow-base-300 shadow-lg`}
        {...register}
      >
        <option></option>
        {options?.map((option, index) => (
          <option key={index} value={option}>{t(option)}</option>
        ))}
      </select>
      {errors}
    </div>
  );
}
