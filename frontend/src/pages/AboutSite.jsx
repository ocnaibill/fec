import React from 'react';
import { Link } from 'react-router-dom';
import fundo2 from '../assets/images/fundo2_fec.svg'; 

export default function FichaTecnicaPage() {
    const comissaoOrganizadora = [
        "Raphael Cardoso (Coordenação Geral)",
        "Ciro Inácio Marcondes",
        "Clarissa Motter",
        "Leandro Bessa",
        "Mário de Oliveira Braga",
        "Patrícia Medeiros de Lima"
    ];

    const comissaoCientifica = [
        "Alexandre Kieling (UCB)",
        "Ciro Inácio Marcondes (UCB)",
        "Clarissa Motter (UCB)",
        "Florence Dravet (UCB)",
        "Leandro Bessa (UCB)",
        "Mário de Oliveira Braga (UCB)",
        "Ana Carla Fonseca (UCB)"
    ];

    const desenvolvimentoWeb = [
        "Bianco Da Costa Oliveira",
        "Jhon Wilker Rodrigues Aquino"
    ];

    return (
        <div 
            className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-cover bg-center" 
            style={{ backgroundImage: `url(${fundo2})` }}
        >
            <div className="bg-[#2B3722] p-8 rounded-[12px] shadow-2xl w-full max-w-3xl text-white font-['Quicksand']">
                
                {/* Cabeçalho */}
                <div className="text-center mb-6 font-['all-round-gothic']">
                    <h1 className="text-3xl font-bold text-[#FFF1BF]">FICHA TÉCNICA DE REALIZAÇÃO</h1>
                    <h2 className="text-2xl text-white mt-2">III FESTIVAL DE ECONOMIA CRIATIVA - 2025</h2>
                    <p className="text-lg text-gray-300 mt-1">UNIVERSIDADE CATÓLICA DE BRASÍLIA</p>
                </div>

                <div className="border-t border-white/20 my-6"></div>

                {/* Conteúdo da Ficha Técnica */}
                <div className="text-left space-y-6 text-base">
                    {/* Seção 1 */}
                    <div>
                        <h3 className="text-lg font-bold text-[#FFF1BF] mb-2">1. Título e modalidade</h3>
                        <p className="text-gray-200 pl-4">FESTIVAL DE ECONOMIA CRIATIVA</p>
                        <p className="text-gray-200 pl-4">Evento Nacional, com atividades presenciais.</p>
                    </div>

                    {/* Seção 2 */}
                    <div>
                        <h3 className="text-lg font-bold text-[#FFF1BF] mb-2">2. Período de realização:</h3>
                        <p className="text-gray-200 pl-4">23 a 27 de junho, na Universidade Católica de Brasília.</p>
                    </div>

                    {/* Seção 3 */}
                    <div>
                        <h3 className="text-lg font-bold text-[#FFF1BF] mb-2">3. Comissão Organizadora:</h3>
                        <div className="pl-4 text-gray-200">
                            {comissaoOrganizadora.map(nome => <p key={nome}>{nome}</p>)}
                        </div>
                    </div>

                    {/* Seção 4 */}
                    <div>
                        <h3 className="text-lg font-bold text-[#FFF1BF] mb-2">4. Comissão Técnico-Científica:</h3>
                        <div className="pl-4 text-gray-200">
                            {comissaoCientifica.map(nome => <p key={nome}>{nome}</p>)}
                        </div>
                    </div>

                    {/* Seção 5 */}
                    <div>
                        <h3 className="text-lg font-bold text-[#FFF1BF] mb-2">5. Desenvolvimento/Implementação da Plataforma Web</h3>
                        <div className="pl-4 text-gray-200">
                            {desenvolvimentoWeb.map(nome => <p key={nome}>{nome}</p>)}
                        </div>
                    </div>
                </div>

                {/* Botão de Voltar */}
                <div className="text-center mt-8">
                    <Link to="/" className="bg-[#F06F37] text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 font-['all-round-gothic']">
                        Voltar à página inicial
                    </Link>
                </div>
            </div>
        </div>
    );
}