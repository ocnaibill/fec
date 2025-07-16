import React from 'react';
import calendarioIcon from '../assets/images/yellowCalendarIcon.svg';
import localIcon from '../assets/images/yellowLocalIcon.svg'; 
import downloadIcon from '../assets/images/yellowDownloadIcon.svg'; 

export default function AccountCard({ title, date, time, location, isCertificate, onViewTicket, onDownloadCertificate }) {

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        timeZone: 'UTC' 
    });
    
    const formattedTime = time.slice(0, 5);

    const handleClick = () => {
        if (isCertificate) {
            onDownloadCertificate();
        } else {
            onViewTicket();
        }
    };

    return (
        <div
            className="event-card w-[calc(100%-16px)] h-[130px] bg-[#2B3722] rounded-[12px] shadow-md p-4 flex justify-between items-center mb-4 lg:w-[892px]"
        >
            {/* Informações do evento */}
            <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-bold font-['all-round-gothic'] text-[#FFF1BF] m-0">
                    {title}
                </h2>
                <div className="flex items-center gap-2">
                    <img src={calendarioIcon} alt="Calendário" className="w-4 h-4" />
                    <span className="text-[16px] font-['all-round-gothic'] text-[#FFF1BF]">
                        {formattedDate}, {formattedTime}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={localIcon} alt="Local" className="w-4 h-4" />
                    <span className="text-[16px] font-['all-round-gothic'] text-[#FFF1BF]">
                        {location}
                    </span>
                </div>
            </div>

            <div 
                className="flex items-center gap-2 text-[#FFF1BF] font-bold font-['all-round-gothic'] text-[14px] cursor-pointer transition-transform transform hover:scale-105"
                onClick={handleClick}
            >
                {isCertificate ? (
                    <>
                        <span>Baixar Certificado</span>
                        <img src={downloadIcon} alt="Download" className="w-4 h-4" />
                    </>
                ) : (
                    <span>Ver Ingresso</span>
                )}
            </div>
        </div>
    );
}