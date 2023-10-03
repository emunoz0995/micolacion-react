import React from 'react';



const HeaderSection = ({title}) => {
    return (
        <div className='w-ful flex text-sm font-semibold justify-start gap-2 mb-1 border-b-2 border-gray-300'>
            <h1 className='mb-2 text-sky-400'>{title}</h1>
        </div>
    );
};

export default HeaderSection;