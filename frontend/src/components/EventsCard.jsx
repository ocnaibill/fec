import React from 'react';
export default function EventsCard({ children, style, date, time, title, description, speakers = [] }) {
    return (
        <div
            className={`relative flex flex-col items-start justify-start 
                        ${window.innerWidth >= 768 ? 'w-[906px] p-[36px]' : 'w-[398px] p-[24px]'} 
                        bg-transparent border-2 border-[#2B3722] rounded-[12px] 
                        shadow-[0px_4px_15px_rgba(0,0,0,0.25)] box-border`}
            style={style}
        >
            {/* Data do evento */}
            <div
                className={`absolute font-all-round-gothic font-bold text-[#2B3722] 
                            ${window.innerWidth >= 768 ? 'text-[64px] top-[10px] left-[36px]' : 'text-[48px] top-[8px] left-[24px]'}`}
            >
                {date}
            </div>

            {/* Horário do evento */}
            <div
                className={`absolute font-all-round-gothic font-bold text-[#2B3722] 
                            ${window.innerWidth >= 768 ? 'text-[32px] top-[80px] left-[115px]' : 'text-[24px] top-[64px] left-[80px]'}`}
            >
                {time}
            </div>

            {/* Linha vertical ao lado da data */}
            <div
                className={`absolute bg-[#2B3722] 
                            ${window.innerWidth >= 768 ? 'top-[30px] left-[200px] w-[3px] h-[90px]' : 'top-[24px] left-[150px] w-[2px] h-[70px]'}`}
            ></div>

            {/* Título da palestra */}
            <div
                className={`absolute font-all-round-gothic font-bold text-[#2B3722] text-center 
                            ${window.innerWidth >= 768 ? 'text-[42px] top-[44px] left-[220px]' : 'text-[36px] top-[30px] left-[160px]'}`}
            >
                {title}
            </div>

            {/* Descrição do evento */}
            <div
                className={`absolute font-quicksand font-medium text-[#2B3722] 
                            ${window.innerWidth >= 768 ? 'text-[18px] top-[136px] left-[36px] right-[36px]' : 'text-[16px] top-[120px] left-[24px] right-[24px]'}`}
                style={{
                    lineHeight: '1.5', // Ajusta o espaçamento entre linhas
                }}
            >
                {description}
            </div>

            {/* Título "PALESTRANTES" */}
            <div
                className={`font-all-round-gothic font-bold text-[#2B3722] text-left 
                            ${window.innerWidth >= 768 ? 'text-[32px] mt-[210px]' : 'text-[24px] mt-[360px]'}`}
            >
                PALESTRANTES
            </div>

            {/* Lista de palestrantes */}
            {speakers.map((speaker, index) => (
                <div
                    key={index}
                    className="flex items-start mt-[24px]"
                    style={{
                        marginLeft: '4px',
                        marginRight: '24px',
                    }}
                >
                    {/* Nome do palestrante */}
                    <span
                        className={`font-all-round-gothic font-bold text-[#2B3722] 
                                    ${window.innerWidth >= 768 ? 'text-[18px]' : 'text-[16px]'}`}
                        style={{
                            whiteSpace: 'nowrap', // Garante que o nome completo fique na mesma linha
                        }}
                    >
                        {speaker.name}
                    </span>
                    {/* Sinopse do palestrante */}
                    <span
                        className={`font-quicksand font-medium text-[#2B3722] ml-[18px] 
                                    ${window.innerWidth >= 768 ? 'text-[18px]' : 'text-[16px]'}`}
                        style={{
                            lineHeight: '1.5',
                        }}
                    >
                        {speaker.bio}
                    </span>
                </div>
            ))}
        </div>
    );
}