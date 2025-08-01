import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setaEsquerdaEvento from '../assets/images/setaEsquerdaEvento.svg';
import setaDireitaEvento from '../assets/images/setaDireitaEvento.svg';
import AtividadesHoje from '../components/AtividadesHoje';
import EventsCard from '../components/EventsCard';
import { useNavigate } from 'react-router-dom';

export default function Events() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pages, setPages] = useState([]); 
    const [allActivities, setAllActivities] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const response = await axios.get(`${baseUrl}/event/list/`);
                
                const publicBaseUrl = 'https://feconomiacriativa.catolica.edu.br';
                const internalBaseUrl = 'http://172.17.0.110';

                const correctedEvents = response.data.map(event => {
                    let correctedLogoUrl = event.logo; 
                    
                    if (correctedLogoUrl && correctedLogoUrl.startsWith(internalBaseUrl)) {
                        correctedLogoUrl = correctedLogoUrl.replace(internalBaseUrl, publicBaseUrl);
                    }
                    
                    return { ...event, logo: correctedLogoUrl };
                });

                setPages(correctedEvents);
                
                let combinedActivities = [];
                correctedEvents.forEach(event => {
                    const lectures = event.lecture.map(l => ({ ...l, isWorkshop: false }));
                    const workshops = event.workshop.map(w => ({ ...w, isWorkshop: true }));
                    combinedActivities.push(...lectures, ...workshops);
                });

                combinedActivities.sort((a, b) => {
                    const dateComparison = new Date(a.date) - new Date(b.date);
                    if (dateComparison !== 0) return dateComparison;
                    return a.start_time.localeCompare(b.start_time);
                });

                setAllActivities(combinedActivities);

            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        }

        fetchEvents();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? pages.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === pages.length - 1 ? 0 : prevIndex + 1));
    };

    const currentPage = pages[currentIndex] || {}; 

    const lecturesForCurrentPage = allActivities.filter(activity => !activity.isWorkshop && activity.event === currentPage.id);
    const workshopsForCurrentPage = allActivities.filter(activity => activity.isWorkshop && activity.event === currentPage.id);

    const hasLectures = lecturesForCurrentPage.length > 0;
    const hasWorkshops = workshopsForCurrentPage.length > 0;
    const hasAnyActivity = hasLectures || hasWorkshops;
    return (
        <div className="min-h-screen w-full bg-[#FFF1C0] relative pt-[64px]">
            {/* Título e logo */}
            <div className="flex items-center justify-center md:absolute md:top-[64px] md:left-[282px] md:justify-start">
                <div
                    className="text-[28px] md:text-[60px] font-bold"
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                        color: '#2B3722',
                    }}
                >
                    EVENTOS
                </div>
                {currentPage.logo && (
                    <img
                        src={currentPage.logo}
                        alt={`${currentPage.name || 'Evento'} Logo`} 
                        className="ml-[12px] w-[50px] h-[50px] md:hidden" 
                    />
                )}
            </div>

            {/* Div com os botões e o texto */}
            <div
                className="mt-[24px] flex items-center justify-center md:justify-start md:mt-[100px] md:ml-[270px] md:flex-row"
                style={{ gap: '24px' }} 
            >
                {/* Botão esquerdo */}
                <button
                    onClick={handlePrev}
                    className="w-[58px] h-[30px] md:w-[65px] md:h-[34px]" 
                    style={{
                        background: currentPage.eventColor || '#000',
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
                        className="w-[15px] h-[16px] md:w-[24px] md:h-[20px]" 
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </button>

                {/* Título central */}
                <span
                    className="font-bold text-[23px] sm:text-[30px] md:text-[40px]" 
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                        color: currentPage.eventColor || '#000',
                        textTransform: 'uppercase',
                    }}
                >
                    {currentPage.name || 'Carregando...'} 
                </span>

                {/* Botão direito */}
                <button
                    onClick={handleNext}
                    className="w-[58px] h-[30px] md:w-[65px] md:h-[34px]" 
                    style={{
                        background: currentPage.eventColor || '#000',
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
                        className="w-[15px] h-[16px] md:w-[24px] md:h-[20px]" 
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
                    width: window.innerWidth >= 768 ? '906px' : 'calc(100% - 32px)', 
                    height: window.innerWidth >= 768 ? '90px' : '170px', 
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    marginTop: '25px',
                    marginLeft: window.innerWidth >= 768 ? '290px' : '16px', 
                    marginRight: window.innerWidth >= 768 ? 'auto' : '16px', 
                    textAlign: 'left',
                }}
            >
                {currentPage.description || 'Descrição não disponível.'}
            </p>

            <div className='w-full flex md:justify-start md:ml-[290px] justify-center mt-8'>
                <button 
                    onClick={() => {
                        const isAuthenticated = localStorage.getItem('authToken')
                        if (!isAuthenticated) return navigate('/login')
                        return navigate(`/subscription?event=${currentPage.id}`)
                    }}
                    className='w-[120px] h-[42px] !bg-[#C43934] text-[#FFF1C0] text-[18px] !font-bold !p-0 z-10'
                    style={{
                        fontFamily: '"all-round-gothic", sans-serif',
                    }}
                >
                    INSCREVA-SE
                </button>
            </div>
                        
            {/* "CRONOGRAMA" */}
        {/* Logos no desktop */}
        {currentPage.logo && (
            <>
                <img
                    src={currentPage.logo}
                    alt=""
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
                    alt=""
                    className="hidden md:block"
                    style={{
                        position: 'absolute',
                        top: '1190px',
                        left: '-200px',
                        height: 'auto',
                        width: '400px',
                    }}
                />
            </>
        )}
        
