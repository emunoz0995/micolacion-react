import React from 'react';
import { useToolbarStore } from '../../store/VitalStore';

const BtnDashboard = ({ children }) => {
  const { closeToolbar } = useToolbarStore((state) => state);

  return (
    <div
      onClick={() => closeToolbar()}
      className={`cursor-pointer items-center flex transition-all duration-100 w-full py-2 px-4 gap-2  text-sm font-normal focus:active hover:active`}
    >
      {children}
    </div>
  );
};

export default BtnDashboard;
