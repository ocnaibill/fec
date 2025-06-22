import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import setaDireita from '../assets/images/setaDireita.svg';
import setaEsquerda from '../assets/images/setaEsquerda.svg';


function ScheduleItem({ time, title, local }) {
    return (
        <div className="text-[16px] text-[#e0e0e0] flex items-center gap-x-4 w-full mb-3">
            <p className="font-bold font-all-round-gothic flex-shrink-0">{time.slice(0, 5)}</p>
            <div className="flex flex-col items-start">
                <p className="font-medium font-quicksand text-left">{title}</p>
                {local && <p className="font-light font-quicksand text-sm text-white/70">📍 {local}</p>}
            </div>
        </div>
    );
}

function ScheduleColumn({ date, weekday, events, index, isMobile }) {
    return (
        <div 
            style={{ fontFamily: '"all-round-gothic", sans-serif' }}
            className="h-full flex flex-col relative"
        >
            {/* --- LINHA SEPARADORA ---*/}
            {(index > 0 && !isMobile) && (
                <div className="absolute top-4 bottom-4 left-[-8px] w-px bg-white/30"></div>
            )}

            <div className="flex lg:flex-col flex-row justify-center text-center lg:gap-0 gap-3 text-[18px] font-bold lg:mb-3 lg:mt-0 mt-4 mb-10 text-[#e0e0e0]">
                <p>{date}</p>
                <p>{weekday}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
                {events.length > 0 ? (
                    events.map((event, eventIndex) => 
                        <ScheduleItem key={event.id || eventIndex} time={event.start_time} title={event.title} local={event.local} />
                    )
                ) : (
                    <p className="font-quicksand text-center text-white/70 mt-4">Sem programação até o momento</p>
                )}
            </div>
        </div>
    );
}


export default function ScheduleBoard() {
    const [scheduleData, setScheduleData] = useState([]);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndProcessSchedule = async () => {
            try {
                const festivalWeek = [
                    { date: '23/06', weekday: 'SEGUNDA-FEIRA', dateISO: '2025-06-23', events: [] },
                    { date: '24/06', weekday: 'TERÇA-FEIRA', dateISO: '2025-06-24', events: [] },
                    { date: '25/06', weekday: 'QUARTA-FEIRA', dateISO: '2025-06-25', events: [] },
                    { date: '26/06', weekday: 'QUINTA-FEIRA', dateISO: '2025-06-26', events: [] },
                    { date: '27/06', weekday: 'SEXTA-FEIRA', dateISO: '2025-06-27', events: [] },
                ];

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/list/`);
                const allEvents = response.data;

                let allActivities = [];
                allEvents.forEach(event => {
                    allActivities.push(...event.workshop.map(w => ({ ...w, type: 'Workshop' })));
                    allActivities.push(...event.lecture.map(l => ({ ...l, type: 'Lecture' })));
                });

                allActivities.forEach(activity => {
                    const dayData = festivalWeek.find(day => day.dateISO === activity.date);
                    if (dayData) {
                        dayData.events.push(activity);
                    }
                });

                festivalWeek.forEach(day => {
                    day.events.sort((a, b) => {
                        if (a.start_time < b.start_time) return -1;
                        if (a.start_time > b.start_time) return 1;
                        return a.title.localeCompare(b.title);
                    });
                });
                
                setScheduleData(festivalWeek);

            } catch (error) {
                console.error('Erro ao buscar a programação:', error);
                const emptyWeek = [
                    { date: '23/06', weekday: 'SEGUNDA-FEIRA', events: [] },
                    { date: '24/06', weekday: 'TERÇA-FEIRA', events: [] },
                    { date: '25/06', weekday: 'QUARTA-FEIRA', events: [] },
                    { date: '26/06', weekday: 'QUINTA-FEIRA', events: [] },
                    { date: '27/06', weekday: 'SEXTA-FEIRA', events: [] },
                ];
                setScheduleData(emptyWeek);
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessSchedule();
    }, []);

    if (loading) {
        return <p className="text-white text-center p-8">Carregando programação...</p>;
    }

    return (
        <>
            {/* Layout para Desktop - */}
            <div className="hidden lg:grid lg:grid-cols-5 w-full h-full gap-x-4">
                {scheduleData.map(({ date, weekday, events }, index) => 
                    <ScheduleColumn key={index} date={date} weekday={weekday} events={events} index={index} isMobile={false} />
                )}
            </div>

            {/* Layout para Mobile */}
            <div className="block relative lg:hidden w-full h-full">
                <button id='schedule-prev' className={`flex absolute z-10 left-[20px] top-0 justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none ${
                    activeSlideIndex === 0 ? 'hidden' : ''
                }`}>
                    <img src={setaEsquerda} alt="Anterior" className='w-[13px] h-[22px]' />
                </button>
                
                <button id='schedule-next' className={`flex absolute z-10 right-[20px] top-0 justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none ${activeSlideIndex === scheduleData.length - 1 ? 'hidden' : ''}`}>
                    <img src={setaDireita} alt="Próximo" className='w-[13px] h-[22px]' />
                </button>

                <Swiper
                    modules={[Navigation]}
                    navigation={{ prevEl: '#schedule-prev', nextEl: '#schedule-next' }}
                    slidesPerView={1}
                    onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
                    className='w-full h-full'
                >
                    {scheduleData.map(({ date, weekday, events }, index) => (
                        <SwiperSlide key={index}>
                            <ScheduleColumn date={date} weekday={weekday} events={events} index={index} isMobile={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
