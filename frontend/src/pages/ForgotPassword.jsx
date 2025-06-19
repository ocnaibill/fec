import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotSchema } from '../validation/forgotPasswordSchema'
import fundo from '../assets/images/fundo2_fec.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CloseIcon from '../assets/images/CloseIcon.svg'


export default function ForgotPassword() {
    const { register, handleSubmit,  formState: {errors}} = useForm({
        resolver: yupResolver(forgotSchema)
    })
    const [popup, setPopup] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleForgotPassword = async (body) => {
        setError('')
        try {
            await axios.post('http://localhost:8000/api/auth/password-reset', body)

            setPopup(true)
        } catch {
            setError('Erro de conexão com o servidor.')
        }
    }

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url(${fundo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="bg-[#2B3722] rounded-lg flex flex-col items-center pt-6 relative shadow-lg 
                           w-[398px] h-[318px] md:w-[471px]"
            >
                <div className="flex flex-col items-center w-full">
                    {error && <span
                        className="absolute top-1 text-red-500 mt-2 font-medium text-[14px]"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        {error}
                    </span>}
                    <span
                        className="font-bold text-[24px] mt-1 text-[#FFF1BF] text-center"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        Recuperação de senha
                    </span>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        E-mail
                    </span>
                    <input
                        {...register('email')}
                        type="text"
                        placeholder="digite seu e-mail"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='w-full'>
                        {errors.email && (
                            <span className="absolute pl-1 self-start ml-6 text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit(handleForgotPassword)}
                    className="login-button w-[350px] h-[50px] rounded-[12px] bg-[#F06F37] border-none mt-8 flex items-center 
                            justify-center cursor-pointer md:w-[426px]"
                >
                    <span
                        className="text-[#2B3722] font-bold text-[18px] tracking-wide"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        RECUPERAR A SENHA
                    </span>
                </button>

                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center">
                    <span
                        className="font-medium text-[16px] text-[#FFF1BF] text-center mb-1 cursor-pointer hover:underline"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                        onClick={() => navigate('/login')}
                    >
                        Voltar para o login
                    </span>
                </div>

                {popup && <div className='absolute top-[-100px] w-[398px] md:w-[471px] h-[80px] bg-[#5E4497] rounded-[8px] p-2.5 flex items-center gap-2.5'>
                    <p className='flex-1 text-[16px]'>
                        Verifique seu email meuemail@servidor.com com as instruções para recuperação de senha
                    </p>
                    <img src={CloseIcon} onClick={() => setPopup(false)} className='w-[24px] cursor-pointer' />
                </div>}
            </div>
        </div>
    );
}