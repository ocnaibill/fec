import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import fundo2 from '../assets/images/fundo2_fec.svg'; 
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

export default function CertificateValidationPage() {
    const { uuid } = useParams(); 
    const [certificateData, setCertificateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const response = await axios.get(`${baseUrl}/certificates/validate/${uuid}/`);
                setCertificateData(response.data);
            } catch (err) {
                setError("Certificado não encontrado ou inválido.");
                console.error("Erro ao buscar certificado:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [uuid]); 

    const renderContent = () => {
        if (loading) {
            return <p className="text-xl text-white font-['all-round-gothic'] font-bold">Verificando autenticidade...</p>;
        }

        if (error) {
            return (
                <div className="text-center font-['all-round-gothic']">
                    <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-red-500">Certificado Inválido</h1>
                    <p className="mt-2 text-lg text-gray-300">{error}</p>
                </div>
            );
        }

        if (certificateData) {
            return (
                <div className="text-center font-['all-round-gothic']">
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-[#FFF1BF]">Certificado Autêntico</h1>
                    
                    <div className="mt-6 text-left w-full max-w-lg mx-auto">
                        <div className="mb-4">
                            <p className="text-sm font-bold text-[#FFF1BF] opacity-80">NOME:</p>
                            <p className="text-lg font-semibold text-white">{certificateData.user_name}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-bold text-[#FFF1BF] opacity-80">PARTICIPOU DA ATIVIDADE:</p>
                            <p className="text-lg font-semibold text-white">{certificateData.activity_title}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-bold text-[#FFF1BF] opacity-80">DATA DO EVENTO:</p>
                            <p className="text-lg font-semibold text-white">{new Date(certificateData.activity_date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="border-t border-white/20 my-4"></div>
                        <div className="mb-4">
                            <p className="text-sm font-bold text-[#FFF1BF] opacity-80">CERTIFICADO EMITIDO EM:</p>
                            <p className="text-lg font-semibold text-white">{new Date(certificateData.created_at).toLocaleString('pt-BR')}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#FFF1BF] opacity-80">CÓDIGO DE VERIFICAÇÃO ÚNICO:</p>
                            <p className="text-md text-gray-300 break-all">{certificateData.uuid}</p>
                            <div className="text-center mt-6">
                                    <Link to="/" className="bg-[#F06F37] text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 font-['all-round-gothic']">
                                        Voltar à página inicial
                                    </Link>
                                </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${fundo2})` }}>
            
            <div className="bg-[#2B3722] p-8 rounded-[12px] shadow-2xl w-full max-w-2xl text-center">
                {renderContent()}
            </div>
        </div>
    );
}