{hasAnyActivity && (
    <>
        <p
            style={{
                fontFamily: '"all-round-gothic", sans-serif',
                fontWeight: 'bold',
                fontSize: '50px',
                color: '#2B3722',
                textAlign: window.innerWidth >= 768 ? 'left' : 'center',
                marginTop: '46px',
                marginLeft: window.innerWidth >= 768 ? '284px' : 'auto',
                marginRight: window.innerWidth >= 768 ? '0' : 'auto',
            }}
        >
            CRONOGRAMA
        </p>

        <AtividadesHoje eventId={currentPage.id} />



        {/* Texto "PALESTRAS" */}
        {hasLectures && (
            <>
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
                {lecturesForCurrentPage.map((lecture, index) => {
                    const formattedDate = new Date(
                        lecture.date + 'T00:00:00'
                    ).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                    });
                    const formattedTime = lecture.start_time.slice(0, 5);
                    return (
                        <EventsCard
                            key={index}
                            date={formattedDate}
                            time={formattedTime}
                            title={lecture.title}
                            description={lecture.description}
                            speakers={lecture.guests || []}
                            isWorkshop={false}
                            style={{
                                fontFamily: '"all-round-gothic", sans-serif',
                                marginLeft:
                                    window.innerWidth >= 768
                                        ? '284px'
                                        : 'auto',
                                marginRight:
                                    window.innerWidth >= 768
                                        ? '277px'
                                        : 'auto',
                                marginTop: '48px',
                                width:
                                    window.innerWidth >= 768
                                        ? 'calc(100% - 561px)'
                                        : 'calc(100% - 32px)',
                            }}
                        />
                    );
                })}
            </>
        )}

        {/* Texto "OFICINAS" */}
        {hasWorkshops && (
            <>
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

                {/* CARDS DE OFICINAS */}
                {workshopsForCurrentPage.map((workshop, index) => {
                    const formattedDate = new Date(
                        workshop.date + 'T00:00:00'
                    ).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                    });
                    const formattedTime = workshop.start_time.slice(0, 5);
                    return (
                        <EventsCard
                            key={index}
                            date={formattedDate}
                            time={formattedTime}
                            title={workshop.title}
                            description={workshop.description}
                            speakers={workshop.guests}
                            isWorkshop={true}
                            style={{
                                fontFamily: '"all-round-gothic", sans-serif',
                                marginLeft:
                                    window.innerWidth >= 768
                                        ? '284px'
                                        : 'auto',
                                marginRight:
                                    window.innerWidth >= 768
                                        ? '277px'
                                        : 'auto',
                                marginTop: '48px',
                                width:
                                    window.innerWidth >= 768
                                        ? 'calc(100% - 561px)'
                                        : 'calc(100% - 32px)',
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
            </>
        )}
    </>
)}
           {/* espaçamento final para respiro do footer */}
            <main className="mt-[32px] flex flex-col items-center"></main>
        </div>
    );
}