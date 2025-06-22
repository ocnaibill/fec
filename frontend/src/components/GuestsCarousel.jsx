import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import setaDireita from '../assets/images/setaDireita.svg';
import setaEsquerda from '../assets/images/setaEsquerda.svg';
import usuarioSemFoto from '../assets/images/usuarioSemFoto.svg';

function GuestCard({ avatar, name, description }) {
    return (
        <div className="bg-[#31477C] w-full h-full rounded-[16px] p-8 flex flex-col justify-start items-center gap-3 flex-shrink-0">
            <div className="bg-white rounded-full overflow-hidden border border-gray-300 w-24 h-24 flex-shrink-0">
                <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-[18px] text-white text-center font-all-round-gothic flex-shrink-0">{name}</p>
            <p className="text-[14px] font-medium text-white text-left font-quicksand flex-1 overflow-y-auto w-full hide-scrollbar">
                {description}
            </p>
        </div>
    );
}

export default function GuestsCarousel() {
    const [allGuests, setAllGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const apiUrl = `${baseUrl}/event/list/`;
                const response = await axios.get(apiUrl);
                
                const allEvents = response.data;
                const uniqueGuests = new Map();

                allEvents.forEach(event => {
                    [...(event.lecture || []), ...(event.workshop || [])].forEach(activity => {
                        (activity.guests || []).forEach(guest => {
                            if (!uniqueGuests.has(guest.name)) {
                                uniqueGuests.set(guest.name, guest);
                            }
                        });
                    });
                });

                const formattedGuests = Array.from(uniqueGuests.values()).map(guest => {
                    let finalPhotoUrl = usuarioSemFoto;

                    if (guest.photo) {
                        finalPhotoUrl = baseUrl.replace('api', `media/${guest.photo}`);
                    }

                    return {
                        name: guest.name,
                        description: guest.bio,
                        avatar: {
                            src: finalPhotoUrl,
                            alt: `Foto de ${guest.name}`
                        }
                    };
                });

                setAllGuests(formattedGuests);
            } catch (error) {
                console.error("Erro ao buscar os convidados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuests();
    }, []);


    useEffect(() => {
        if (swiperRef.current && allGuests.length > 0) {
            const timer = setTimeout(() => {
                swiperRef.current.update();

                swiperRef.current.loopDestroy();
                swiperRef.current.loopCreate();
            }, 150); 
            
            return () => clearTimeout(timer);
        }
    }, [allGuests]); 

    if (loading) {
        return <div className="text-center p-8">Carregando convidados...</div>;
    }

    if (allGuests.length === 0) {
        return <div className="text-center p-8">Nenhum convidado encontrado.</div>;
    }
    
    return (
        <div className='w-full relative'>
            {/* Estilos para esconder a barra de rolagem */}
            <style>
                {`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                `}
            </style>

            <button id='guest-prev' 
                className='z-10 flex absolute top-1/2 translate-x-[-50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
                style={{ left: `calc(100% * 1/2 - 800px)` }}
            >
                <img src={setaEsquerda} alt="Anterior" className='w-[13px] h-[22px]' />
            </button>
            <button id='guest-next' 
                className='z-10 flex absolute top-1/2 translate-x-[50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
                style={{ right: `calc(100% * 1/2 - 800px)` }}
            >
                <img src={setaDireita} alt="Próximo" className='w-[13px] h-[22px]' />
            </button>

            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                modules={[Navigation]}
                navigation={{ prevEl: '#guest-prev', nextEl: '#guest-next' }}
                slidesPerView={'auto'}
                spaceBetween={40}
                loop={true}
                centeredSlides={true}
                className='w-full h-full !px-[110px] lg:!px-[120px]'
                observer={true}
                observeParents={true}
            >
                {/* Mapeamos sobre o array original, o loop={true} cuida do resto */}
                {allGuests.map((guest, index) => (
                    <SwiperSlide key={index} className='!w-[320px] !h-[440px] py-4'>
                        <GuestCard {...guest} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}