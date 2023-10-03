import React from 'react';
import { Link } from 'react-router-dom';

const TabParts = ({
    titleOne, titleTwo, titleTree, titleFour, titleFive, titleSix,
    toOne, toTwo, toTree, toFour, toFive, toSix,
    activeOne, activeTwo, activeTree, activeFour, activeFive, activeSix
}) => {
    return (
        <div className='flex w-[99%] justify-between'>
            <div className="tabs mb-2">
                <Link to={toOne} className={`${activeOne === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleOne}</Link>
                <Link to={toTwo} className={`${activeTwo === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleTwo}</Link>
                <Link to={toTree} className={`${activeTree === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleTree}</Link>
                <Link to={toFour} className={`${activeFour === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleFour}</Link>
                <Link to={toFive} className={`${activeFive === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleFive}</Link>
            </div>
            <div className="tabs mb-2">
                <Link to={toSix} className={`${activeSix === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleSix}</Link>
            </div>
        </div>

    );
};

export default TabParts;