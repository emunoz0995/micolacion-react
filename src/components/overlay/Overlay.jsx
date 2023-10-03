import React from 'react';
import { useToolbarStore } from '../../store/VitalStore';

const Overlay = ({ setIsToolbarOpen }) => {
  const { isToolbarOpen, closeToolbar } = useToolbarStore((state) => state);

  return (
    <div
      onClick={() => closeToolbar()}
      className={`md:hidden absolute top-0 backdrop-blur-[2px] left-0 w-full h-full transition-all bg-black/50 z-10 ${
        isToolbarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none '
      }}`}
    ></div>
  );
};

export default Overlay;
