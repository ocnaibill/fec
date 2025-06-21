import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoBranca from '../assets/images/logo-branca.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const handleMobileLinkClick = (section) => {
        navigate('/', { state: { scrollTo: section } });
        setIsMobileMenuOpen(false);
    };

    const handleSimpleLinkClick = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="w-full bg-[#2b3722] flex flex-row-reverse lg:flex-row items-center justify-between px-4 lg:px-[175px] h-[62px] lg:h-[100px]">
            
            {/* Logo + Texto (Desktop) */}
            <Link to="/" className="hidden lg:flex items-center cursor-pointer" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700, fontStyle: 'normal' }}>
                <img
                    src={LogoBranca}
                    alt="Logo"
                    className="w-[49px] h-[54px]"
                    style={{ objectFit: 'contain' }}
                />
                <div className="flex flex-col justify-center ml-[14px]">
                    <span className="text-white font-bold text-lg leading-tight">III FESTIVAL DA</span>
                    <span className="text-white font-bold text-lg leading-tight">ECONOMIA CRIATIVA</span>
                </div>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center gap-[20px] ml-[236px] text-[#E0E0E0] font-bold header-font text-lg">
                <Link to="/" className="hover:underline header-font">home</Link>
                <button onClick={() => navigate('/', { state: { scrollTo: 'sobre' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                    sobre
                </button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'programacao' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                    programação
                </button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'convidados' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                    convidados
                </button>
                <Link to="/events" className="hover:underline header-font">inscrição e local</Link>
                <button onClick={() => navigate('/', { state: { scrollTo: 'apoio' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                    apoio
                </button>
                <Link to="/login" className="hover:underline header-font">login</Link>
            </nav>

            {/* Botão para abrir o Menu Mobile */}
          <button className="lg:hidden z-50" onClick={toggleMobileMenu} style={{ background: 'transparent', border: 'none' }}>
                {isMobileMenuOpen ? null : <Menu className="text-white" style={{ width: '36px', height: '33px' }} />}
            </button>
            
            {/* --- MENU MOBILE --- */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#2B3722] lg:hidden p-1 flex flex-col" 
                    style={{ zIndex: 40 }}
                >
                    <div className="flex items-center justify-between h-[62px] flex-shrink-0">
                        <Link to="/" onClick={handleSimpleLinkClick} className="flex items-center">
                        </Link>
                        <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none' }}>
                            <X className="text-[#FFF2C0]" style={{ width: '48px', height: '48px' }} />
                        </button>
                    </div>

                    {/* CORPO DO MENU */}
                    <div className="bg-[#FDF2BF] flex-grow rounded-xl overflow-y-auto mb-[10px]">
                        <nav className="flex flex-col items-end gap-6 py-8 pr-[15px] text-[#2B3722] font-bold text-2xl mobile-nav-links">
                            
                            <Link to="/" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>home</Link>
                            <button onClick={() => handleMobileLinkClick('sobre')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>sobre</button>
                            <button onClick={() => handleMobileLinkClick('programacao')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>programação</button>
                            <button onClick={() => handleMobileLinkClick('convidados')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>convidados</button>
                            <Link to="/events" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>inscrição e local</Link>
                            <button onClick={() => handleMobileLinkClick('apoio')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>apoio</button>
                            <Link to="/login" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>login</Link>

                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}