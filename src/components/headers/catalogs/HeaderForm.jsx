import React from 'react';



const HeaderSimple = ({title, to}) => {
    return (
        <div className='w-ful flex text-2xl font-semibold justify-start gap-2 mb-5 border-b-2 border-orange-500'>
            <h1 className='mb-2'>{title}</h1>
        </div>
    );
};

export default HeaderSimple;