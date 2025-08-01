import React, { useState } from 'react';
import fundo from '../assets/images/fundo2_fec.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate()

    const handleLogin = async () => {
    setError('');
    setSuccess('');

    try {
        const loginData = { email, password };

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData);

        setSuccess('Login realizado com sucesso!');
        localStorage.setItem('authToken', response.data.token); 

        toast(`Login realizado com sucesso!`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
                backgroundColor: '#5E4497',
                color: '#FFF6D7',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: '500',
                fontSize: '16px',
                borderRadius: '8px',
                width: '350px',
                height: '60px',
            },
        });

        navigate('/'); 

    } catch (err) {
        if (err.response) {
            setError(err.response.data.error || 'E-mail ou senha inválidos.');
        } else if (err.request) {
            setError('Erro de conexão com o servidor. Tente novamente.');
        } else {
            setError('Ocorreu um erro inesperado.');
        }
    } finally {
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
                           w-[398px] h-[491px] md:w-[471px] md:h-[491px]"
            >
                <div className="flex flex-col items-center w-full">
                    <span
                        className="font-bold text-[24px] mt-1 text-[#FFF1BF] text-center"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        Faça Login
                    </span>
                    <span
                        className="font-medium text-[18px] text-[#FFF1BF] text-center -mt-2"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Para continuar
                    </span>

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        E-mail
                    </span>
                    <input
                        type="text"
                        placeholder="digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />

                    <span
                        className="block mt-4 ml-6 font-medium text-[#FFF1BF] text-[16px] text-left self-start"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Senha
                    </span>
                    <input
                        type="password"
                        placeholder="digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[350px] h-[50px] rounded-[12px] bg-[#FFF1BF] border-2 border-[#2F2F2F] 
                                   outline-none font-medium text-[16px] text-[#2B3722] mt-2 pl-5 box-border 
                                   md:w-[426px] login-password-input"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleLogin}
                    className="login-button w-[350px] h-[50px] rounded-[12px] bg-[#F06F37] border-none mt-8 flex items-center 
                            justify-center cursor-pointer md:w-[426px]"
                >
                    <span
                        className="text-[#2B3722] font-bold text-[18px] tracking-wide"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}
                    >
                        LOGIN
                    </span>
                </button>

                {error && (
                    <span
                        className="text-red-500 mt-2 font-medium text-[14px]"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        {error}
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

                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center">
                    <span
                        className="font-medium text-[16px] text-[#FFF1BF] text-center mb-1"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Não tem conta? <span className='cursor-pointer hover:underline' onClick={() => navigate('/signup')}>Registre-se.</span>
                    </span>
                    <span
                        className="font-medium text-[16px] text-[#FFF1BF] text-center cursor-pointer hover:underline"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                        onClick={() => navigate('/forgot-password')}
                    >
                        Esqueceu a senha?
                    </span>
                </div>
            </div>
        </div>
    );
}