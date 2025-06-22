import React, { useRef, useState, useEffect } from 'react';
import fundo from '../assets/images/fundo2_fec.svg';
import qrScannerIcon from '../assets/images/ScannerIcon.svg'
import successIcon from '../assets/images/successIcon.svg'
import failIcon from '../assets/images/failIcon.svg'
import { Html5Qrcode } from 'html5-qrcode'
import axios from 'axios';

export default function Scanner() {
    const [scanState, setScanState] = useState('permit')
    const scannerElRef = useRef(null)
    const scannerRef = useRef(null)

    let cameraId
    
    function askPermission() {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                cameraId = devices[0].id

                startScanning()
                setScanState('active')
            }
        })
    }

    function startScanning() {
        scannerRef.current = new Html5Qrcode('scanner')

        scannerRef.current.start(
            cameraId,
            {
                fps: 5,
                qrbox: { width: 300, height: 300 }
            },
            onSuccess
        )
    }

    function onSuccess(decodedText, decodedResult) {
        scannerRef.current.pause()
        setScanState('loading')
    }

    function proceedProcessing() {
        
    }

    function stopScanning() {
        scannerRef.current.stop()
        setScanState('permit')
    }

    function restartScanning() {
        scannerRef.current.resume()
        setScanState('active')
    }

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
            <div
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
                        <p className='text-[32px] font-bold'>Olá, Pessoinha! </p>
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
                                <div className='flex bg-[#e9dcafa8] flex-col items-center gap-4 py-2 rounded-[8px]'>
                                    <p className='text-[20px] text-center'>Mikaelly Kimberlly</p>
                                    <img src={'http://localhost:8000/media/event_logos/logo_conecom_HtRuO6E.svg'} className='w-[160px] h-[160px] rounded-full border-[#2B3722] border-2' />
                                </div>

                                <p className='text-[24px] font-bold mt-5' >Atividade</p>
                                <div className='flex bg-[#e9dcafa8] text-[20px] text-[#18113A] text-center rounded-[8px] overflow-hidden'>
                                    <img 
                                        src='http://localhost:8000/media/event_logos/logo_conecom_HtRuO6E.svg'
                                        className=' h-[80px] translate-x-[-50%]'
                                    />
                                    <div className='w-full text-start flex flex-col justify-center'>
                                        <p>Titulo da Atividade</p>
                                        <p>Local</p>
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
                                onClick={() => stopScanning()}
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
                            onClick={() => stopScanning()}
                        >
                            Voltar ao Leitor
                        </button>
                    </div>    
                )}

                {scanState === 'failed' && (
                    <div className='w-full h-full p-5 bg-[#FFF1BF] rounded-[5px] flex flex-col justify-between items-center'>
                        <p className='text-[36px] text-center text-[#2B3722] font-bold'>Ocorreu um erro!</p>
                        <img src={failIcon} className='w-[200px]' />
                        <button
                            className='!bg-[#F06F37] !m-0 w-full mb-4 !text-[18px] !font-bold'
                            onClick={() => stopScanning()}
                        >
                            Voltar ao Leitor
                        </button>
                    </div>
                )}
            </div>
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