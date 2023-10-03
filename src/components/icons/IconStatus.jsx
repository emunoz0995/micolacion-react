import React from 'react';
import { FaCircle } from 'react-icons/fa';

const ActiveIcon = ({ active }) => {
    return (
        <>
            {active ? (<FaCircle size={"10px"} color='#4cde4c' />) : (<FaCircle size={"10px"} color='#bebebf' />)}
        </>

    );


};

export default ActiveIcon;