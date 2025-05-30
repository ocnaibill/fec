import HomeBg from '../assets/images/Home.svg'
import LogosMobile from '../assets/images/LogosMobile.svg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div
      className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center home-bg text-center"
      style={{
        paddingTop: '60px',
      }}
    >
      <img
        src={LogosMobile}
        alt="Logos Mobile"
        className="mb-[36px] lg:hidden"
        style={{ width: 'auto', maxWidth: '90vw', height: 'auto' }}
      />

      <p
        className="text-3xl font-title text-[#333333] drop-shadow-lg"
        style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight:700 }}
      >
        III FESTIVAL DA
      </p>
{/* Para mobile */}
<h1
  className="font-body text-[#333333] drop-shadow block lg:hidden text-sm"
  style={{
    fontFamily: '"all-round-gothic", sans-serif',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    fontSize: '2.10rem'
  }}
>
  ECONOMIA CRIATIVA
</h1>

{/* Para desktop */}
<h1
  className="font-body text-[#333333] drop-shadow hidden lg:block"
  style={{
    fontFamily: '"all-round-gothic", sans-serif',
    fontWeight: 700
  }}
>
  ECONOMIA CRIATIVA
</h1>

      <span
        className="mt-[36px] text-[18px] text-[#333333]"
        style={{
          fontFamily: '"Quicksand", sans-serif',
          fontWeight: '500',
        }}
      >
         23 a 27 de junho, Universidade Católica de Brasília (Câmpus Taguatinga)
      </span>

      <Link
      to="/programacao"
        className="mt-[36px]"
        style={{
          backgroundColor: '#C43934',
          width: '174px',
          height: '42px',
          borderRadius: '12px',
          color: '#E0E0E0',
          fontWeight: 600,
          fontFamily: '"all-round-gothic", sans-serif',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        VER PROGRAMAÇÃO
      </Link>


      <style>{`
        .home-bg {
          background: radial-gradient(ellipse at center, #FFFFFF 0%, #FFF1BF 100%);
        }
        @media (min-width: 1024px) {
          .home-bg {
            background-image: url(${HomeBg});
            background-size: cover;
            background-position: center 0px; /* move o fundo para baixo */
            background-repeat: no-repeat;
          }
        }
      `}</style>

    </div>
  )
}