import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setaEsquerdaEvento from '../assets/images/setaEsquerdaEvento.svg';
import setaDireitaEvento from '../assets/images/setaDireitaEvento.svg';
import logoConecom from '../assets/images/logo_conecom.svg';
import logoHackaton from '../assets/images/logo_hackaton.svg';
import logoInterprogramas from '../assets/images/logo_interprogramas.svg';
import logoSemanaDesign from '../assets/images/logo_semanadesign.svg';
import EventsCard from '../components/EventsCard';

export default function Events() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [pages, setPages] = useState([
        { id: 2, title: 'CONECOM', buttonColor: '#2C53A1', textColor: '#2C53A1', logo: logoConecom, activities: [], lectures: [], workshops: [] },
        { id: 3, title: 'SEMANA DO DESIGN', buttonColor: '#ED5F2E', textColor: '#ED5F2E', logo: logoSemanaDesign, activities: [], lectures: [], workshops: [] },
        { id: 4, title: 'INTERPROGRAMAS', buttonColor: '#C91E1D', textColor: '#C91E1D', logo: logoInterprogramas, activities: [], lectures: [], workshops: [] },
        { id: 5, title: 'HACKATHON', buttonColor: '#8A3B8E', textColor: '#8A3B8E', logo: logoHackaton, activities: [], lectures: [], workshops: [] },
    ]);


    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const updatedPages = await Promise.all(
                    pages.map(async (page) => {
                        const [eventResponse, lecturesResponse, workshopsResponse] = await Promise.all([
                            axios.get(`http://localhost:8000/api/event/${page.id}/`),
                            axios.get(`http://localhost:8000/api/event/${page.id}/lectures/`),
                            axios.get(`http://localhost:8000/api/event/${page.id}/workshops/`), // Adiciona workshopsResponse
                        ]);

                        return { 
                            ...page, 
                            description: eventResponse.data.description,
                            activities: eventResponse.data.activities,
                            lectures: lecturesResponse.data,
                            workshops: workshopsResponse.data, 
                        };
                    })
                );
                setPages(updatedPages);
            } catch (error) {
                console.error('Erro ao carregar detalhes do evento:', error);
            }
        }

        fetchEventDetails();
    }, []);

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


          {/* Sinopses */}
            <p
                className="mt-[20px] text-[14px] md:text-[16px]"
                style={{
                    fontFamily: '"quicksand", sans-serif',
                    fontWeight: '500',
                    color: '#2B3722',
                    width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', // Largura responsiva no mobile
                    height: window.innerWidth >= 768 ? '90px' : '170px', // Altura responsiva
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    marginTop: '25px',
                    marginLeft: window.innerWidth >= 768 ? '290px' : '16px', // Margem esquerda no desktop e mobile
                    marginRight: window.innerWidth >= 768 ? 'auto' : '16px', // Margem direita no mobile
                    textAlign: 'left',
                }}
            >
                {currentPage.description || 'Descrição não disponível.'} {/* Exibe a descrição ou um fallback */}
            </p>
                            
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
                    marginTop: '32px',
                    marginLeft: window.innerWidth >= 768 ? '284px' : '45px',  
                    marginRight: 'auto',
                    maxWidth: window.innerWidth >= 768 ? '700px' : '100%', 
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr', 
                    gridAutoRows: 'auto',
                    gap: '16px', // Espaçamento entre colunas e linhas
                    alignItems: window.innerWidth < 768 ? 'center' : 'flex-start',
                    justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start', 
                }}
            >
                {(() => {
                    const columns = [];
                    for (let i = 0; i < currentPage.activities.length; i += 3) {
                        columns.push(currentPage.activities.slice(i, i + 3));
                    }

                    return columns.map((activities, columnIndex) => (
                        <div
                            key={columnIndex}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start', // Alinha os itens à esquerda
                                width: '100%', // Garante que a coluna ocupe toda a largura disponível
                            }}
                        >
                            {activities.map((activity, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        width: '100%', // Garante que o elemento ocupe toda a largura disponível
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
                                                    marginRight: '24px',
                                                }}
                                            >
                                                {activity.time.slice(0, 5)} {/* Exibe apenas HH:MM */}
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
                                                width: '285px',
                                                height: '2px',
                                                backgroundColor: '#2B3722',
                                                marginTop: '8px',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ));
                })()}
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

            
         {/* Texto "PALESTRAS" */}
            <p
                style={{
                    fontFamily: '"all-round-gothic", sans-serif',
                    fontWeight: 'bold',
                    fontSize: '50px',
                    color: '#2B3722',
                    textAlign: window.innerWidth >= 768 ? 'left' : 'center',
                    marginTop: '148px',
                    marginLeft: window.innerWidth >= 768 ? '284px' : 'auto',
                    marginRight: window.innerWidth >= 768 ? '0' : 'auto',
                    marginBottom: '48px',
                }}
            >
                PALESTRAS
            </p>

            {/* CARDS DE PALESTRAS */}
            {currentPage.lectures.map((lecture, index) => {
                const formattedDate = new Date(lecture.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                });

                const formattedTime = lecture.time.slice(0, 5);

                return (
                    <EventsCard
                        key={index}
                        date={formattedDate} 
                        time={formattedTime} 
                        title={lecture.title}
                        description={lecture.description}
                        speakers={lecture.speakers}
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            marginLeft: window.innerWidth >= 768 ? '284px' : 'auto',
                            marginRight: window.innerWidth >= 768 ? '277px' : 'auto',
                            marginTop: '48px',
                            width: window.innerWidth >= 768 ? 'calc(100% - 561px)' : 'calc(100% - 32px)',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: '"quicksand", sans-serif',
                                fontSize: '18px',
                                color: '#2B3722',
                                textAlign: 'center',
                            }}
                        >
                            {lecture.description}
                        </p>
                    </EventsCard>
                );
            })}

            {/* Texto "OFICINAS */}
            <p
                style={{
                    fontFamily: '"all-round-gothic", sans-serif',
                    fontWeight: 'bold',
                    fontSize: '50px',
                    color: '#2B3722',
                    textAlign: window.innerWidth >= 768 ? 'left' : 'center',
                    marginTop: '100px',
                    marginLeft: window.innerWidth >= 768 ? '284px' : 'auto',
                    marginRight: window.innerWidth >= 768 ? '0' : 'auto',
                    marginBottom: '48px',
                }}
            >
                OFICINAS
            </p>

            {/* Renderizar os Cards de Oficinas */}
            {currentPage.workshops.map((workshop, index) => {
                const formattedDate = new Date(workshop.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                });

                const formattedTime = workshop.time.slice(0, 5);

                return (
                    <EventsCard
                        key={index}
                        date={formattedDate}
                        time={formattedTime}
                        title={workshop.title}
                        description={workshop.description}
                        speakers={workshop.instructors} 
                        isWorkshop={true}
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            marginLeft: window.innerWidth >= 768 ? '284px' : 'auto',
                            marginRight: window.innerWidth >= 768 ? '277px' : 'auto',
                            marginTop: '48px',
                            width: window.innerWidth >= 768 ? 'calc(100% - 561px)' : 'calc(100% - 32px)',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: '"quicksand", sans-serif',
                                fontSize: '18px',
                                color: '#2B3722',
                                textAlign: 'center',
                            }}
                        >
                            {workshop.description}
                        </p>
                    </EventsCard>
                );
            })}
            {/* espaçamento final para respiro do footer */}
            <main className="mt-[32px] flex flex-col items-center">

            </main>
        </div>
    );
}
