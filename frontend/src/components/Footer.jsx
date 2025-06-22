import React from 'react';

import LogoCatolica from '../assets/images/logoCatolica.svg';
import logoInstagram from '../assets/images/logoInstagram.svg';

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#2B3722] relative"
      style={{
        minWidth: 0,
        height: '460px',
        maxWidth: 'none',
      }}
    >
      {/* Desktop */}
      <div
        className="hidden md:flex flex-col gap-[36px] absolute"
        style={{
          left: '175px',
          top: '32px',
          color: '#E0E0E0',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>CONTATO</div>
          <div style={{ height: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 400 }}>festivaleconomiacriativa@gmail.com</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>(61) 99960-0058</div>
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>REDES SOCIAIS</div>
          <div style={{ height: '12px' }} />
          {/* Links de redes sociais atualizados */}
          <a href="https://www.instagram.com/festivalecocriativa/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', marginBottom: '16px' }}>
            <img src={logoInstagram} alt="Instagram" style={{ width: '48px', height: '48px' }} />
            <span style={{ fontSize: '16px', fontWeight: 400 }}>@festivalecocriativa</span>
          </a>
          <a href="https://www.instagram.com/comunicacaoucb/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <img src={logoInstagram} alt="Instagram" style={{ width: '48px', height: '48px' }} />
            <span style={{ fontSize: '16px', fontWeight: 400 }}>@comunicacaoucb</span>
          </a>
        </div>
        <div>
          <img
            src={LogoCatolica}
            alt="Logo Católica"
            style={{ width: 'auto', height: '54px', marginTop: '12px' }}
          />
        </div>
      </div>

      {/* Mobile */}
      <div
        className="flex md:hidden flex-col items-start w-full h-[479px] mx-auto relative"
        style={{
          color: '#E0E0E0',
          fontFamily: '"Inter", sans-serif',
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginTop: '94px', marginLeft: '32px' }}>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>CONTATO</div>
          <div style={{ height: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 400 }}>festivaleconomiacriativa@gmail.com</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>(61) 99960-0058</div>
        </div>
        <div style={{ marginTop: '36px', marginLeft: '32px' }}>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>REDES SOCIAIS</div>
          <div style={{ height: '12px' }} />
          {/* Links de redes sociais atualizados */}
          <a href="https://www.instagram.com/festivalecocriativa/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', marginBottom: '16px' }}>
            <img src={logoInstagram} alt="Instagram" style={{ width: '48px', height: '48px' }} />
            <span style={{ fontSize: '16px', fontWeight: 400 }}>@festivalecocriativa</span>
          </a>
          <a href="https://www.instagram.com/comunicacaoucb/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <img src={logoInstagram} alt="Instagram" style={{ width: '48px', height: '48px' }} />
            <span style={{ fontSize: '16px', fontWeight: 400 }}>@comunicacaoucb</span>
          </a>
        </div>
        <img
          src={LogoCatolica}
          alt="Logo Católica"
          style={{
            width: 'auto',
            height: '54px',
            position: 'absolute',
            left: '32px',
            bottom: '32px',
          }}
        />
      </div>

      <style>{`
        @media (max-width: 767px) {
          footer {
            height: 479px !important;
          }
        }
      `}</style>
    </footer>
  );
}