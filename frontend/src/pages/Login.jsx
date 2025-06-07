import React, { useState } from 'react';
import fundo from '../assets/images/fundo2_fec.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async () => {
        setError('');
        setSuccess('');
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login realizado com sucesso!');
                alert(`Token: ${data.token}`);
                // Salvar o token no localStorage ou em um contexto global
                localStorage.setItem('authToken', data.token);
            } else {
                setError(data.error || 'Erro ao realizar login.');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor.');
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100vw',
                backgroundImage: `url(${fundo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: 471,
                    height: 491,
                    background: '#2B3722',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 24,
                    position: 'relative',
                    boxShadow: `
                        0 4px 4px 0 rgba(0,0,0,0.25), /* drop shadow */
                        inset 0 4px 4px 0 rgba(0,0,0,0.25) /* inner shadow */
                    `,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <span
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 700,
                            fontSize: 24,
                            marginTop: 4,
                            color: '#FFF1BF',
                            textAlign: 'center',
                        }}
                    >
                        Faça Login
                    </span>
                    <span
                        style={{
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 18,
                            color: '#FFF1BF',
                            textAlign: 'center',
                            marginTop: -8,
                        }}
                    >
                        Para continuar
                    </span>

                    <span
                        style={{
                            display: 'block',
                            marginTop: 14,
                            marginLeft: 24,
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#FFF1BF',
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                        }}
                    >
                        E-mail
                    </span>
                    <input
                        type="text"
                        placeholder="digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: 426,
                            height: 50,
                            borderRadius: 12,
                            background: '#FFF1BF',
                            border: '2px solid #2F2F2F',
                            outline: 'none',
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#2B3722',
                            marginTop: 8,
                            paddingLeft: 20,
                            boxSizing: 'border-box',
                        }}
                        className="login-password-input"
                    />

                    <span
                        style={{
                            display: 'block',
                            marginTop: 18,
                            marginLeft: 24,
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#FFF1BF',
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                        }}
                    >
                        Senha
                    </span>
                    <input
                        type="password"
                        placeholder="digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: 426,
                            height: 50,
                            borderRadius: 12,
                            background: '#FFF1BF',
                            border: '2px solid #2F2F2F',
                            outline: 'none',
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#2B3722',
                            marginTop: 8,
                            paddingLeft: 20,
                            boxSizing: 'border-box',
                        }}
                        className="login-password-input"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleLogin}
                    style={{
                        width: 426,
                        height: 50,
                        borderRadius: 12,
                        background: '#F06F37',
                        border: 'none',
                        marginTop: 35,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        style={{
                            color: '#2B3722',
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 700,
                            fontSize: 18,
                            letterSpacing: 1,
                        }}
                    >
                        LOGIN
                    </span>
                </button>

                {error && (
                    <span
                        style={{
                            color: 'red',
                            marginTop: 10,
                            fontFamily: '"Quicksand", sans-serif',
                            fontSize: 14,
                        }}
                    >
                        {error}
                    </span>
                )}

                {success && (
                    <span
                        style={{
                            color: 'green',
                            marginTop: 10,
                            fontFamily: '"Quicksand", sans-serif',
                            fontSize: 14,
                        }}
                    >
                        {success}
                    </span>
                )}

                <div
                    style={{
                        position: 'absolute',
                        bottom: 24,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#FFF1BF',
                            textAlign: 'center',
                            marginBottom: 4,
                        }}
                    >
                        Não tem conta? Registre-se.
                    </span>
                    <span
                        style={{
                            fontFamily: '"Quicksand", sans-serif',
                            fontWeight: 500,
                            fontSize: 16,
                            color: '#FFF1BF',
                            textAlign: 'center',
                        }}
                    >
                        Esqueceu a senha?
                    </span>
                </div>
            </div>
        </div>
    );
}