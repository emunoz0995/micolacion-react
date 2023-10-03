import React from 'react';
import { Oval } from 'react-loader-spinner';
import HomeLayout from '../../layouts/HomeLayout';

export default function MainLoader() {
  return (
      <div className="m-auto flex items-center justify-center">
        <Oval
          height={50}
          width={50}
          color="#2ca8ff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#bae6fd"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
  );
}
