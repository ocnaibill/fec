import React, { useState, useEffect } from 'react';
import axios from 'axios';

// O subcomponente ActivityItem não é mais necessário, pois a lógica de layout
// será controlada pelo CSS Grid no componente principal.

export default function AtividadesHoje({ eventId }) {
    const [groupedActivities, setGroupedActivities] = useState({});
    const [sortedDates, setSortedDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAndProcessActivities() {
            if (!eventId) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/list/`);
                const currentEvent = response.data.find(event => event.id === eventId);

                if (!currentEvent) {
                    setGroupedActivities({});
                    setSortedDates([]);
                    setLoading(false);
                    return;
                }

                const allActivities = [
                    ...currentEvent.workshop.map(w => ({ ...w, type: 'Workshop' })),
                    ...currentEvent.lecture.map(l => ({ ...l, type: 'Lecture' })),
                ];

                const groups = allActivities.reduce((acc, activity) => {
                    const date = activity.date;
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(activity);
                    // Ordena as atividades dentro de cada dia pelo horário
                    acc[date].sort((a, b) => a.start_time.localeCompare(b.start_time));
                    return acc;
                }, {});
                
                setGroupedActivities(groups);

                const dates = Object.keys(groups).sort((a, b) => new Date(a) - new Date(b));
                setSortedDates(dates);

            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAndProcessActivities();
    }, [eventId]);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}`;
    };

    if (loading) {
        return <p className="text-center mt-8">Carregando programação...</p>;
    }
    
    if (sortedDates.length === 0) {
        return <p className="text-center mt-8">Nenhuma atividade programada para este evento.</p>;
    }

    return (
        // Container principal que define o layout das colunas de datas
        <div className="w-full max-w-[398px] mx-auto mt-8 
                       md:w-auto md:max-w-none md:mx-0 md:ml-[284px]
                       grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[40px]">
            
            {sortedDates.map(date => (
                <div key={date} className="flex flex-col items-start w-full">
                    {/* Título da Coluna (Data) */}
                    <h2 className="font-all-round-gothic font-bold text-2xl text-[#2B3722] mb-4">
                        {formatDate(date)}
                    </h2>
                    
                    {/* --- CORREÇÃO APLICADA AQUI --- 
                      A classe 'w-full' foi removida. Agora o grid se ajusta ao seu conteúdo.
                    */}
                    <div className="grid grid-cols-[max-content_1fr] gap-x-2 items-center">
                        {groupedActivities[date].map(activity => (
                            <React.Fragment key={activity.id}>
                                {/* Linha 1, Coluna 1: O Horário */}
                                <span className="font-all-round-gothic font-bold text-base text-[#2B3722] whitespace-nowrap">
                                    {activity.start_time.slice(0, 5)}
                                </span>
                                
                                {/* Linha 1, Coluna 2: O Título */}
                                <span className="font-quicksand text-base text-[#2B3722] text-left">
                                    {activity.title}
                                </span>

                                {/* Linha 2, ocupando as 2 colunas: A Linha Separadora */}
                                {/* A linha agora terá a largura do grid ajustado ao conteúdo. */}
                                <div className="col-span-2 h-[2px] bg-[#2B3722] my-2"></div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
