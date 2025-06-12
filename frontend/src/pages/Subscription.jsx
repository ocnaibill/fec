import React, { useEffect, useState } from 'react';
import fundo from '../assets/images/fundo2_fec.svg';
import LocalIcon from '../assets/images/localIcon.svg';
import DateIcon from '../assets/images/calendarIcon.svg';
import checkIcon from '../assets/images/checkIcon.svg';
import checkSubIcon from '../assets/images/checkSubIcon.svg';
import { resolvePath, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Subscription() {
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const [lectures, setLectures] = useState([])
    const [workshops, setWorkshops] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        let eventId = params.get('event')

        async function fetchEvent() {
            try {
                const response = await axios.get(`http://localhost:8000/api/event/${eventId}/details/`);

                setLectures(response.data.lecture.map((lec, i) => ({...lec, type: 'lecture', dist: i})))
                setWorkshops(response.data.workshop.map((wksp, i) => ({...wksp, type: 'workshop', dist: i+response.data.lecture.length})))
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            }
        }
        fetchEvent();
    }, []);

    const navigate = useNavigate()
    
    const [selectedActivities, setSelectedActivities] = useState([])
    const [selectedActivityType, setActivityType] = useState('PALESTRAS')
    const [subscribeState, setSubscribeState] = useState(0)
    const activities = selectedActivityType === 'PALESTRAS' ? lectures : workshops

    const handleSubmit = async () => {
        const token = localStorage.getItem('authToken')
        setLoading(true)
        try {
            let requests = []
            selectedActivities.forEach((activity => {
                requests.push(axios.post('http://localhost:8000/api/event/subscribe/',
                    {
                        lecture_id: activity.type === 'lecture' ? activity.id : null,
                        workshop_id: activity.type === 'workshop' ? activity.id : null,
                    },
                    {headers: { Authorization: `Token ${token}` }}
                ))
            }))

            const responses = await Promise.all(requests)
            setLoading(false)
            setSubscribeState(2)
            console.log('Inscrição realizado com sucesso!')
        } catch (err) {
            if (err.response) {
                let err_activity_ids = JSON.parse(err.config.data)
                let failedAct = err_activity_ids.lecture_id ? lectures.find(lec => lec.id === err_activity_ids.lecture_id) : workshops.find(wksp => wksp.id === err_activity_ids.workshop_id)
                setError({...err.response.data, failedAct})
            }
            setLoading(false)
            console.error('Erro ao realizar inscrição')
            console.error(err)
            setSubscribeState(2)
        }
    }

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
                <p 
                    className='lg:w-[1090px] w-[360px] text-center text-[40px] leading-12 mb-8 lg:mt-[64px] mt-[62px]'
                >
                    INSCRIÇÃO
                </p>
                <div className='lg:w-[1090px] w-[360px] lg:text-[46px] text-[32px] leading-[38px] mb-8 flex lg:justify-start justify-center gap-8'>
                    <p
                        onClick={() => setActivityType('PALESTRAS')}
                        className={`cursor-pointer ${selectedActivityType == 'PALESTRAS' ? 'underline' : ''}`}
                    >
                        PALESTRAS
                    </p>
                    <p
                        onClick={() => setActivityType('OFICINAS')}
                        className={`cursor-pointer ${selectedActivityType == 'OFICINAS' ? 'underline' : ''}`}
                    >
                        OFICINAS
                    </p>
                </div>
                <div
                    className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg 
                            lg:w-[1090px] w-[360px] min-h-[550px] p-6 mb-[80px]`}
                >
                    {activities.length > 0 ? activities.map((activity, index) => (
                        <div 
                            key={index}
                            onClick={() => selectedActivities.map(act => act.dist).indexOf(activity.dist) !== -1 
                                ? setSelectedActivities(selectedActivities.filter(act => activity.dist !== act.dist)) 
                                : setSelectedActivities([...selectedActivities, activity])
                            }
                            className={'relative w-full rounded-[12px] cursor-pointer'}
                            style={{
                                boxShadow: selectedActivities.map(act => act.dist).indexOf(activity.dist) !== -1 ? '0px 0px 10px 2px #F06F37' : ''
                            }}
                        >
                            <ActivityCard {...activity} />
                            {selectedActivities.indexOf(activity.dist) !== -1 && <img src={checkIcon} className='w-[40px] absolute top-1 right-1'/>}
                        </div>
                    )) : (
                        <div>
                            <p className='text-[#FFF1C0] text-center text-[20px] !font-bold mt-48'>
                                Nenhuma atividade disponível neste evento.
                            </p>
                        </div>
                    )}
                    <button 
                        onClick={() => {
                            return selectedActivities.length > 0 && setSubscribeState(1)
                        }}
                        className='lg:absolute fixed lg:w-[178px] lg:h-[50px] w-[134px] h-[44px] !bg-[#F06F37] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'
                    >
                        CONTINUAR
                    </button>
                    {selectedActivities.length > 0 && (<span 
                        className='lg:absolute fixed w-[28px] h-[28px] rounded-full bg-[#F06F37] lg:bottom-10 bottom-9 right-5 z-10 flex justify-center items-center'
                        style={{
                            color: '#FFF1C0',
                            boxShadow: '0 0 3px 2px #FFF1C0'
                        }}
                    >
                        {selectedActivities.length}
                    </span>)}
                </div>
                
            </>
            )}

            {subscribeState === 1 && (
            <>
            {!loading ? (
                <div
                    className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg 
                            lg:w-[474px] w-[360px] min-h-[550px] p-6 mb-[80px] lg:mt-[150px] mt-[62px]`}
                >
                    <p 
                        className='text-[24px] text-center text-[#FFF1C0] leading-12'
                    >
                        FINALIZAR INSCRIÇÃO
                    </p>
                    <div className='w-full flex flex-col gap-0.5 rounded-[12px] overflow-hidden'>
                        {selectedActivities.map((activity, index) => (
                            <ConfirmActivityCard key={index} {...activity} />
                        ))}

                    </div>
                    <div className='flex-grow'></div>
                    <div className='w-full flex flex-col gap-6'>
                        <button 
                            onClick={() => handleSubmit()}
                            className='w-full h-[44px] !bg-[#F06F37] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'
                        >
                            CONFIRMAR INSCRIÇÃO
                        </button>
                        <button 
                            onClick={() => setSubscribeState(0)}
                            className='w-full h-[44px] !bg-[#2B3722] text-[#FFF1C0] text-[20px] !font-bold !p-0 bottom-4 right-6 z-10'
                        >
                            VOLTAR
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg 
                            lg:w-[474px] w-[360px] min-h-[550px] p-6 mb-[80px] lg:mt-[150px] mt-[62px]`}
                >
                    <p 
                        className='text-[24px] text-center text-[#FFF1C0] leading-12'
                    >
                        CARREGANDO...
                    </p>
                    <span 
                        className='animate-spin w-[100px] h-[100px] rounded-full border-[5px] border-[#FFF1C0] border-l-transparent mt-[130px]'
                    ></span>
                </div>
            )}
            </>
            )} 

            {subscribeState === 2 && (
            <>
            {!error ? (
                <div
                    className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center lg:gap-6 gap-2 relative shadow-lg 
                            lg:w-[603px] w-[360px] min-h-[215px] p-6 lg:mt-[295px] mt-[174px]`}
                >
                    <p 
                        className='w-full text-[24px] lg:text-start text-center text-[#FFF1C0] leading-12 flex lg:justify-start justify-center gap-3'
                    >
                        <img src={checkSubIcon}/>{`INGRESSO${selectedActivities.length > 1 ? 'S' : ''} GARANTIDO${selectedActivities.length > 1 ? 'S' : ''}`}
                    </p>
                    <span>
                        <p className='text-[16px] lg:text-start text-center text-[#FFF1C0] font-light'>
                            Seu ingresso será enviado para o e-mail informado nos próximos minutos.
                        </p>
                        <p className='text-[16px] lg:text-start text-center text-[#FFF1C0] font-light'>
                            Nos vemos no Festival de Economia Criativa!
                        </p>
                    </span>
                    <div className='w-full flex flex-col gap-6'>
                        <button 
                            onClick={() => navigate('/')}
                            className='lg:w-[246px] w-full h-[44px] !bg-[#C43934] text-[#FFF1C0] text-[20px] !font-bold !p-0 z-10'
                        >
                            VOLTAR A PROGRAMAÇÃO
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`bg-[#2B3722] rounded-[12px] flex flex-col items-center gap-6 relative shadow-lg 
                            lg:w-[603px] w-[360px] min-h-[215px] p-6 lg:mt-[295px] mt-[174px]`}
                >  
                    <p 
                        className='w-full text-[24px] lg:text-start text-center text-[#FFF1C0] leading-12 flex lg:justify-start justify-center'
                    >
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
                        <button 
                            onClick={() => setSubscribeState(0)}
                            className='lg:w-[246px] w-full h-[44px] !bg-[#C43934] text-[#FFF1C0] text-[20px] !font-bold !p-0 z-10'
                        >
                            VOLTAR
                        </button>
                    </div>
                </div>
            )}
            </>
            )} 
        </div>
    );
}

function ActivityCard({title, date, time, local}) {
    return (
        <div className='flex flex-col gap-3 w-full h-[135px] bg-[#FFF1C0] rounded-[12px] p-4'>
            <p className='text-[24px]'>{title}</p>
            <div>
                <span className='flex gap-3 text-[16px] font-light'><img src={DateIcon} />{date.slice(5).replace('-', '/')}, {time.slice(0, 5)}</span>
                <span className='flex gap-3 text-[16px] font-light'><img src={LocalIcon} />{local}</span>
            </div>
        </div>
    )
}

function ConfirmActivityCard({title, date, time, local}) {
    return (
        <div className='flex flex-col gap-3 w-full h-[100px] bg-[#FFF1C0] p-4'>
            <div className='flex justify-between'>
                <span className='flex gap-3 text-[16px] font-light'><img src={DateIcon} />{date.slice(5).replace('-', '/')}, {time.slice(0, 5)}</span>
            </div>
            <p className='text-[24px]'>{title}</p>
        </div>
    )
}