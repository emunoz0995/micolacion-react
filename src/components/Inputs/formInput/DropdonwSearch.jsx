import React from 'react';
import { useTranslation } from "react-i18next";

export default function DropdonwSearch({
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
      <select className={`${input} ${input === 'file-input'? 'file-input-sm file-input-info file-input-bordered'
        : 'input-sm'} outline-none input-bordered focus:outline-none focus:ring-1  rounded-md shadow-base-300 shadow-lg`}
        name={name}
        defaultValue={defaulValue}
        {...register}
      >
       {options[0]?.number_days ?
          <option value="all">{t("all")}</option>:
          ""}
        
        {options?.map((option, index) => (
          option.number_days ?
          <option key={index} value={option.number_days}>{option.number_days}</option>:
          <option key={index} value={option.year}>{option.year}</option>
        ))}
      </select>
      {errors}
    </div>
  );
}
