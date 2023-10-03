import React from 'react';
import NavTop from '../components/Navbar/NavTop';
import Overlay from '../components/overlay/Overlay';
import NavLeftSchool from '../components/Navbar/NavLeftSchool';

const SchoolLayout = ({ children }) => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <NavTop />
        <Overlay />
        <NavLeftSchool />
        <div className="h-full flex md:ml-60 pt-14 bg-white">{children}</div>
      </div>
    </>
  );
};

export default SchoolLayout;
