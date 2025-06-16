import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AtividadesHoje({ eventId }) {
    const [activitiesToday, setActivitiesToday] = useState([]);

    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await axios.get('http://localhost:8000/api/event/list/');
                const allEvents = response.data;

                const today = new Date().toISOString().split('T')[0];

                const currentEvent = allEvents.find(event => event.id === eventId);
                if (!currentEvent) {
                    setActivitiesToday([]);
                    return;
                }

                const allActivities = [
                    ...currentEvent.workshop.map(workshop => ({
                        id: workshop.id,
                        title: workshop.title,
                        date: workshop.date,
                        time: workshop.time,
                        type: 'Workshop',
                        eventName: currentEvent.name,
                    })),
                    ...currentEvent.lecture.map(lecture => ({
                        id: lecture.id,
                        title: lecture.title,
                        date: lecture.date,
                        time: lecture.time,
                        type: 'Lecture',
                        eventName: currentEvent.name,
                    })),
                ];

                const filteredActivities = allActivities.filter(activity => activity.date === today);

                setActivitiesToday(filteredActivities);
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            }
        }

        fetchActivities();
    }, [eventId]);

    return (
        <div
            style={{
                marginTop: '32px',
                marginLeft: window.innerWidth >= 768 ? '284px' : '45px',
                marginRight: 'auto',
                maxWidth: window.innerWidth >= 768 ? '700px' : '100%',
                display: 'grid',
                gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
                gridAutoRows: 'auto',
                gap: '16px',
                alignItems: window.innerWidth < 768 ? 'center' : 'flex-start',
                justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
            }}
        >
            {activitiesToday.length > 0 ? (
                (() => {
                    const columns = [];
                    for (let i = 0; i < activitiesToday.length; i += 3) {
                        columns.push(activitiesToday.slice(i, i + 3));
                    }

                    return columns.map((activities, columnIndex) => (
                        <div
                            key={columnIndex}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: '100%',
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
                                        width: '100%',
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
                                                {activity.time.slice(0, 5)}
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
                })()
            ) : (
                <p className="text-[16px] text-[#555]">Nenhuma atividade para hoje.</p>
            )}
        </div>
    );
}