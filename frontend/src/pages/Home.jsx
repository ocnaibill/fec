import HomeBg from '../assets/images/Home.svg'
import LogosMobile from '../assets/images/LogosMobile.svg'
import IconeLocal from '../assets/images/icone-local.svg'
import logoCajui from '../assets/images/logoCajui.svg'
import logoOlfato from '../assets/images/logoOlfato.svg'
import logoMatriz from '../assets/images/logoMatriz.svg'
import logoFap from '../assets/images/logoFapDF.svg'
import logoCatolicaDark from '../assets/images/logoCatolicaDark.svg'
import IconeProgramacao from '../assets/images/icone-programacao.svg'
import AboutCarousel from "../components/AboutCarousel";
import ScheduleBoard from '../components/ScheduleBoard'
import GuestsCarousel from '../components/GuestsCarousel'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, {useEffect} from 'react';




export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, navigate]);


   const aboutImages = [
    logoCajui,
    logoOlfato,
    logoMatriz,
  ];

  return (
    <div className="flex flex-col items-center lg:bg-[#FAF9F6] radial-gradient(ellipse_at_center,_#FFFFFF_0%,_#FFF1BF_100%)" style={{
      minHeight: '100vh',
      width: '100%',
    }}>

       {/* HERO */}
        <div
          className="w-full flex justify-center bg-no-repeat bg-cover bg-center home-bg text-center min-h-screen"
        >
          <div
            className="flex flex-col items-center justify-center mx-auto flex-1"
            style={{
              maxWidth: '1440px',
              width: '100%',
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
              23 a 27 de junho, Universidade Católica de Brasília<br />
              <span style={{ whiteSpace: 'nowrap' }}>(Câmpus Taguatinga)</span>
            </span>

            <button
              onClick={() => {
                const section = document.getElementById('programacao');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
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
                cursor: 'pointer',
              }}
            >
              VER PROGRAMAÇÃO
            </button>
          </div>
        </div>  

       {/* CARROSSEL E SOBRE O FESTIVAL DESKTOP */}
      <div
        className="hidden lg:flex"
        style={{
          width: "100%",
          marginTop: 164,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: 600,
          background: "#FAF9F6",
          marginBottom: 142
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 453,
            maxWidth: 1150,
            width: "100%",
            margin: "0 auto"
          }}
        >
          {/* Carrossel */}
          <div
            style={{
              marginTop: 30,
              width: 680,
              height: 500,
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AboutCarousel images={aboutImages}/>
          </div>
          {/* Sobre o Festival */}
          <div
            id="sobre"
            style={{
              marginLeft: 60,
              width: 398,
              minWidth: 398,
              maxWidth: 398,
              height: 453,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h1
              style={{
                fontFamily: '"all-round-gothic", sans-serif',
                color: "#2B3722",
                fontWeight: 700,
                fontSize: "2.1rem",
                letterSpacing: "1px",
                margin: 0,
                width: 398,
                maxWidth: 398,
                height: 55,
                lineHeight: "55px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              SOBRE O FESTIVAL
            </h1>
            <p
              style={{
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 500,
                color: "#2B3722",
                fontSize: "1rem",
                margin: 0,
                marginTop: 30,
                width: 398,
                maxWidth: 398,
                lineHeight: "1.5",
                textOverflow: "ellipsis"
              }}
            >
              Mais do que um evento, o festival é um ponto de encontro. Realizado na Universidade Católica de Brasília, é um lugar onde o saber acadêmico dialoga com a prática, onde a inovação caminha lado a lado com as tradições culturais, onde quem está começando pode se inspirar em quem já trilhou caminhos. A programação é diversa e abraça áreas como Comunicação (Publicidade e Propaganda, Jornalismo, Cinema e Design Visual), Arquitetura, Gastronomia e tantos outros campos que vivem da criatividade e da conexão com a cultura.
            </p>
          </div>
        </div>
      </div>

      {/* SOBRE O FESTIVAL + CARROSSEL MOBILE */}
      <div
        className="w-full flex flex-col items-center lg:hidden"
        style={{
          marginTop: 2,
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 225
        }}
      >
        <h1
          style={{
            fontFamily: '"all-round-gothic", sans-serif',
            color: "#2B3722",
            fontWeight: 700,
            fontSize: "2.1rem",
            letterSpacing: "1px",
            textAlign: "center",
            margin: 0,
            width: "100%",
            maxWidth: 430
          }}
        >
          SOBRE O FESTIVAL
        </h1>
        <div
          style={{
            marginTop: 20,
            width: "100%",
            maxWidth: 396,
            aspectRatio: "396/273.82",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AboutCarousel images={aboutImages}/>
        </div>
        <p
          style={{
            marginTop: 24,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 500,
            color: "#2B3722",
            fontSize: "0.9rem",
            width: "100%",
            maxWidth: 398,
            lineHeight: "1.5",
            paddingLeft: 18,
            paddingRight: 18,
            boxSizing: "border-box",
            textAlign: "left",
            textOverflow: "ellipsis"
          }}
        >
          Mais do que um evento, o festival é um ponto de encontro. Realizado na Universidade Católica de Brasília, é um lugar onde o saber acadêmico dialoga com a prática, onde a inovação caminha lado a lado com as tradições culturais, onde quem está começando pode se inspirar em quem já trilhou caminhos. A programação é diversa e abraça áreas como Comunicação (Publicidade e Propaganda, Jornalismo, Cinema e Design Visual), Arquitetura, Gastronomia e tantos outros campos que vivem da criatividade e da conexão com a cultura.
        </p>
      </div>

            {/* SEÇÃO PROGRAMAÇÃO ATUALIZADA */}
            <div id="programacao" className="w-full flex flex-col justify-center items-center gap-14 mb-[226px] px-4">
                <div className="flex flex-col justify-center items-center lg:items-start md:gap-14 gap-8 w-full max-w-7xl">
                    <div className="h-[55px] flex flex-row items-center self-center lg:self-start md:gap-8 gap-4">
                        <img className="h-[34px]" src={IconeProgramacao} alt="Ícone de Programação"/>
                        <h2 className="font-bold text-4xl md:text-[46px] text-[#2B3722] font-all-round-gothic"
                        style={{ fontFamily: '"all-round-gothic", sans-serif' }}>
                            PROGRAMAÇÃO
                        </h2>
                    </div>

                    {/* Container do quadro com altura flexível.*/}
                    <div
                        className="w-full max-w-[370px] lg:max-w-[1290px] h-auto min-h-[520px] lg:min-h-[555px]
                                   bg-[#2B3722] rounded-2xl p-4 lg:p-8 flex flex-col
                                   shadow-[12px_-10px_15px_rgba(0,0,0,0.25)] mx-auto"
                    >
                        <ScheduleBoard />
                    </div>
                </div>
            </div>

      
      {/* CONVIDADOS */}
      <div id="convidados" className="h-[791px] w-full flex flex-col justify-center items-center gap-14 mb-[82px]">
        <div 
          className='lg:bg-[radial-gradient(ellipse_at_center,_#FFFFFF_0%,_#FFF1BF_100%)] bg-[#FFF1BF] flex flex-col justify-center items-center w-full gap-[62px] py-[62px]'
          style={{ boxShadow: '0px 0px 15px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <h2 
            className='font-bold text-[46px]' 
            style={{
              color: '#2B3722',
              fontFamily: '"all-round-gothic", sans-serif'
            }}
          >CONVIDADOS</h2>
          <GuestsCarousel />  
        </div>   
      </div>
      

      {/* INSCRIÇÃO */}
        <div
          className="w-full flex justify-center inscricao-shadow"
          style={{
            background: '#31477c',
            height: '641px',
            position: 'relative',
          }}
        >
        <div
          style={{
            position: 'absolute',
            left: '175px',
            top: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 'calc(100% - 350px)', 
            maxWidth: 'calc(100vw - 350px)',
            height: 'calc(100% - 40px)',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: '"all-round-gothic", sans-serif',
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '32px',
              letterSpacing: '1px',
            }}
          >
            INSCRIÇÃO
          </h2>
          <p
            style={{
              fontFamily: '"Quicksand", sans-serif',
              color: '#fff',
              fontWeight: 500,
              fontSize: '1rem',
              marginBottom: '60px',
              height: '4px',
            }}
          >
            Palestras e Oficinas do Festival da Economia Criativa com certificado de horas, disponíveis para inscrição acima.
          </p>
            <Link
              to="/events"
              style={{
                width: '124px',
                height: '42px',
                background: '#C43934',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontFamily: '"all-round-gothic", sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '1px',
                display: 'flex', // garante altura
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxSizing: 'border-box', // garante altura exata
                lineHeight: '42px', // garante alinhamento vertical
                padding: 0, // remove padding padrão
              }}
            >
              INSCREVA-SE
            </Link>
           {/* Bloco do mapa e informações */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: '55px',
                marginLeft: '0',
                // aumente a altura se necessário
                minHeight: 400, // adicione ou ajuste este valor
              }}
            >
              {/* Mapa */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4722.339729562657!2d-48.0301378!3d-15.865109399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d97a15b0507%3A0x3c3e4472ee75d834!2sUniversidade%20Cat%C3%B3lica%20de%20Bras%C3%ADlia%20-%20C%C3%A2mpus%20Taguatinga!5e1!3m2!1spt-BR!2sbr!4v1748609037075!5m2!1spt-BR!2sbr"
                width="450"
                height="320"
                style={{
                  border: 0,
                  borderRadius: '8px',
                  opacity: 0.8,
                  display: 'block',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa UCB"
              />

            {/* Texto ao lado do mapa */}
           <div
            style={{
              marginLeft: '34px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              height: '260px',
              flex: 1, 
              minWidth: 0, 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
              <img
                src={IconeLocal}
                alt="Ícone Local"
                style={{ width: 32, height: 32 }}
              />
              <h1
                style={{
                  color: '#fff',
                  fontFamily: '"all-round-gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '2rem',
                  margin: 0,
                  marginLeft: '32px',
                }}
              >
                LOCAL E ACESSO
              </h1>
            </div>
            <p
              style={{
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#fff',
                marginTop: '29px',
                height: '60px',
              }}
            >
              O evento acontece completamente dentro do Campus Taguatinga da Universidade Católica de Brasília.
            </p>
          </div>
          </div>
        </div>
      </div>


      {/* INSCRIÇÃO MOBILE */}
        <div className="inscricao-mobile">
          <div
            style={{
              width: '100%',
              height: 330,
              background: '#31477c',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              paddingLeft: 0,
              paddingRight: 0,
              marginBottom: 183,
                  boxShadow: `
                    0px 4px 15px 0px rgba(0,0,0,0.25),
                    12px -10px 15px 0px rgba(0,0,0,0.25),
                    0px 4px 4px 0px rgba(0,0,0,0.25)
                  `,           
            }}
          >
            <h2
              style={{
                fontFamily: '"all-round-gothic", sans-serif',
                color: '#fff',
                fontSize: '2rem',
                fontWeight: 700,
                marginTop: 42,
                marginBottom: 0,
                letterSpacing: '1px',
              }}
            >
              INSCRIÇÃO
            </h2>
            <p
              style={{
                fontFamily: '"Quicksand", sans-serif',
                color: '#fff',
                fontWeight: 500,
                fontSize: '1rem',
                marginTop: 32,
                marginBottom: 0,
                width: 350,
                height: 95,
                paddingLeft: 24,
                paddingRight: 24,
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Palestras e Oficinas do Festival da Economia Criativa com certificado de horas, disponíveis para inscrição acima.
            </p>
            <Link
              to="/events"
              style={{
                width: 224,
                height: 42,
                background: '#C43934',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontFamily: '"all-round-gothic", sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '1px',
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              INSCREVA-SE
            </Link>
          </div>

          {/* BLOCO LOCAL E ACESSO MOBILE */}
            <div
              style={{
                width: '100%',
                height: 554,
                background: '#31477c',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                paddingLeft: 0,
                paddingRight: 0,
                boxShadow: `
                    0px 4px 15px 0px rgba(0,0,0,0.25),
                    12px -10px 15px 0px rgba(0,0,0,0.25),
                    0px 4px 4px 0px rgba(0,0,0,0.25)
                  `,  
              }}
            >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4722.339729562657!2d-48.0301378!3d-15.865109399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d97a15b0507%3A0x3c3e4472ee75d834!2sUniversidade%20Cat%C3%B3lica%20de%20Bras%C3%ADlia%20-%20C%C3%A2mpus%20Taguatinga!5e1!3m2!1spt-BR!2sbr!4v1748609037075!5m2!1spt-BR!2sbr"
              width="320"
              height="260"
              style={{
                border: 0,
                borderRadius: 8,
                opacity: 0.8,
                marginTop: 42,
                display: 'block',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa UCB"
            />
            <h1
              style={{
                color: '#fff',
                fontFamily: '"all-round-gothic", sans-serif',
                fontWeight: 700,
                fontSize: '2rem',
                margin: 0,
                marginTop: 34,
                textAlign: 'center',
                width: '100%',
              }}
            >
              LOCAL E ACESSO
            </h1>
            <p
              style={{
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#fff',
                marginTop: 30,
                width: 352,
                height: 95,
                paddingLeft: 24,
                paddingRight: 24,
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              O evento acontece completamente dentro do Campus Taguatinga da Universidade Católica de Brasília.
            </p>
          </div>
        </div>

      {/* SEÇÃO REALIZAÇÃO DESKTOP */}
        <div className="hidden lg:flex w-full justify-center" style={{ background: '#FAF9F6' }}>
            <div className="flex flex-col items-center w-full" style={{ marginTop: 90, marginBottom: -70 }}>
              <h1
                style={{
                  fontFamily: '"all-round-gothic", sans-serif',
                  color: '#2B3722',
                  fontWeight: 700,
                  fontSize: '2.5rem',
                  letterSpacing: '1px',
                }}
              >
                
                REALIZAÇÃO
              </h1>
               <div
                style={{
                  marginTop: 41,
                  width: 1090,
                  height: 4,
                  background: '#2B3722',
                  borderRadius: 2,
                  alignSelf: 'center',
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  marginTop: 41,
                  width: 1090,
                  display: 'flex',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  gap: '0 96px', // 96px entre as logos
                }}
              >
            {[
              {
                src: logoCajui,
                nome: 'Cajuí Collab',
                imgStyle: { width: 130, height: 139 },
                textMargin: 57,
                link: 'https://cajuicollab.com.br/',
              },
              {
                src: logoOlfato,
                nome: 'Olfato Comunicação',
                imgStyle: { width: 100, height: 96 },
                textMargin: 57,
                link: 'https://www.instagram.com/olfatocomunicacao/',
              },
              {
                src: logoMatriz,
                nome: 'Matriz Comunicação',
                imgStyle: { width: 158, height: 96 },
                textMargin: 57,
                link: 'https://www.instagram.com/matrizcomunicacao/',
              },
            ].map((empresa) => (
              <div
                key={empresa.nome}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 64,
                  maxWidth: 180,
                  width: '100%',
                }}
              >
                <div
                  style={{
                    height: 139,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <a href={empresa.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={empresa.src}
                      alt={empresa.nome}
                      style={{
                        ...empresa.imgStyle,
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </a>
                </div>
                <span
                  style={{
                    marginTop: empresa.textMargin,
                    fontFamily: '"all-round-gothic", sans-serif',
                    fontWeight: 700,
                    color: '#2B3722',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    display: 'block',
                    wordBreak: 'break-word',
                    lineHeight: '1.7',
                  }}
                >
                  {empresa.nome}
                </span>
              </div>
            ))}
              </div>
            </div>
        </div>

      {/* SEÇÃO APOIO DESKTOP */}
        <div id="apoio" className="hidden lg:flex w-full justify-center" style={{ background: '#FAF9F6' }}>
            <div className="flex flex-col items-center w-full" style={{ marginTop: 90, marginBottom: 60 }}>
              <h1
                style={{
                  fontFamily: '"all-round-gothic", sans-serif',
                  color: '#2B3722',
                  fontWeight: 700,
                  fontSize: '2.5rem',
                  letterSpacing: '1px',
                }}
              >
                APOIO
              </h1>
              <div
                style={{
                  marginTop: 41,
                  width: 1090,
                  height: 4,
                  background: '#2B3722',
                  borderRadius: 2,
                  alignSelf: 'center',
                }}
              />
              {/* LOGOS DE APOIO - FAPDF PRIMEIRO */}
              <div
                style={{
                  marginTop: 41,
                  width: 1090,
                  display: 'flex',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '0 1px',
                }}
              >
                {/* FAPDF */}
                <div
                  style={{
                    maxWidth: 310,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 64,
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <a
                      href="https://www.fap.df.gov.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <img
                        src={logoFap}
                        alt="Fundação de Apoio à Pesquisa do Distrito Federal"
                        style={{
                          maxWidth: 220,
                          maxHeight: 120,
                          objectFit: 'contain',
                          display: 'block',
                          background: 'transparent',
                          opacity: 1,
                          zIndex: 1,
                        }}
                      />
                    </a>
                  </div>
                  <span
                    style={{
                      marginTop: 30,
                      fontFamily: '"all-round-gothic", sans-serif',
                      fontWeight: 700,
                      color: '#2B3722',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    Fundação de Apoio à Pesquisa<br />do Distrito Federal
                  </span>
                </div>
                {/* CATÓLICA */}
                <div
                  style={{
                    maxWidth: 310,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 64,
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <a
                      href="https://ucb.catolica.edu.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <img
                        src={logoCatolicaDark}
                        alt="Universidade Católica de Brasília"
                        style={{
                          maxWidth: 220,
                          maxHeight: 120,
                          objectFit: 'contain',
                          display: 'block',
                          background: 'transparent',
                          opacity: 1,
                          zIndex: 1,
                        }}
                      />
                    </a>
                  </div>
                  <span
                    style={{
                      marginTop: 30,
                      fontFamily: '"all-round-gothic", sans-serif',
                      fontWeight: 700,
                      color: '#2B3722',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    Universidade Católica<br />de Brasília
                  </span>
                </div>
              </div>
            </div>
        </div>

      {/* REALIZAÇÃO E APOIO MOBILE */}
        <div
              className="inscricao-mobile"
              style={{
                width: '100%',
                paddingBottom: 60,
                minHeight: '100vh',
              }}
            >
              {/* REALIZAÇÃO */}
              <div style={{ marginTop: 90 }}>
                <h1
                  style={{
                    fontFamily: '"all-round-gothic", sans-serif',
                    color: '#2B3722',
                    fontWeight: 700,
                    fontSize: '2.1rem',
                    letterSpacing: '1px',
                    textAlign: 'center',
                  }}
                >
                  REALIZAÇÃO
                </h1>
                <div
                  style={{
                    margin: '24px 0 0 0',
                    width: 'calc(100% - 28px)',
                    height: 4,
                    background: '#2B3722',
                    borderRadius: 2,
                    alignSelf: 'center',
                    marginLeft: 14,
                    marginRight: 14,
                    maxWidth: 398,
                  }}
                />
                {/* Logos uma embaixo da outra */}
                <div style={{ marginTop: 32, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Cajui */}
                  <a href="https://cajuicollab.com.br/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={logoCajui}
                      alt="Cajuí Collab"
                      style={{ width: 130, height: 139, objectFit: 'contain', display: 'block' }}
                    />
                  </a>
                  <span
                    style={{
                      marginTop: 24,
                      fontFamily: '"all-round-gothic", sans-serif',
                      fontWeight: 700,
                      color: '#2B3722',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    Cajuí Collab
                  </span>
                  {/* Olfato */}
                  <a href="https://www.instagram.com/olfatocomunicacao/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={logoOlfato}
                      alt="Olfato Comunicação"
                      style={{ width: 100, height: 96, objectFit: 'contain', display: 'block', marginTop: 40 }}
                    />
                  </a>
                  <span
                    style={{
                      marginTop: 24,
                      fontFamily: '"all-round-gothic", sans-serif',
                      fontWeight: 700,
                      color: '#2B3722',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    Olfato Comunicação
                  </span>
                  {/* Matriz */}
                  <a href="https://www.instagram.com/matrizcomunicacao/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={logoMatriz}
                      alt="Matriz Comunicação"
                      style={{ width: 158, height: 96, objectFit: 'contain', display: 'block', marginTop: 40 }}
                    />
                  </a>
                  <span
                    style={{
                      marginTop: 24,
                      fontFamily: '"all-round-gothic", sans-serif',
                      fontWeight: 700,
                      color: '#2B3722',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      display: 'block',
                      wordBreak: 'break-word',
                    }}
                  >
                    Matriz Comunicação
                  </span>
                </div>
              </div>

            {/* APOIO */}
               <div style={{ marginTop: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: '"all-round-gothic", sans-serif',
                        color: '#2B3722',
                        fontWeight: 700,
                        fontSize: '2.1rem',
                        letterSpacing: '1px',
                        textAlign: 'center',
                        marginTop: 30,
                      }}
                    >
                      APOIO
                    </span>
                      <div
                        style={{
                          marginTop: 24,
                          width: 'calc(100% - 28px)',
                          height: 4,
                          background: '#2B3722',
                          borderRadius: 2,
                          alignSelf: 'center',
                          marginLeft: 14,
                          marginRight: 14,
                          maxWidth: 398,
                        }}
                      />
                    <div
                      style={{
                        marginTop: 32,
                        width: '100%',
                        maxWidth: 320,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {/* FAPDF */}
                      <a
                        href="https://www.fap.df.gov.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          maxWidth: 220,
                          minHeight: 120,
                        }}
                      >
                        <img
                          src={logoFap}
                          alt="Fundação de Apoio à Pesquisa do Distrito Federal"
                          style={{
                            maxWidth: 220,
                            maxHeight: 120,
                            objectFit: 'contain',
                            display: 'block',
                            background: 'transparent',
                            opacity: 1,
                            zIndex: 1,
                            width: '100%',
                          }}
                        />
                      </a>
                      <span
                        style={{
                          marginTop: 24,
                          fontFamily: '"all-round-gothic", sans-serif',
                          fontWeight: 700,
                          color: '#2B3722',
                          fontSize: '1.1rem',
                          textAlign: 'center',
                          display: 'block',
                          wordBreak: 'break-word',
                        }}
                      >
                        Fundação de Apoio à Pesquisa<br />do Distrito Federal
                      </span>
                      {/* CATÓLICA */}
                      <a
                        href="https://ucb.catolica.edu.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          maxWidth: 220,
                          minHeight: 120,
                          marginTop: 40,
                        }}
                      >
                        <img
                          src={logoCatolicaDark}
                          alt="Universidade Católica de Brasília"
                          style={{
                            maxWidth: 220,
                            maxHeight: 120,
                            objectFit: 'contain',
                            display: 'block',
                            background: 'transparent',
                            opacity: 1,
                            zIndex: 1,
                            width: '100%',
                          }}
                        />
                      </a>
                      <span
                        style={{
                          marginTop: 24,
                          fontFamily: '"all-round-gothic", sans-serif',
                          fontWeight: 700,
                          color: '#2B3722',
                          fontSize: '1.1rem',
                          textAlign: 'center',
                          display: 'block',
                          wordBreak: 'break-word',
                        }}
                      >
                        Universidade Católica<br />de Brasília
                      </span>
                    </div>
                  </div>
        </div>

      <style>{`

        @media (min-width: 1024px) {
          .home-bg {
            background-image: url(${HomeBg});
            background-size: cover;
            background-position: center 0px;
            background-repeat: no-repeat;
          }
          .home-bg-root {
            background: #FAF9F6
          }
          .inscricao-mobile {
            display: none;
          }
        }
          .inscricao-shadow {
            box-shadow: inset 0 16px 32px -16px rgba(0,0,0,0.25), 
            0 16px 32px -16px rgba(0,0,0,0.25);
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
          }
        @media (max-width: 1023px) {
          .inscricao-mobile {
            display: block;
          }
          .inscricao-shadow {
            display: none !important;
          }
          .inscricao-mobile > div {
            width: 100%;
            max-width: none;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 15px;
            padding-right: 15px;
            box-sizing: border-box;
          }
          .inscricao-mobile > div:last-child {
            max-width: 500px;
          }
        }
          body {
            background: radial-gradient(ellipse at center, #FFFFFF 0%, #FFF1BF 100%);
            min-height: 100vh;
            width: 100vw;
          }
      `
      }</style>

  </div>
)
}