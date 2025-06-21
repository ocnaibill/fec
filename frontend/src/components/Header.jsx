import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LogoBranca from '../assets/images/logo-branca.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, [location]); 

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileLinkClick = (section) => {
        navigate('/', { state: { scrollTo: section } });
        setIsMobileMenuOpen(false);
    };

    const handleSimpleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setIsMobileMenuOpen(false);
        toast(`Logout realizado com sucesso!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
                backgroundColor: '#5E4497',
                color: '#FFF6D7',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: '500',
                fontSize: '16px',
                borderRadius: '8px',
                width: '451px',
                height: '60px',
            },
        });
        navigate('/');
    };

    return (
        <header className="w-full bg-[#2b3722] flex flex-row-reverse lg:flex-row items-center justify-between px-4 lg:px-[175px] h-[62px] lg:h-[100px]">
            
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
                <button onClick={() => navigate('/', { state: { scrollTo: 'sobre' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>sobre</button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'programacao' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>programação</button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'convidados' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>convidados</button>
                <Link to="/events" className="hover:underline header-font">inscrição e local</Link>
                <button onClick={() => navigate('/', { state: { scrollTo: 'apoio' } })} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>apoio</button>
                
                {isAuthenticated ? (
                    <>
                        <Link to="/account" className="hover:underline header-font">perfil</Link>
                        <button onClick={handleLogout} className="hover:underline header-font" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>logout</button>
                    </>
                ) : (
                    <Link to="/login" className="hover:underline header-font">login</Link>
                )}
            </nav>

            <button className="lg:hidden z-50" onClick={toggleMobileMenu} style={{ background: 'transparent', border: 'none' }}>
                {isMobileMenuOpen ? null : <Menu className="text-[#FDF2BF]" style={{ width: '36px', height: '33px' }} />}
            </button>
            
            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-[#2B3722] lg:hidden p-1 flex flex-col" style={{ zIndex: 40 }}>
                    <div className="flex items-center justify-between h-[62px] flex-shrink-0">
                        <Link to="/" onClick={handleSimpleLinkClick} className="flex items-center"></Link>
                        <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none' }}>
                            <X className="text-[#FFF2C0]" style={{ width: '48px', height: '48px' }} />
                        </button>
                    </div>

                    <div className="bg-[#FDF2BF] flex-grow rounded-xl overflow-y-auto mb-[10px]">
                        <nav className="flex flex-col items-end gap-6 py-8 pr-[15px] text-[#2B3722] font-bold text-2xl mobile-nav-links">
                            <Link to="/" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>home</Link>
                            <button onClick={() => handleMobileLinkClick('sobre')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>sobre</button>
                            <button onClick={() => handleMobileLinkClick('programacao')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>programação</button>
                            <button onClick={() => handleMobileLinkClick('convidados')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>convidados</button>
                            <Link to="/events" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>inscrição e local</Link>
                            <button onClick={() => handleMobileLinkClick('apoio')} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>apoio</button>
                            
                            {isAuthenticated ? (
                                <>
                                    <Link to="/account" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>perfil</Link>
                                    <button onClick={handleLogout} className="hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>logout</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={handleSimpleLinkClick} className="hover:underline" style={{paddingRight: '30px'}}>login</Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}