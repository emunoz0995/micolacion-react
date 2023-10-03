import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';


const HeaderSimple = ({title, to}) => {
    return (
        <div className='w-ful flex text-2xl font-semibold justify-start gap-2 mb-5'>
            <h1>{title}</h1>
            <BtnAdd to={to}/>
        </div>
    );
};

export default HeaderSimple;