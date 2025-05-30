import LogoCatolica from '../assets/images/logoCatolica.svg'

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#2B3722] relative"
      style={{
        minWidth: '100vw',
        height: '405px',
        maxWidth: '1440px',
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
          <div style={{ fontSize: '16px', fontWeight: 400 }}>contato@festival.com</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>(11) 1234-5678</div>
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>REDES SOCIAIS</div>
          <div style={{ height: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 400 }}>Facebook</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>Instagram</div>
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
        className="flex md:hidden flex-col items-start w-[430px] h-[479px] mx-auto relative"
        style={{
          color: '#E0E0E0',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ marginTop: '94px', marginLeft: '32px' }}>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>CONTATO</div>
          <div style={{ height: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 400 }}>contato@festival.com</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>(11) 1234-5678</div>
        </div>
        <div style={{ marginTop: '36px', marginLeft: '32px' }}>
          <div style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '1px' }}>REDES SOCIAIS</div>
          <div style={{ height: '12px' }} />
          <div style={{ fontSize: '16px', fontWeight: 400 }}>Facebook</div>
          <div style={{ fontSize: '16px', fontWeight: 400 }}>Instagram</div>
        </div>
        <img
          src={LogoCatolica}
          alt="Logo Católica"
          style={{
            width: 'auto',
            height: '54px',
            position: 'absolute',
            left: '32px',
            bottom: '94px'
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
  )
}