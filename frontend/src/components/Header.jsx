import React from 'react';
import { Menu } from 'lucide-react';
import LogoBranca from '../assets/images/logo-branca.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#2b3722] flex flex-row-reverse lg:flex-row items-center justify-between px-4 lg:px-[175px] h-[62px] lg:h-[100px]">
      
      {/* Logo + Texto */}
      <Link to="/" className="hidden lg:flex items-center cursor-pointer" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700, fontStyle: 'normal' }}>
        <img
          src={LogoBranca}
          alt="Logo"
          className="w-[49px] h-[54px]"
          style={{ objectFit: 'contain' }}
        />
        <div className="flex flex-col justify-center ml-[14px]">
          <span className="text-white font-bold text-lg leading-tight" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700, fontStyle: 'normal' }}>III FESTIVAL DA</span>
          <span className="text-white font-bold text-lg leading-tight" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700, fontStyle: 'normal' }}>ECONOMIA CRIATIVA</span>
        </div>
      </Link>

     {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-[20px] ml-[236px] text-[#E0E0E0] font-bold header-font text-lg">
          <Link to="/" className="hover:underline header-font">home</Link>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'sobre' } })}
            className="hover:underline header-font"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            sobre
          </button>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'programacao' } })}
            className="hover:underline header-font"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            programação
          </button>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'convidados' } })}
            className="hover:underline header-font"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            convidados
          </button>
          <Link to="/events" className="hover:underline header-font">inscrição e local</Link>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'apoio' } })}
            className="hover:underline header-font"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            apoio
          </button>
        </nav>

      {/* Menu Mobile */}
      <button
        className="lg:hidden"
        style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
      >
        <Menu className="text-white" style={{ width: '36px', height: '33px', marginRight: '14px' }} />
      </button>
    </header>
  );
}