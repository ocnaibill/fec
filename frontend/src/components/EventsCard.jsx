import React from 'react';

export default function EventsCard({ children, style, date, time, title, description, speakers = [], isWorkshop = false }) {
    

    return (
        <div
            className={`relative flex flex-col items-start justify-start 
                        w-[398px] md:w-[906px] p-[24px] md:p-[36px] 
                        bg-transparent border-2 border-[#2B3722] rounded-[12px] 
                        shadow-[0px_4px_15px_rgba(0,0,0,0.25)] box-border`}
            style={style}
        >
            {/* Linha com data, horário, linha separadora e título */}
            <div className="flex items-center gap-[16px] w-full mb-[20px] md:mb-[24px]">
                {/* Data e horário do evento */}
                <div className="flex flex-col items-end">
                    <div className="font-all-round-gothic font-bold text-[#2B3722] text-[48px] md:text-[64px]">
                        {date}
                    </div>
                    <div className="font-all-round-gothic font-bold text-[#2B3722] text-[24px] md:text-[32px] mt-[-4px] md:mt-[-30px]">
                        {time}
                    </div>
                </div>

                {/* Linha separadora */}
                <div className="bg-[#2B3722] w-[2px] md:w-[3px] h-[70px] md:h-[90px]"></div>

                {/* Título da palestra */}
                <div className="font-all-round-gothic font-bold text-[#2B3722]  text-[25px] md:text-[42px] flex-1">
                    {title}
                </div>
            </div>

            {/* Descrição do evento */}
            <div className="font-quicksand font-medium text-[#2B3722] text-[16px] md:text-[18px] mb-[20px] md:mb-[24px]" style={{ lineHeight: '1.5' }}>
                {description}
            </div>

            {/* Título "Palestrantes" ou "Instrutores" */}
            <div className="font-all-round-gothic font-bold text-[#2B3722] text-left text-[24px] md:text-[32px] mb-[12px] md:mb-[16px]">
                {isWorkshop ? 'INSTRUTORES' : 'PALESTRANTES'}
            </div>

            {/* --- SOLUÇÃO DE ALINHAMENTO COM CSS GRID --- */}
            <div className="flex flex-col md:grid md:grid-cols-[max-content_1fr] gap-y-[12px] md:gap-x-[8px] w-full">
                {speakers.map((speaker, index) => (
                    <React.Fragment key={index}>
                        {/* COLUNA 1: Nome do palestrante */}
                        {/* 'whitespace-nowrap' impede que o nome quebre em duas linhas */}
                        <span className="font-all-round-gothic font-bold text-[#2B3722] text-[16px] md:text-[18px] text-left whitespace-nowrap">
                            {speaker.name}
                        </span>

                        {/* COLUNA 2: Sinopse do palestrante */}
                        <span className="font-quicksand font-medium text-[#2B3722] text-[16px] md:text-[18px] text-left mt-[8px] md:mt-0" style={{ lineHeight: '1.5' }}>
                            {speaker.bio}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}