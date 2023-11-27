import React from 'react';
import NavTop from '../components/Navbar/NavTop';
import Overlay from '../components/overlay/Overlay';
import NavLeftSchool from '../components/Navbar/NavLeftSchool';

const SchoolLayout = ({ children, value, options, onchange,view, viewOption,onChangeSelect }) => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <NavTop value={value} options={options} onChange={onchange} view={view} viewOption={viewOption} onChangeSelect={onChangeSelect} />
        <Overlay />
        <NavLeftSchool />
        <div className="h-full flex md:ml-60 pt-14 bg-white">{children}</div>
      </div>
    </>
  );
};

export default SchoolLayout;
