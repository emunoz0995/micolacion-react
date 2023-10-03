import React from 'react';
import BtnAdd from './BtnAdd';

export default function BtnContainer({ setShowModal }) {
  return (
    <div className="absolute z-20 right-4 bottom-4 md:hidden">
      <BtnAdd setShowModal={setShowModal} />
    </div>
  );
}
