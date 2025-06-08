import React, { useState } from 'react';
import setaEsquerdaEvento from '../assets/images/setaEsquerdaEvento.svg';
import setaDireitaEvento from '../assets/images/setaDireitaEvento.svg';
import logoConecom from '../assets/images/logo_conecom.svg';
import logoHackaton from '../assets/images/logo_hackaton.svg';
import logoInterprogramas from '../assets/images/logo_interprogramas.svg';
import logoSemanaDesign from '../assets/images/logo_semanadesign.svg';

export default function Events() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Dados para cada página
    const pages = [
        {
            title: 'CONECOM',
            description: 'Aqui você pode adicionar os eventos do CONECOM.',
            buttonColor: '#2C53A1',
            textColor: '#2C53A1',
            logo: logoConecom,
            activities: [
                { time: '00:10', title: 'CONECOM Atividade 1' },
                { time: '00:20', title: 'CONECOM Atividade 2' },
                { time: '00:30', title: 'CONECOM Atividade 3' },
                { time: '00:40', title: 'CONECOM Atividade 4' },
                { time: '00:50', title: 'CONECOM Atividade 5' },
                { time: '01:00', title: 'CONECOM Atividade 6' },
            ],
        },
        {
            title: 'SEMANA DO DESIGN',
            description: 'Aqui você pode adicionar os eventos da Semana do Design.',
            buttonColor: '#ED5F2E',
            textColor: '#ED5F2E',
            logo: logoSemanaDesign,
            activities: [
                { time: '10:00', title: 'Design Atividade 1' },
                { time: '10:20', title: 'Design Atividade 2' },
                { time: '10:30', title: 'Design Atividade 3' },
                { time: '10:40', title: 'Design Atividade 4' },
                { time: '10:50', title: 'Design Atividade 5' },
                { time: '11:00', title: 'Design Atividade 6' },
            ],
        },
        {
            title: 'INTERPROGRAMAS',
            description: 'Aqui você pode adicionar os eventos de Interprogramas.',
            buttonColor: '#C91E1D',
            textColor: '#C91E1D',
            logo: logoInterprogramas,
            activities: [
                { time: '14:00', title: 'Interprogramas Atividade 1' },
                { time: '14:20', title: 'Interprogramas Atividade 2' },
                { time: '14:30', title: 'Interprogramas Atividade 3' },
                { time: '14:40', title: 'Interprogramas Atividade 4' },
                { time: '14:50', title: 'Interprogramas Atividade 5' },
                { time: '15:00', title: 'Interprogramas Atividade 6' },
            ],
        },
        {
            title: 'HACKATHON',
            description: 'Aqui você pode adicionar os eventos da Hackathon.',
            buttonColor: '#8A3B8E',
            textColor: '#8A3B8E',
            logo: logoHackaton,
            activities: [
                { time: '16:00', title: 'Hackathon Atividade 1' },
                { time: '16:20', title: 'Hackathon Atividade 2' },
                { time: '16:30', title: 'Hackathon Atividade 3' },
                { time: '16:40', title: 'Hackathon Atividade 4' },
                { time: '16:50', title: 'Hackathon Atividade 5' },
                { time: '17:00', title: 'Hackathon Atividade 6' },
            ],
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? pages.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === pages.length - 1 ? 0 : prevIndex + 1));
    };

    const currentPage = pages[currentIndex];

    return (
        <div className="min-h-screen w-full bg-[#FFF1C0] relative pt-[64px]">
            {/* Título e logo no mobile */}
            <div className="flex items-center justify-center md:absolute md:top-[64px] md:left-[282px] md:justify-start">
                <div
                    className="text-[28px] md:text-[60px] font-bold" // Tamanhos responsivos
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                        color: '#2B3722',
                    }}
                >
                    EVENTOS
                </div>
                <img
                    src={currentPage.logo}
                    alt={`${currentPage.title} Logo`}
                    className="ml-[12px] w-[50px] h-[50px] md:hidden"
                />
            </div>

            {/* Div com os botões e o texto */}
            <div
                className="mt-[24px] flex items-center justify-center md:justify-start md:mt-[100px] md:ml-[270px] md:flex-row"
                style={{ gap: '24px' }} // Espaçamento entre os elementos
            >
                {/* Botão esquerdo */}
                <button
                    onClick={handlePrev}
                    className="w-[58px] h-[30px] md:w-[65px] md:h-[34px]" // Tamanhos menores no mobile, maiores no desktop
                    style={{
                        background: currentPage.buttonColor,
                        border: 'none',
                        borderRadius: 36.65,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transform: 'rotate(-90deg)',
                    }}
                    aria-label="Anterior"
                >
                    <img
                        src={setaEsquerdaEvento}
                        alt="Anterior"
                        className="w-[15px] h-[16px] md:w-[24px] md:h-[20px]" // Tamanhos menores no mobile, maiores no desktop
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </button>

                {/* Título central */}
                <span
                    className="font-bold text-[23px] sm:text-[30px] md:text-[40px]" // Tamanhos responsivos
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                        color: currentPage.textColor,
                    }}
                >
                    {currentPage.title}
                </span>

                {/* Botão direito */}
                <button
                    onClick={handleNext}
                    className="w-[58px] h-[30px] md:w-[65px] md:h-[34px]" // Tamanhos menores no mobile, maiores no desktop
                    style={{
                        background: currentPage.buttonColor,
                        border: 'none',
                        borderRadius: 36.65,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transform: 'rotate(-90deg)',
                    }}
                    aria-label="Próximo"
                >
                    <img
                        src={setaDireitaEvento}
                        alt="Próximo"
                        className="w-[15px] h-[16px] md:w-[24px] md:h-[20px]" // Tamanhos menores no mobile, maiores no desktop
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </button>
            </div>

            {/* Descrição do evento */}

           {/* Sinopse CONECOM */}
            {currentPage.title === 'CONECOM' && (
                <>
                <p
                    className="mt-[20px] text-[14px] md:text-[16px]"
                    style={{
                        fontFamily: '"quicksand", sans-serif',
                        fontWeight: '500',
                        color: '#2B3722',
                        width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', // Largura responsiva no mobile
                        height: window.innerWidth >= 768 ? '90px' : '160px', // Altura responsiva
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        marginTop: '25px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : '16px', // Margem esquerda no desktop e mobile
                        marginRight: window.innerWidth >= 768 ? 'auto' : '16px', // Margem direita no mobile
                        textAlign: 'left',
                    }}
                >
                    LOREM IPSUM SCELERISQUE ACCUMSAN ERAT ORCI ALIQUAM ULTRICIES AUCTOR NIBH JUSTO EGET AT NUNC IACULIS SAGITTIS PLACERAT ORNARE NUNC SCELERISQUE NETUS GRAVIDA QUAM MALESUADA EGESTAS AMET PHARETRA HABITASSE EU MAGNA LOBORTIS FRINGILLA DICTUM ENIM ORNARE GRAVIDA RISUS ID GRAVIDA NISI ODIO DUIS ELEIFEND SED SED.
                </p>
                <button
                    className="mt-[16px]" // Margem superior
                    style={{
                        width: '122px',
                        height: '42px',
                        backgroundColor: '#C43934',
                        borderRadius: '6px',
                        fontFamily: '"all-round-gothic", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#FFF1C0',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '40px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : 'auto', // Margem esquerda no desktop, centraliza no mobile
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                        display: 'block', // Garante que o botão seja tratado como bloco
                    }}
                >
                    INSCREVA-SE
                </button>
                </>
            )}

            {/* Sinopse Semana do Design */}
            {currentPage.title === 'SEMANA DO DESIGN' && (
                <>
                <p
                    className="mt-[20px] text-[14px] md:text-[16px]"
                    style={{
                        fontFamily: '"quicksand", sans-serif',
                        fontWeight: '500',
                        color: '#2B3722',
                        width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', // Largura responsiva no mobile
                        height: window.innerWidth >= 768 ? '90px' : '160px', // Altura responsiva
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        marginTop: '25px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : '16px', // Margem esquerda no desktop e mobile
                        marginRight: window.innerWidth >= 768 ? 'auto' : '16px', // Margem direita no mobile
                        textAlign: 'left',
                    }}
                >
                    LOREM IPSUM SCELERISQUE ACCUMSAN ERAT ORCI ALIQUAM ULTRICIES AUCTOR NIBH JUSTO EGET AT NUNC IACULIS SAGITTIS PLACERAT ORNARE NUNC SCELERISQUE NETUS GRAVIDA QUAM MALESUADA EGESTAS AMET PHARETRA HABITASSE EU MAGNA LOBORTIS FRINGILLA DICTUM ENIM ORNARE GRAVIDA RISUS ID GRAVIDA NISI ODIO DUIS ELEIFEND SED SED.
                </p>
                <button
                    className="mt-[16px]" // Margem superior
                    style={{
                        width: '122px',
                        height: '42px',
                        backgroundColor: '#C43934',
                        borderRadius: '6px',
                        fontFamily: '"all-round-gothic", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#FFF1C0',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '40px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : 'auto', // Margem esquerda no desktop, centraliza no mobile
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                        display: 'block', // Garante que o botão seja tratado como bloco
                    }}
                >
                    INSCREVA-SE
                </button>
                </>
            )}

            {/* Sinopse Interprogramas */}
            {currentPage.title === 'INTERPROGRAMAS' && (
                <>
                <p
                    className="mt-[20px] text-[14px] md:text-[16px]"
                    style={{
                        fontFamily: '"quicksand", sans-serif',
                        fontWeight: '500',
                        color: '#2B3722',
                        width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', // Largura responsiva no mobile
                        height: window.innerWidth >= 768 ? '90px' : '160px', // Altura responsiva
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        marginTop: '25px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : '16px', // Margem esquerda no desktop e mobile
                        marginRight: window.innerWidth >= 768 ? 'auto' : '16px', // Margem direita no mobile
                        textAlign: 'left',
                    }}
                >
                    LOREM IPSUM SCELERISQUE ACCUMSAN ERAT ORCI ALIQUAM ULTRICIES AUCTOR NIBH JUSTO EGET AT NUNC IACULIS SAGITTIS PLACERAT ORNARE NUNC SCELERISQUE NETUS GRAVIDA QUAM MALESUADA EGESTAS AMET PHARETRA HABITASSE EU MAGNA LOBORTIS FRINGILLA DICTUM ENIM ORNARE GRAVIDA RISUS ID GRAVIDA NISI ODIO DUIS ELEIFEND SED SED.
                </p>
                <button
                    className="mt-[16px]" // Margem superior
                    style={{
                        width: '122px',
                        height: '42px',
                        backgroundColor: '#C43934',
                        borderRadius: '6px',
                        fontFamily: '"all-round-gothic", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#FFF1C0',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '40px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : 'auto', // Margem esquerda no desktop, centraliza no mobile
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                        display: 'block', // Garante que o botão seja tratado como bloco
                    }}
                >
                    INSCREVA-SE
                </button>
                </>
            )}

            {/* Sinopse Hackaton */}
            {currentPage.title === 'HACKATHON' && (
                <>
                <p
                    className="mt-[20px] text-[14px] md:text-[16px]"
                    style={{
                        fontFamily: '"quicksand", sans-serif',
                        fontWeight: '500',
                        color: '#2B3722',
                        width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', // Largura responsiva no mobile
                        height: window.innerWidth >= 768 ? '90px' : '160px', // Altura responsiva
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        marginTop: '25px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : '16px', // Margem esquerda no desktop e mobile
                        marginRight: window.innerWidth >= 768 ? 'auto' : '16px', // Margem direita no mobile
                        textAlign: 'left',
                    }}
                >
                    LOREM IPSUM SCELERISQUE ACCUMSAN ERAT ORCI ALIQUAM ULTRICIES AUCTOR NIBH JUSTO EGET AT NUNC IACULIS SAGITTIS PLACERAT ORNARE NUNC SCELERISQUE NETUS GRAVIDA QUAM MALESUADA EGESTAS AMET PHARETRA HABITASSE EU MAGNA LOBORTIS FRINGILLA DICTUM ENIM ORNARE GRAVIDA RISUS ID GRAVIDA NISI ODIO DUIS ELEIFEND SED SED.
                </p>
                <button
                    className="mt-[16px]" // Margem superior
                    style={{
                        width: '122px',
                        height: '42px',
                        backgroundColor: '#C43934',
                        borderRadius: '6px',
                        fontFamily: '"all-round-gothic", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#FFF1C0',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '40px',
                        marginLeft: window.innerWidth >= 768 ? '290px' : 'auto', // Margem esquerda no desktop, centraliza no mobile
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                        display: 'block', // Garante que o botão seja tratado como bloco
                    }}
                >
                    INSCREVA-SE
                </button>
                </>
            )}
                            
            {/* "CRONOGRAMA" */}
                <p
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '50px',
                        color: '#2B3722',
                        textAlign: window.innerWidth >= 768 ? 'left' : 'center', // Centraliza no mobile, alinha à esquerda no desktop
                        marginTop: '46px', // Espaçamento abaixo do botão
                        marginLeft: window.innerWidth >= 768 ? '284px' : 'auto', // Alinhamento no desktop
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                    }}
                >
                    CRONOGRAMA
                </p>      




                {/* Horários e atividades */}
                <div
                    style={{
                        marginTop: '32px', // Espaçamento abaixo de "DATA"
                        marginLeft: window.innerWidth >= 768 ? '284px' : 'auto', // Alinhamento no desktop
                        marginRight: window.innerWidth >= 768 ? '0' : 'auto', // Centraliza no mobile
                        display: window.innerWidth >= 768 ? 'flex' : 'block', // Flex no desktop, bloco no mobile
                        gap: window.innerWidth >= 768 ? '32px' : '0', // Espaçamento entre colunas no desktop
                    }}
                >

                {/* Coluna 1: Atividades 1, 2 e 3 */}
                <div
                    style={{
                        marginTop: window.innerWidth >= 768 ? '0' : '32px', // Espaçamento no mobile
                        paddingLeft: window.innerWidth < 768 ? '80px' : '0', // Adiciona padding no mobile
                        paddingRight: window.innerWidth < 768 ? '80px' : '0', // Adiciona padding no mobile
                        textAlign: window.innerWidth < 768 ? 'center' : 'left', // Centraliza no mobile, alinha à esquerda no desktop
                    }}
                >
                    {/* "DATA" alinhado com Atividade 1 no desktop */}
                    <h3
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            color: '#2B3722',
                            marginBottom: '33px', // Espaçamento abaixo de "DATA"
                            marginTop: '0', // Remove margem superior
                        }}
                    >
                        DATA
                    </h3>

                    {currentPage.activities.slice(0, 3).map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start', // Centraliza no mobile, alinha à esquerda no desktop
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            fontFamily: '"all-round-gothic", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: '#2B3722',
                                            marginRight: window.innerWidth < 768 ? '0' : '24px', // Remove margem no mobile
                                        }}
                                    >
                                        {activity.time}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: '"quicksand", sans-serif',
                                            fontSize: '16px',
                                            color: '#2B3722',
                                        }}
                                    >
                                        {activity.title}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width: window.innerWidth >= 768 ? '437px' : '320px', // Ajusta largura no mobile
                                        height: '2px',
                                        backgroundColor: '#2B3722',
                                        marginTop: '8px', // Espaçamento acima da linha
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna 2: Atividades 4, 5 e 6 */}
                <div
                    style={{
                        marginTop: window.innerWidth >= 768 ? '0' : '32px', // Espaçamento no mobile
                        paddingLeft: window.innerWidth < 768 ? '80px' : '0', // Adiciona padding no mobile
                        paddingRight: window.innerWidth < 768 ? '80px' : '0', // Adiciona padding no mobile
                        textAlign: window.innerWidth < 768 ? 'center' : 'left', // Centraliza no mobile, alinha à esquerda no desktop
                    }}
                >
                    {/* "DATA" alinhado com Atividade 4 no desktop */}
                    <h3
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            color: '#2B3722',
                            marginBottom: '33px', // Espaçamento abaixo de "DATA"
                            marginTop: window.innerWidth >= 768 ? '0px' : '32px', // No desktop, sem margem superior; no mobile, espaçamento adicional
                        }}
                    >
                        DATA
                    </h3>

                    {currentPage.activities.slice(3, 6).map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start', // Centraliza no mobile, alinha à esquerda no desktop
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            fontFamily: '"all-round-gothic", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: '#2B3722',
                                            marginRight: window.innerWidth < 768 ? '0' : '24px', // Remove margem no mobile
                                        }}
                                    >
                                        {activity.time}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: '"quicksand", sans-serif',
                                            fontSize: '16px',
                                            color: '#2B3722',
                                        }}
                                    >
                                        {activity.title}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width: window.innerWidth >= 768 ? '437px' : '320px', // Ajusta largura no mobile
                                        height: '2px',
                                        backgroundColor: '#2B3722',
                                        marginTop: '8px', // Espaçamento acima da linha
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
                
            {/* Logos no desktop */}
            <img
                src={currentPage.logo}
                alt={`${currentPage.title} Logo`}
                className="hidden md:block"
                style={{
                    position: 'absolute',
                    top: '196px',
                    right: '-200px',
                    height: 'auto',
                    width: '400px',
                }}
            />
            <img
                src={currentPage.logo}
                alt={`${currentPage.title} Logo`}
                className="hidden md:block"
                style={{
                    position: 'absolute',
                    top: '1190px',
                    left: '-200px',
                    height: 'auto',
                    width: '400px',
                }}
            />

            {/* Conteúdo principal */}
            <main className="mt-[32px] flex flex-col items-center">
                <p
                    className="text-[18px]"
                    style={{
                        fontFamily: '"quicksand", sans-serif',
                        color: '#2B3722',
                        fontWeight: '500',
                        marginTop: 1600,
                    }}
                >
                    {currentPage.description}
                </p>

                
            </main>
        </div>
    );
}
