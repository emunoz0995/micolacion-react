import React, { useState } from 'react';
import Label from './Label';

const Input = ({ children, id, type, isPasswordHidden,  register , value, autoComplete }) => {
  const inputClass = `w-full py-2 focus:outline-none peer bg-transparent shadow-[inset_0_-1px_0_0_rgba(29,34,43,.2)]`;

  return (
    <>
      <input
        autoComplete={autoComplete}
        required={false}
        id={id}
        type={type}
        className={inputClass}
        value={value}
        {...register}
      />
    </>
  );
};

export default Input;
