import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'

import setaDireita from '../assets/images/setaDireita.svg'
import setaEsquerda from '../assets/images/setaEsquerda.svg'

export default function GuestsCarousel({ guests }) {
  return (
    <>
      {/* Desktop */}
      <div className='lg:flex hidden'>
        <div className='w-[1214px] relative lg:block hidden'>
          <Swiper
            initialSlide={2}
            slidesPerView={4}
            spaceBetween={58}
            allowTouchMove={false}
            loop={true}

            modules={[ Navigation ]}
            navigation={{
              prevEl: '#guest-prev',
              nextEl: '#guest-next'
            }}

            className='w-full h-full overflow-visible'
          >
            {[...guests, ...guests].map(guest => (
              <SwiperSlide className='!w-[260px]'>
                  <GuestCard {...guest} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='w-[1214px] relative lg:mx-[118px] lg:block hidden'>
          <button id='guest-prev' 
            className='z-10 flex absolute top-1/2 translate-x-[-50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
            style={{ left: `calc(100% * 1/2 - 666px)` }}
          >
              <img src={setaEsquerda} className='w-[13px] h-[22px]'></img>
          </button>
          <button id='guest-next' 
            className='z-10 flex absolute top-1/2 translate-x-[50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
            style={{ right: `calc(100% * 1/2 - 666px)` }}
          >
              <img src={setaDireita} className='w-[13px] h-[22px]'></img>
          </button>
          <Swiper
            initialSlide={0}
            slidesPerView={4}
            spaceBetween={58}
            allowTouchMove={false}
            loop={true}

            modules={[ Navigation ]}
            navigation={{
              prevEl: '#guest-prev',
              nextEl: '#guest-next'
            }}

            className='w-full h-full overflow-visible'
          >
            {[...guests, ...guests].map(guest => (
              <SwiperSlide className='!w-[260px]'>
                  <GuestCard {...guest} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='w-[1214px] relative lg:block hidden'>
          <Swiper
            initialSlide={4}
            slidesPerView={4}
            spaceBetween={58}
            allowTouchMove={false}
            loop={true}

            modules={[ Navigation ]}
            navigation={{
              prevEl: '#guest-prev',
              nextEl: '#guest-next'
            }}

            className='w-full h-full overflow-visible'
          >
            {[...guests, ...guests].map(guest => (
              <SwiperSlide className='!w-[260px]'>
                  <GuestCard {...guest} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile */}
      <div className='w-full relative block lg:hidden'>
        <button id='guest-prev' 
          className='z-10 flex absolute top-1/2 translate-x-[-50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
          style={{ left: `calc(100% * 1/2 - 159px)` }}
        >
            <img src={setaEsquerda} className='w-[13px] h-[22px]'></img>
        </button>
        <button id='guest-next' 
          className='z-10 flex absolute top-1/2 translate-x-[50%] translate-y-[-50%] justify-center items-center w-[34px] h-[64px] !bg-[#E0E0E0] !p-0 !rounded-[37px] !border-none'
          style={{ right: `calc(100% * 1/2 - 159px)` }}
        >
            <img src={setaDireita} className='w-[13px] h-[22px]'></img>
        </button>
        <Swiper

          slidesPerView='auto'
          spaceBetween={58}
          centeredSlides={true}
          loop={true}

          modules={[ Navigation ]}
          navigation={{
            prevEl: '#guest-prev',
            nextEl: '#guest-next'
          }}

          className='w-full h-full overflow-visible'
        >
          {[...guests, ...guests].map(guest => (
            <SwiperSlide className='!w-[260px]'>
                <GuestCard {...guest} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

function GuestCard({ avatar, name, description }) {
  return (
    <div className="bg-[#31477C] w-full h-full rounded-[16px] p-8 flex flex-col justify-start items-center gap-3 flex-shrink-0">
      <div className="bg-white rounded-full overflow-hidden border border-gray-300">
        <img src={avatar?.src} alt={avatar?.alt} className="w-24 h-24 object-cover" />
      </div>
      <p className="font-bold text-[18px] text-white">{name}</p>
      <p 
        className="text-[14px] font-medium text-white text-left"
        style={{ fontFamily: 'Quicksand' }}
      >{description}</p>
    </div>
  );
}