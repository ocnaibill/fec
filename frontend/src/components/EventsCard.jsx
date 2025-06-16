export default function EventsCard({ children, style, date, time, title, description, speakers = [], isWorkshop = false }) {
    return (
        <div
            className={`relative flex flex-col items-start justify-start 
                        ${window.innerWidth >= 768 ? 'w-[906px] p-[36px]' : 'w-[398px] p-[24px]'} 
                        bg-transparent border-2 border-[#2B3722] rounded-[12px] 
                        shadow-[0px_4px_15px_rgba(0,0,0,0.25)] box-border`}
            style={style}
        >
            {/* Linha com data, horário, linha separadora e título */}
            <div className="flex items-center gap-[16px] w-full">
                {/* Data e horário do evento */}
                <div className="flex flex-col items-end">
                    <div
                        className={`font-all-round-gothic font-bold text-[#2B3722] 
                                    ${window.innerWidth >= 768 ? 'text-[64px]' : 'text-[48px]'}`}
                    >
                        {date}
                    </div>
                    <div
                        className={`font-all-round-gothic font-bold text-[#2B3722] 
                                    ${window.innerWidth >= 768 ? 'text-[32px] mt-[-30px]' : 'text-[24px] mt-[-4px]'}`}
                    >
                        {time}
                    </div>
                </div>

                {/* Linha separadora */}
                <div
                    className={`bg-[#2B3722] 
                                ${window.innerWidth >= 768 ? 'w-[3px] h-[90px]' : 'w-[2px] h-[70px]'}`}
                ></div>

                {/* Título da palestra */}
                <div
                    className={`font-all-round-gothic font-bold text-[#2B3722] text-center 
                                ${window.innerWidth >= 768 ? 'text-[42px]' : 'text-[25px]'}`}
                >
                    {title}
                </div>
            </div>

            {/* Descrição do evento */}
            <div
                className={`font-quicksand font-medium text-[#2B3722] 
                            ${window.innerWidth >= 768 ? 'text-[18px] mb-[24px]' : 'text-[16px] mb-[20px]'}`}
                style={{
                    lineHeight: '1.5', 
                }}
            >
                {description}
            </div>

            {/* Título "Palestrantes" ou "Instrutores" */}
            <div
                className={`font-all-round-gothic font-bold text-[#2B3722] text-left 
                            ${window.innerWidth >= 768 ? 'text-[32px] mb-[16px]' : 'text-[24px] mb-[12px]'}`}
            >
                {isWorkshop ? 'INSTRUTORES' : 'PALESTRANTES'}
            </div>

            {/* Lista de palestrantes/instrutores */}
            <div className="flex flex-col gap-[12px]">
                {speakers.map((speaker, index) => (
                    <div
                        key={index}
                        className={`flex ${window.innerWidth >= 768 ? 'flex-row items-start' : 'flex-col items-center'}`} 
                        style={{
                            marginLeft: window.innerWidth >= 768 ? '4px' : '0',
                            marginRight: window.innerWidth >= 768 ? '24px' : '0',
                        }}
                    >
                        {/* Nome do palestrante/instrutor */}
                        <span
                            className={`font-all-round-gothic font-bold text-[#2B3722] 
                                        ${window.innerWidth >= 768 ? 'text-[18px] mr-[8px]' : 'text-[16px]'}`}
                            style={{
                                whiteSpace: 'nowrap', 
                                textAlign: 'left', 
                            }}
                        >
                            {speaker.name}
                        </span>
                        {/* Sinopse do palestrante/instrutor */}
                        <span
                            className={`font-quicksand font-medium text-[#2B3722] 
                                        ${window.innerWidth >= 768 ? 'text-[18px]' : 'mt-[8px] text-[16px]'}`} 
                            style={{
                                lineHeight: '1.5',
                                textAlign: 'left', 
                            }}
                        >
                            {speaker.bio}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}