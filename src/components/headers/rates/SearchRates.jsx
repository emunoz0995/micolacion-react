import React from 'react';
import { FaSearch } from 'react-icons/fa';
import DropdownForm from '../../Inputs/formInput/dropdonwForm';
import DropdonwSearch from '../../Inputs/formInput/DropdonwSearch';
import { useForm } from 'react-hook-form';


const SearchRates = ({ 
    titleOne, titleTwo, titleThree, titleFour, 
    optionOne, optionTwo, optionThree, optionFour,
    registerOne,registerTwo,registerThree,registerFour,
    onclick
}) => {


    return (
        <div className='flex gap-2 p-2 border-t-[1px] border-orange-500 mt-[-5px] mb-2'>
            <DropdonwSearch
                label={titleOne}
                input="input"
                spam={false}
                cols={1}
                   register={registerOne}
                options={optionOne}
            />

            <DropdownForm
                label={titleTwo}
                input="input"
                spam={true}
                cols={1}
                   register={registerTwo}
                options={optionTwo}
            //errors={errors.country_id && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
            />
            <DropdownForm
                label={titleThree}
                input="input"
                spam={true}
                cols={1}
                   register={registerThree}
                options={optionThree}
            // errors={errors.country_id && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
            />
            <DropdonwSearch
                label={titleFour}
                input="input"
                spam={false}
                cols={1}
                   register={registerFour}
                options={optionFour}
            />

            <div
                className={`flex flex-col w-[50%] cols cols-1 justify-end`}
            >

                <button
                    className="bg-sky-400 hover:bg-sky-600  text-white rounded-md shadow-base-300 shadow-lg h-[31px] p-2 flex items-center gap-2"
                    type="submit"
                    onClick={()=>onclick()}
                >
                    <FaSearch /> Buscar
                </button>
            </div>
        </div>

    );
};

export default SearchRates;