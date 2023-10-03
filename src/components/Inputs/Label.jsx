import React, { useState } from 'react';

const Label = ({ children, htmlFor }) => {
  const labelClass =
    'transition-all absolute pointer-events-none translate-y-2 translate-x-[2px] peer-focus:-translate-y-[20px] peer-valid:-translate-y-[20px] peer-focus:scale-75 peer-focus:text-black/50 peer-valid:text-black/50 peer-focus:-translate-x-1 peer-valid:-translate-x-1 peer-valid:scale-75';

  return (
    <label className={labelClass} htmlFor="htmlFor">
      {children}
    </label>
  );
};

export default Label;
