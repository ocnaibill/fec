import React, { useEffect, useState } from 'react';
import fundo from '../assets/images/fundo2_fec.svg';
import LocalIcon from '../assets/images/localIcon.svg';
import DateIcon from '../assets/images/calendarIcon.svg';
import checkIcon from '../assets/images/checkIcon.svg';
import checkSubIcon from '../assets/images/checkSubIcon.svg';
import conflictIcon from '../assets/images/conflictIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Subscription() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const isAuthenticated = localStorage.getItem('authToken');
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    const [lectures, setLectures] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [subsActivities, setSubsActivities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeConflict, setActiveConflict] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedActivityType, setActivityType] = useState('PALESTRAS');
    const [subscribeState, setSubscribeState] = useState(0);

    const activities = selectedActivityType === 'PALESTRAS' ? lectures : workshops;
    
    useEffect(() => {
        let eventId = params.get('event');

        async function fetchEvent() {
            try {
                const response = await axios.get(`${baseUrl}/event/${eventId}/details/`);
                setLectures(response.data.lecture);
                setWorkshops(response.data.workshop);
            } catch (error) {
                console.error('Erro ao buscar detalhes do evento:', error);
            }
        }

        async function fetchUserSubscription() {
            try {
                const response = await axios.get(`${baseUrl}/event/mysubs`, { 
                    headers: {
                        Authorization: `Token ${isAuthenticated}`
                    }
                });
                setSubsActivities(response.data.map(sub => sub.activity));
            } catch (error) {
                console.error('Erro ao buscar inscrições do usuário:', error);
            }
        }
        
        fetchEvent();
        if (isAuthenticated) {
            fetchUserSubscription();
        }
    }, [isAuthenticated]); 

    const handleSubmit = async () => {
        const token = localStorage.getItem('authToken');
        setLoading(true);
        try {
            let requests = [];
            selectedActivities.forEach((activity => {
                requests.push(axios.post(`${baseUrl}/event/subscribe/`,
                    {
                        activity_id: activity.id,
                    },
                    { headers: { Authorization: `Token ${token}` } }
                ));
            }));

            const responses = await Promise.all(requests);
            setLoading(false);
            setSubscribeState(2);
            console.log('Inscrição realizada com sucesso!');
        } catch (err) {
            if (err.response) {
                if(err.response.status === 401) return navigate('/login');
                
                let err_activity_ids = JSON.parse(err.config.data);
                let failedAct = err_activity_ids.lecture_id ? lectures.find(lec => lec.id === err_activity_ids.lecture_id) : workshops.find(wksp => wksp.id === err_activity_ids.workshop_id);
                setError({ ...err.response.data, failedAct });
            }
            setLoading(false);
            console.error('Erro ao realizar inscrição', err);
            setSubscribeState(2);
        }
    };
    
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-start font-bold"
            style={{
                backgroundImage: `url(${fundo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: '"all-round-gothic", sans-serif',
                color: '#2B3722',
            }}
        >
            {subscribeState === 0 && (
            <>
                <p className='lg:w-[1090px] w-[360px] text-center text-[40px] leading-12 mb-8 lg:mt-[64px] mt-[62px]'>
                    INSCRIÇÃO
                </p>
                <div className='lg:w-[1090px] w-[360px] lg:text-[46px] text-[32px] leading-[38px] mb-8 flex lg:justify-start justify-center gap-8'>
                    <p onClick={() => setActivityType('PALESTRAS')} className={`cursor-pointer ${selectedActivityType === 'PALESTRAS' ? 'underline' : ''}`}>
                        PALESTRAS
                    </p>
                    <p onClick={() => setActivityType('OFICINAS')} className={`cursor-pointer ${selectedActivityType === 'OFICINAS' ? 'underline' : ''}`}>
                        OFICINAS
                    </p>
                </div>
                <div className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg lg:w-[1090px] w-[360px] min-h-[550px] p-6 mb-[80px]`}>
                    {activities.length > 0 ? activities.map((activity, index) => {
                        const subscribed = subsActivities.some(a => a.id === activity.id);
                        const isSelected = selectedActivities.some(act => act.id === activity.id);

                        return (<div 
                            key={index}
                            onClick={() => {
                                if (subscribed) return;
                                if (isSelected) {
                                    setSelectedActivities(selectedActivities.filter(act => activity.id !== act.id));
                                } else {
                                    setSelectedActivities([...selectedActivities, activity]);
                                }
                            }}
                            className={`relative w-full rounded-[12px] ${subscribed ? '' : 'cursor-pointer'}`}
                            style={{
                                boxShadow: isSelected ? '0px 0px 10px 2px #F06F37' : ''
                            }}
                        >
                            <ActivityCard {...activity} isSubscribed={subscribed} />
                            {isSelected && <img src={checkIcon} className='w-[40px] absolute top-1 right-1' alt="Selected"/>}
                        </div>)
                    }) : (
                        <div>
                            <p className='text-[#FFF1C0] text-center text-[20px] !font-bold mt-48'>
                                Nenhuma atividade disponível neste evento.
                            </p>
                        </div>
                    )}
                    <button onClick={() => { if (!isAuthenticated) return navigate('/login'); if (selectedActivities.length > 0) setSubscribeState(1);}} className='lg:absolute fixed lg:w-[178px] lg:h-[50px] w-[134px] h-[44px] !bg-[#F06F37] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'>
                        CONTINUAR
                    </button>
                    {selectedActivities.length > 0 && (<span className='lg:absolute fixed w-[28px] h-[28px] rounded-full bg-[#F06F37] lg:bottom-10 bottom-9 right-5 z-10 flex justify-center items-center' style={{ color: '#FFF1C0', boxShadow: '0 0 3px 2px #FFF1C0' }}>
                        {selectedActivities.length}
                    </span>)}
                </div>
            </>
            )}

            {subscribeState === 1 && (
            <>
            {!loading ? (
                <div className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg lg:w-[474px] w-[360px] min-h-[550px] p-6 mb-[80px] lg:mt-[150px] mt-[62px]`}>
                    <p className='text-[24px] text-center text-[#fff1c0] leading-12'>
                        FINALIZAR INSCRIÇÃO
                    </p>
                    <div className='w-full flex flex-col gap-0.5 rounded-[12px] overflow-hidden'>
                        {selectedActivities.map((activity, index) => {
                            const hasConflict = subsActivities.filter(sub => sub.date === activity.date && sub.start_time === activity.start_time);
                            return <ConfirmActivityCard key={index} {...activity} hasConflict={hasConflict} setConflict={setActiveConflict}/>
                        })}
                    </div>
                    <div className='flex-grow'></div>
                    <div className='w-full flex flex-col gap-6'>
                        <button onClick={handleSubmit} className='w-full h-[44px] !bg-[#F06F37] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'>
                            CONFIRMAR INSCRIÇÃO
                        </button>
                        <button onClick={() => setSubscribeState(0)} className='w-full h-[44px] !bg-[#2B3722] text-[#FFF1C0] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'>
                            VOLTAR
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg lg:w-[474px] w-[360px] min-h-[550px] p-6 mb-[80px] lg:mt-[150px] mt-[62px]`}>
                    <p className='text-[24px] text-center text-[#FFF1C0] leading-12'>
                        CARREGANDO...
                    </p>
                    <span className='animate-spin w-[100px] h-[100px] rounded-full border-[5px] border-[#FFF1C0] border-l-transparent mt-[130px]'></span>
                </div>
            )}
            </>
            )} 

            {subscribeState === 2 && (
            <>
            {!error ? (
                <div className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center lg:gap-6 gap-2 relative shadow-lg lg:w-[603px] w-[360px] min-h-[215px] p-6 lg:mt-[295px] mt-[174px]`}>
                    <p className='w-full text-[24px] lg:text-start text-center text-[#FFF1C0] leading-12 flex lg:justify-start justify-center gap-3'>
                        <img src={checkSubIcon} alt="Check"/>{`INGRESSO${selectedActivities.length > 1 ? 'S' : ''} GARANTIDO${selectedActivities.length > 1 ? 'S' : ''}`}
                    </p>
                    <span>
                        <p className='text-[16px] lg:text-start text-center text-[#FFF1C0] font-light'>
                            Seu ingresso será enviado para sua aba de perfil aqui no site do festival.
                        </p>
                        <p className='text-[16px] lg:text-start text-center text-[#FFF1C0] font-light'>
                            Nos vemos no Festival da Economia Criativa!
                        </p>
                    </span>
                    <div className='w-full flex flex-col gap-6'>
                        <button onClick={() => navigate('/')} className='lg:w-[246px] w-full h-[44px] !bg-[#C43934] text-[#FFF1C0] text-[20px] !font-bold !p-0 z-10'>
                            VOLTAR A PROGRAMAÇÃO
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg lg:w-[603px] w-[360px] min-h-[215px] p-6 lg:mt-[295px] mt-[174px]`}>
                    <p className='w-full text-[24px] lg:text-start text-center text-[#FFF1C0] leading-12 flex lg:justify-start justify-center'>
                        INSCRIÇÃO NÃO CONCLUIDA!
                    </p>
                    <span className='w-full flex flex-col gap-2'>
                        <p className='text-[20px] lg:text-start flex flex-col text-[#FFF1C0] font-light'>
                            <strong className='font-bold'>Atividade: </strong>{error.failedAct.title}
                        </p>
                        <p className='text-[20px] lg:text-start text-[#C43934] font-light'>
                            {error.non_field_errors[0]}
                        </p>
                    </span>
                    <div className='w-full flex items-center flex-col gap-6'>
                        <button onClick={() => setSubscribeState(0)} className='lg:w-[246px] w-full h-[44px] !bg-[#C43934] text-[#FFF1C0] text-[20px] !font-bold !p-0 z-10'>
                            VOLTAR
                        </button>
                    </div>
                </div>
            )}
            </>
            )} 

            {activeConflict && (<div className='fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,0.30)] z-20 flex justify-center items-start' onClick={() => setActiveConflict(null)}>
                <div className='w-[340px] min-h-[360px] bg-[#FFF1C0] mt-12 p-2 rounded-[20px] flex flex-col items-center'>
                    <p className='text-[24px]'>HORARIOS CONFLITANTES</p>
                    <div className='w-full flex-grow'>
                        <p className='w-full mt-5'>A atividade:</p>
                        <span className='flex w-full justify-between bg-[#e2d4a0] p-2 rounded-[10px]'>
                            <p>{activeConflict.selected.title}</p>
                            <p>{activeConflict.selected.date} - {activeConflict.selected.start_time}</p>
                        </span>
                        <p className='w-full mt-5'>Possui conflito de horário com:</p>
                        {activeConflict.conflicts.map((conflict, index) => (
                            <span key={index} className='flex w-full justify-between bg-[#e2d4a0] p-2 rounded-[10px]'>
                                <p>{conflict.title}</p>
                                <p>{conflict.date} - {conflict.start_time}</p>
                            </span>
                        ))}
                        <p className='w-full mt-5 text-center'>Somente uma das atividades poderá ser credenciado posteriormente.</p>
                        <div className=''></div>
                    </div>
                    <button onClick={() => setActiveConflict(null)} className='w-full h-[44px] !bg-[#2B3722] text-[#FFF1C0] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'>
                        FECHAR
                    </button>
                </div>
            </div>)}
        </div>
    );
}

