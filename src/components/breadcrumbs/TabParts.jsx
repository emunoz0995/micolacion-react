import React from 'react';
import { Link } from 'react-router-dom';

const TabParts = ({
    titleOne, titleTwo, titleTree, titleFour, titleFive, titleSix, titleSeven,
    toOne, toTwo, toTree, toFour, toFive, toSix, toSeven,
    activeOne, activeTwo, activeTree, activeFour, activeFive, activeSix, activeSeven,
    countProcces
}) => {
    return (
        <div className='flex flex-col md:flex-row sm:flex-row w-[99%] justify-between'>
            <div className="tabs mb-2">
                <Link to={toOne} className={`${activeOne === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleOne}</Link>
                <Link to={toTwo} className={`${activeTwo === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleTwo}</Link>
                <Link to={toTree} className={`${activeTree === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleTree}</Link>
                <Link to={toFour} className={`${activeFour === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleFour}</Link>
                <Link to={toFive} className={`${activeFive === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleFive}</Link>
                <Link to={toSix} className={`${activeSix === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>{titleSix}</Link>
            </div>
            <div className="tabs mb-2">
                <Link to={toSeven} className={`${activeSeven === true ? 'tab-active text-sky-500' : ''}  tab tab-lifted font-semibold`}>
                {titleSeven}
                    <div className='ml-3 w-[23px] h-[23px] bg-sky-500 text-white rounded-full flex justify-center items-center' >
                        <p>{countProcces}</p>
                    </div>
                </Link>
            </div>
        </div>

    );
};

export default TabParts;