import React from 'react';
import { Link } from 'react-router-dom';

const BreadTwoParts = ({ titleOne, titleTwo, toOne }) => {
    return (
        <div className="text-sm breadcrumbs border-b-[1px] border-orange-500 mb-3">
            <ul>
                <li className='text-sky-600'><Link to={toOne}>{titleOne}</Link></li>
                <li className='text-[17px] font-semibold text-gray-500'>{titleTwo}</li>
            </ul>
        </div>
    );
};

export default BreadTwoParts;