function ActivityCard({title, date, start_time, local, isSubscribed}) {
    return (
        <div className={`flex flex-col gap-3 w-full h-[135px] rounded-[12px] p-4 ${isSubscribed ? 'bg-[#cabd8e]' : 'bg-[#FFF1C0]'}`}>
            <p className='text-[24px]'>{title}</p>
            <div>
                <span className='flex gap-3 text-[16px] font-light'><img src={DateIcon} alt="Date"/>{new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}, {start_time.slice(0, 5)}</span>
                <span className='flex gap-3 text-[16px] font-light'><img src={LocalIcon} alt="Local"/>{local}</span>
            </div>
            {isSubscribed && <span className='absolute lg:top-2 lg:bottom-0 bottom-2 right-2 lg:text-4xl text-3xl rounded-[8px] p-1' >INSCRITO</span>}
        </div>
    )
}

function ConfirmActivityCard({title, date, start_time, hasConflict, setConflict}) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const formattedTime = start_time.slice(0, 5);
    
    const conflictObj = {
        selected: {
            title,
            date: formattedDate,
            start_time: formattedTime
        },
        conflicts: hasConflict.map(c => ({...c, date: new Date(c.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }), start_time: c.start_time.slice(0, 5)}))
    }

    return (
        <div className='relative flex flex-col gap-3 w-full h-[100px] bg-[#FFF1C0] p-4'>
            <div className='flex justify-between'>
                <span className='flex gap-3 text-[16px] font-light'><img src={DateIcon} alt="Date"/>{formattedDate}, {formattedTime}</span>
            </div>
            <p className='text-[24px]'>{title}</p>
            {hasConflict.length > 0 && (<>
                <div className='absolute top-0 right-0 h-[100px] w-5 bg-[#EAC452]'></div>
                <img src={conflictIcon} className='absolute right-6 top-1 cursor-pointer' onClick={() => setConflict(conflictObj)} alt="Conflict"/>
            </>)}
        </div>
    )
}