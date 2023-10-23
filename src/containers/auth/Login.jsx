import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../../store/slices/catalogs/users.slice';
//UI
import Input from '../../components/Inputs/Input';
import InputGroup from '../../components/Inputs/InputGroup';
import Label from '../../components/Inputs/Label';
import ShowPassword from '../../components/Inputs/ShowPassword';
import logo from '../../assets/colacion.png';
import UserLogo from '../../components/Inputs/UserLogo';
import Alerts from '../../components/alerts/Alerts';

const Login = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const userState = useSelector(state => state.users)

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lcvId = "bEB9ZLKPgW";
  const cervantesId = "ERdKGa9kbV";

  const submit = (data) => {
    dispatch(signInThunk(data));
  }

  if (Object.keys(userState.user).length !== 0) {
    if(userState.user.roleId === 1){
      navigate('/');
    } else if (userState.user.roleId === 2){
      navigate(`/schools/${lcvId}/refrigerios_bm`);
    } else if (userState.user.roleId === 3){
      navigate(`/schools/${cervantesId}/refrigerios_primaria`);
    }
    
  }
  return (
    <div
      className={`text-[#004841 ] relative transition-all h-full w-full min-h-screen bg-cover bg-center bg-[url('../src/assets/logo6.jpg')] `}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60 backdrop-blur-sm"></div>
      <div className="w-full transition-all sm:w-2/3 md:w-[40%] h-full bg-[#EAFDFA]/20 sm:bg-[#EAFDFA]/50 backdrop-blur-lg absolute right-0 shadow-lg shadow-gray-700 flex flex-col items-center justify-center">
        <div className='absolute top-8 right-2'>
          {userState.error === "invalid password" || userState.error === "resource not found" ? (
            <Alerts alert="error" />
          ) : (
            ""
          )}
        </div>
        <h1 className="text-center mt-10 text-5xl font-bold">Bienvenido</h1>
        <form onSubmit={handleSubmit(submit)} className="w-2/3 max-w-xs mx-auto mb-16">
          <InputGroup>
            <Input
              id="username"
              type="text"
              register={register("email")}
             // value="peef@prueba.com"
            />
            <Label htmlFor="username">Usuario</Label>
            <UserLogo />
          </InputGroup>
          <InputGroup>
            <Input
              isPasswordHidden={isPasswordHidden}
              type={isPasswordHidden ? 'password' : 'text'}
              register={register("password")}
              //value="jintriago2022"
              autoComplete="off"
            />
            <Label htmlFor="password">Contraseña</Label>
            <ShowPassword
              isPasswordHidden={isPasswordHidden}
              setIsPasswordHidden={setIsPasswordHidden}
            />
          </InputGroup>
          <button type=" submit" className="btn shadow-lg btn-block bg-sky-400 hover:bg-sky-700 border-none rounded-none mt-10 text-white">
            Ingresar
          </button>
        </form>
      </div>
      <div className="absolute w-[180px] h-[20px] z-10 -translate-x-1/2 top-5 left-1/2  sm:translate-x-0  sm:top-[85%] sm:left-5 rotate-[0.5deg] ">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
