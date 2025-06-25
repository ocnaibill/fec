import React, { useRef, useState, useEffect, use } from 'react';

import fundo from '../assets/images/fundo2_fec.svg';
import noUserPhoto from '../assets/images/usuarioSemFoto.svg'
import qrScannerIcon from '../assets/images/ScannerIcon.svg'
import successIcon from '../assets/images/successIcon.svg'
import failIcon from '../assets/images/failIcon.svg'

import { Html5Qrcode } from 'html5-qrcode'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Scanner() {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

    const [scanState, setScanState] = useState('permit')
    const scannerElRef = useRef(null)
    const scannerRef = useRef(null)

    const isAuthenticated = localStorage.getItem('authToken');

    const [credentiator, setCredentiator] = useState({})
    const [error, setError] = useState('Erro de conexão com o servidor')
    const [subUser, setSubUser] = useState(null)
    const [subscription, setSubscription] = useState(null)

    const [eventTheme, setEventTheme] = useState({})
    const navigate = useNavigate()
    let cameraId
    
    function askPermission() {
        Html5Qrcode.getCameras().then(devices => {
            console.log("Câmeras disponíveis: ", devices)

            startScanning()
            setScanState('active')
        })
    }

    function startScanning() {
        scannerRef.current = new Html5Qrcode('scanner')

        scannerRef.current.start(
            { facingMode: "environment" },
            {
                fps: 5,
                qrbox: { width: 300, height: 300 }
            },
            onSuccess
        )
    }

    async function onSuccess(decodedText, decodedResult) {
        scannerRef.current.pause()
        setScanState('loading')

        try {
            let response = await axios.get(`${baseUrl}/event/search-subscription/${decodedText}`,{ 
                headers: {
                    Authorization: `Token ${isAuthenticated}`
                }
            })

            setSubscription(response.data)
            setSubUser(response.data.user)

            response = await axios.get(`${baseUrl}/event/${response.data.activity.event}/details`)
            setEventTheme({
                color: response.data.eventColor,
                logo: baseUrl.replace('/api', response.data.logo)
            })

            setScanState('confirm')
        } catch(err) {
            console.error(err)
            setError(err.response?.data)
            setScanState('failed')
        }
    }
    
    async function proceedProcessing() {
        setScanState('loading')

        try {
            console.log(isAuthenticated)
            const response = await axios.patch(`${baseUrl}/event/validate-subscription/${subscription.uuid}`,null,{ 
                headers: {
                    Authorization: `Token ${isAuthenticated}`
                }
            })

            setScanState('success')
        } catch(err) {
            console.error(err)
            setError(err.response?.data?.erro)
            setScanState('failed')
        }
    }

    function stopScanning() {
        scannerRef.current.stop()
        setScanState('permit')
    }

    function restartScanning() {
        scannerRef.current.resume()
        setScanState('active')
    }

    function getFirstAndLastNames(name) {
        const parts = name.trim().split(' ')
        if (parts.length === 0) return ''
        if (parts.length === 1) return parts[0]
        return `${parts[0]} ${parts[parts.length-1]}`
    }
    
    useEffect(() => {
        if (!isAuthenticated) return navigate('/login')

        async function  fetchCurrentUser(params) {
            try {
                const response = await axios.get(`${baseUrl}/auth/me`,{ 
                    headers: {
                        Authorization: `Token ${isAuthenticated}`
                    }
                })

                setCredentiator(response.data)
                const isCredenciator = response.data.role

                if (!isCredenciator || isCredenciator !== 'credenciador') navigate('/not-found')
            } catch(err) {
                console.error(err)
                return navigate('/login')
            }
        }

        fetchCurrentUser()

        return () => {
            scannerRef.current?.stop().then(() => {
                scannerRef.current?.clear();
            }).catch(err => {
                console.error("Erro ao parar o scanner:", err);
            });
        };
    }, [])

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url(${fundo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: '"all-round-gothic", sans-serif',
                color: '#FFF1BF',
            }}
        >   
            {credentiator.role === 'credenciador' && (<div
                className={`bg-[#2B3722] rounded-lg flex flex-col items-center relative shadow-lg 
                            w-[398px] md:w-[471px] h-[591px] ${(scanState === 'success' || scanState === 'failed') ? 'p-1' : 'p-6'}`}
            >
                <div className={`h-full flex flex-col items-center ${scanState === 'active' ? 'flex' : 'hidden'}`} ref={r => scannerElRef.current = r}>
                    <p className='text-[32px] font-bold'>Escaneie o ingresso</p>
                    <div className='w-[320px] flex-1 flex items-center'>
                        <div id='scanner' className='w-[320px] h-[320px]'></div>
                    </div>
                    <button
                        className='!bg-[#C43934] w-full mb-4 !text-[18px] !font-bold'
                        onClick={() => stopScanning()}
                    >
                        Fechar
                    </button>
                </div>

                {scanState === 'permit' && (
                    <>
                        <p className='text-[32px] font-bold'>Olá, {credentiator.name?.trim().split(' ')[0]}!</p>
                        <img src={qrScannerIcon} className=' flex-1 w-[240px]' />
                        <button
                            className='!bg-[#F06F37] w-full mb-4 !text-[18px] !font-bold'
                            onClick={() => askPermission()}
                        >
                            Ativar Câmera
                        </button>
                        <p className='text-center'>Permita a utilização de sua câmera para começar a credenciar.</p>
                    </>
                )}

                {scanState === 'loading' && (
                    <>
                        <p 
                        className='text-[32px] font-bold'
                        >
                            PROCESSANDO...
                        </p>

                        <span 
                            className='animate-spin w-[100px] h-[100px] rounded-full border-[5px] border-[#FFF1C0] border-l-transparent mt-40'
                        ></span>
                    </>
                )}

                {scanState === 'confirm' && (
                    <>
                        <p className='text-[26px] font-bold' >Verifique os dados</p>
                        
                        <div className='w-full flex-1 flex flex-col justify-center'>
                            <div className='bg-[#FFF1BF] w-full min-h-[300px] flex flex-col justify-center rounded-[16px] text-[#2B3722] overflow-hidden p-4'>
                                <p className='text-[24px] font-bold' >Visitante</p>
                                <div className='flex bg-[#e9dcafa8] flex-col items-center gap-1 py-2 rounded-[8px]'>
                                    <p className='text-[24px] text-center'>{getFirstAndLastNames(subUser.name)}</p>
                                    <div className='w-[160px] h-[160px] overflow-hidden rounded-full border-[#2B3722] border-2'>
                                        <img src={subUser.photo ? baseUrl.replace('/api', subUser.photo)  : noUserPhoto} className="w-full h-full object-cover"/>
                                    </div>
                                </div>

                                <p className='text-[24px] font-bold mt-5' >Atividade</p>
                                <div className='flex bg-[#e9dcafa8] text-[20px] text-center rounded-[8px] overflow-hidden'>
                                    <img 
                                        src={eventTheme.logo}
                                        className=' h-[80px] translate-x-[-50%]'
                                    />
                                    <div className={`w-full text-start text-[${eventTheme.color}] flex flex-col justify-center`}>
                                        <p>{subscription.activity.title}</p>
                                        <p className='flex items-center gap-2'>
                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.6875 0.640625C10.0312 0.640625 13.375 2.64688 13.375 7.32812C13.375 12.0094 8.91667 15.9661 6.6875 17.3594C4.31901 16.1055 -4.66393e-05 12.3438 3.77728e-10 7.32812C4.67443e-05 2.30137 3.34375 0.640625 6.6875 0.640625ZM6.6875 3.98438C4.84086 3.98451 3.34388 5.48148 3.34375 7.32812C3.34375 9.17488 4.84078 10.6727 6.6875 10.6729C8.53434 10.6729 10.0322 9.17496 10.0322 7.32812C10.0321 5.4814 8.53426 3.98438 6.6875 3.98438Z" fill={eventTheme.color}/>
                                            </svg>

                                            {subscription.activity.local}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex gap-2'>
                            <button
                                className='!bg-[#C43934] !m-0 w-full mb-4 !text-[18px] !font-bold'
                                onClick={() => restartScanning()}
                            >
                                Cancelar
                            </button>
                            <button
                                className='!bg-[#F06F37] !m-0 w-full mb-4 !text-[18px] !font-bold'
                                onClick={() => proceedProcessing()}
                            >
                                Prosseguir
                            </button>
                        </div>
                    </>
                )}

                {scanState === 'success' && (
                    <div className='w-full h-full p-5 bg-[#FFF1BF] rounded-[5px] flex flex-col justify-between items-center'>
                        <p className='text-[48px] text-center text-[#2B3722] font-bold'>Presença confirmada!</p>
                        <img src={successIcon} className='w-[200px]' />
                        <button
                            className='!bg-[#F06F37] !m-0 w-full mb-4 !text-[18px] !font-bold'
                            onClick={() => restartScanning()}
                        >
                            Voltar ao Leitor
                        </button>
                    </div>    
                )}

                {scanState === 'failed' && (
                    <div className='w-full h-full p-5 bg-[#FFF1BF] rounded-[5px] flex flex-col justify-between items-center'>
                        <p className='text-[36px] text-center text-[#2B3722] font-bold'>{error}</p>
                        <img src={failIcon} className='w-[200px]' />
                        <button
                            className='!bg-[#F06F37] !m-0 w-full mb-4 !text-[18px] !font-bold'
                            onClick={() => restartScanning()}
                        >
                            Voltar ao Leitor
                        </button>
                    </div>
                )}
            </div>)}
            <style>
            {`
                #scanner video {
                    width: 320px !important;
                    height: 320px !important;
                    object-fit: cover;
                }

                #qr-shaded-region {
                    border: 3px solid rgba(0,0,0,0) !important;
                }

                #qr-shaded-region > * {
                    background-color: #FFF1BF !important;
                }
            `}
            </style>
        </div>
    );
}