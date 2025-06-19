import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { signupSchema } from '../validation/signupSchema';
import fundo from '../assets/images/fundo2_fec.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, setError, formState: {errors}, control} 
    = useForm({ 
        resolver: yupResolver(signupSchema), 
        defaultValues: {
            institution: 'UCB'
        }
    })

    const [institution, setInstitution] = useState('UCB');
    const [success, setSuccess] = useState('');

    const cpfMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    const handleSignup = async (formData) => {
        setError('');
        setSuccess('');

        const { name, email, cpf, birthdate, institution, registrationNumber, password } = formData
        const body = {
            name,
            email,
            cpf : cpf.replace(/\D/g, ''),
            birthdate,
            institution,
            registration_number: institution === 'UCB' ? registrationNumber : undefined,
            password
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', body)
            setSuccess('Cadastro realizado com sucesso!')
        } catch (err) {
            if (err.response && err.response.data) {
                const errors = err.response.data

                Object.keys(errors).forEach(field => {
                    const message = Array.isArray(errors[field])
                        ? errors[field][0]
                        : errors[field]

                    setError(field, {
                        type: 'server',
                        message: message
                    })
                })
            } else {
                setError('server', {
                    type: 'manual',
                    message: 'Erro de conexão com o servidor.'
                })
            }
        }
    };

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
                           pb-12 w-[398px] md:w-[471px] my-[91px]"
            >
                <div className="flex flex-col items-center w-full">
                    <span
                        className="font-bold text-[24px] mt-1 text-[#FFF1BF] text-center"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        Cadastre-se
                    </span>
                    <span
                        className="font-medium text-[18px] text-[#FFF1BF] text-center -mt-2"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Para começar
                    </span>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Nome Completo
                    </span>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="digite seu nome"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.name && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.name.message}</span>
                    )}
                    </div>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Email
                    </span>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="digite seu e-mail"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.email && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.email.message}</span>
                    )}
                    </div>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        CPF
                    </span>
                    <Controller
                        name='cpf'
                        control={control}
                        render={({ field }) => (
                        <input
                            {...field}
                            onChange={e => field.onChange(cpfMask(e.target.value))}
                            value={cpfMask(field.value || '')}
                            type="text"
                            placeholder="000.000.000-00"
                            className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                    outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                    md:w-[426px] login-password-input"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        />
                        )}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.cpf && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.cpf.message}</span>
                    )}
                    </div>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Data de nascimento
                    </span>
                    <input
                        {...register('birthdate')}
                        type="date"
                        placeholder="00/00/00"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.birthdate && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.birthdate.message}</span>
                    )}
                    </div>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Instituição de Ensino
                    </span>
                    <select
                        name='institution'
                        value={institution}
                        onChange={e => {
                            console.log(e.target.value)
                            setValue('institution', e.target.value, { shouldValidate: true })
                            setInstitution(e.target.value)
                        }}
                        className='w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] mb-2 login-password-input'
                    >
                        <option key="UCB" value="UCB">
                            Universidade Católica de Brasília
                        </option>
                        <option key="OTHER" value="">
                            Outros
                        </option>
                    </select>


                    {institution === 'UCB' ? (
                    <>
                        <span
                            className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        >
                            Matrícula
                        </span>
                        <input
                            {...register('registrationNumber')}
                            type="text"
                            placeholder="digite sua matrícula"        
                            className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                    outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                    md:w-[426px] login-password-input"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        />
                        <div className='relative w-full mb-2'>
                        {errors.registrationNumber && (
                            <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.registrationNumber.message}</span>
                        )}
                        </div>
                    </>
                    ) : (
                    <>
                        <span
                            className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        >
                            Nome da Instituição
                        </span>
                        <input
                            {...register('institution')}
                            type="text"
                            placeholder="digite o nome da instituição"        
                            className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                    outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                    md:w-[426px] login-password-input"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        />
                        <div className='relative w-full mb-2'>
                        {errors.institution && (
                            <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.institution.message}</span>
                        )}
                        </div>
                    </>
                    )}

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Senha
                    </span>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="digite sua senha"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.password && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.password.message}</span>
                    )}
                    </div>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Confirme sua Senha
                    </span>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="digite a senha novamente"
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                    <div className='relative w-full mb-2'>
                    {errors.confirmPassword && (
                        <span className="absolute left-0 top-0 self-start ml-6 text-red-500 text-sm">{errors.confirmPassword.message}</span>
                    )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit(handleSignup)}
                    className="login-button w-[350px] h-[50px] rounded-[12px] bg-[#F06F37] border-none mt-8 flex items-center 
                            justify-center cursor-pointer md:w-[426px] mb-3"
                >
                    <span
                        className="text-[#2B3722] font-bold text-[18px] tracking-wide"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        CADASTRE-SE
                    </span>
                </button>

                {errors.server && (
                    <span
                        className="text-red-500 mt-2 font-medium text-[14px]"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        {errors.server.message}
                    </span>
                )}

                {success && (
                    <span
                        className="text-green-500 mt-2 font-medium text-[14px]"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        {success}
                    </span>
                )}

                <div className="absolute bottom-7 left-0 w-full flex flex-col items-center">
                    <span
                        className="font-medium text-[16px] text-[#FFF1BF] text-center mb-1"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Já possui conta? <span className='cursor-pointer hover:underline' onClick={() => navigate('/login')}>Faça login.</span>
                    </span>
                </div>
            </div>
        </div>
    );
}