import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'

import setaDireita from '../assets/images/setaDireita.svg'
import setaEsquerda from '../assets/images/setaEsquerda.svg'

export default function ScheduleBoard({ schedule }) {
    return (
        <>
            <div className="hidden lg:flex w-full h-full justify-between">
                {schedule.map(({ date, events }, index) => 
                    <ScheduleColumn key={index} date={date} events={events} index={index} isMobile={false} />
                )}
            </div>
            <div className="block relative lg:hidden w-full h-ful">
                <button id='prev' className='flex absolute z-10 left-[10px] top-0 justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px]'>
                    <img src={setaEsquerda} className='w-[13px] h-[22px]'></img>
                </button>
                <button id='next' className='flex absolute z-10 right-[10px] top-0 justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px]'>
                    <img src={setaDireita} className='w-[13px] h-[22px]'></img>
                </button>

                <Swiper
                    modules={[ Navigation ]}
                    navigation={{
                        prevEl: '#prev',
                        nextEl: '#next'
                    }}
                    slidesPerView={1}
                    className='w-full h-full'
                >
                    {schedule.map(({ date, events }, index) => {
                        return(
                            <SwiperSlide>
                                <ScheduleColumn key={index} date={date} events={events} index={index} isMobile={true} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>        
    )
}

function ScheduleColumn({ date, events, index, isMobile }) {
    const getDayName = (dateStr) => {
        const [day, month] = dateStr.split('/').map(Number)
        const year = new Date().getFullYear()
        return new Date(year, month-1, day)
                .toLocaleDateString('pt-br', {weekday: 'long'})
                .toUpperCase()
    }

    const weekday = getDayName(date)

    return (
        <div 
            style={{
                fontFamily: '"all-round-gothic", sans-serif', 
                borderLeft: index==0  || isMobile ? 'none' : '1px solid rgba(250, 249, 246, 1)'
            }}
            className="px-4 flex-1"
        >
            <div
                className="flex lg:flex-col flex-row justify-center lg:gap-0 gap-3 text-[18px] font-bold lg:mb-3 lg:mt-0 mt-4 mb-10"
            >
                <p>{ date }</p>
                <p>{ weekday }</p>
            </div>
            <div>
                {events.map(({ time, title, local }, index) => 
                    <ScheduleItem key={index} time={time} title={title} local={local} />
                )}
            </div>
        </div>
    )
}

function ScheduleItem({ time, title, local }) {
    return (
        <div className="text-[16px] flex w-full">
            <p className="absolute font-bold">{ time }</p>
            <div className="flex-1 lg:text-end text-center">
                <p className="font-medium">{ title }</p>
                <p className="font-light">&#128205; { local }</p>
            </div>
        </div>
    )
}