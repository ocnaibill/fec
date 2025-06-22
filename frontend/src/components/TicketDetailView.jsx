import setaPerfil from '../assets/images/setaPerfil.svg';
import iconePalestrante from '../assets/images/iconePalestrante.svg';
import calendarioPalestra from '../assets/images/calendarioPalestra.svg';
import localIcon from '../assets/images/localIcon.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TicketDetailView = ({ subscription, onBack }) => {
    const { activity } = subscription;
    const [qrCodeUrl, setQrCodeUrl] = useState(null);


useEffect(() => {
    const fetchQrCode = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
            const token = localStorage.getItem('authToken'); 
            const response = await axios.get(`${baseUrl}/event/mysubs/`, {
                headers: {
                    Authorization: `Token ${token}`, 
                },
            });
            const subscriptionData = response.data.find(sub => sub.id === subscription.id);
                if (subscriptionData && subscriptionData.qrcode) {
                    const qrCodePath = subscriptionData.qrcode.startsWith('/media/')
                        ? subscriptionData.qrcode
                        : `/media/${subscriptionData.qrcode}`;
                    setQrCodeUrl(`${baseUrl.replace('/api', '')}${qrCodePath}`);
                }
        } catch (error) {
            console.error('Erro ao buscar o QR Code:', error);
        }
    };

    fetchQrCode();
}, [subscription.id]);

    const formattedDate = new Date(activity.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
    const formattedTime = activity.time.slice(0, 5);

    const guestFirstNames = activity.guests.map(guest => guest.name.split(' ')[0]).join(', ');

    return (
<div className="w-full px-4" style={{marginBottom: '30px'}}>
    <div className="w-full bg-[#2B3722] rounded-xl mt-6 p-6">
        {/* Cabeçalho com botão de voltar e título */}
        <div className="w-full flex items-center justify-center relative">
            <button
                onClick={onBack}
                style={{ backgroundColor: '#2B3722', padding: '8px' }}
                className="absolute left-0"
            >
                <img src={setaPerfil} alt="Voltar" />
            </button>
            <h1
                className="text-2xl md:text-3xl text-center text-[#FFF1BF] font-bold"
                style={{ fontFamily: '"all-round-gothic", sans-serif', fontSize: '45px' }}
            >
                {activity.title}
            </h1>
        </div>

        {/* Container interno amarelo */}
        <div className="bg-[#FFF1C0] min-h-[181px] w-full rounded-md flex flex-col items-center justify-center">
    <div className="w-full px-4 mt-3 text-[#2B3722]">
        <p
            className="font-medium text-base mb-3"
            style={{ fontFamily: '"Quicksand", sans-serif' }}
        >
            {activity.description}
        </p>

        {/* Linha dos palestrantes */}
        <div className="flex items-center gap-2 mb-3">
            <img src={iconePalestrante} alt="Palestrante" className="w-5 h-5" />
            <span className="font-bold" style={{ fontFamily: '"Quicksand", sans-serif' }}>{guestFirstNames}</span>
        </div>

        {/* Linha da data e hora */}
        <div className="flex items-center gap-2 mb-3">
            <img src={calendarioPalestra} alt="Calendário" className="w-5 h-5" />
            <span className="font-light">
                {formattedDate}, {formattedTime}
            </span>
        </div>

        {/* Linha do local */}
        <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
            <img src={localIcon} alt="Local" className="w-5 h-5" />
            <span className="font-light">{activity.local}</span>
        </div>
    </div>
</div>
      {/* QR Code */}
            {qrCodeUrl && (
                <div className="flex justify-center mt-6">
                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                </div>
            )}
                        {/* Texto abaixo do QR Code */}
            <p
                className="mt-6 text-center text-[#FFF1BF] font-bold"
                style={{ fontFamily: '"all-round-gothic", sans-serif', fontSize: '16px' }}
            >
                Apresente este QR Code na entrada do evento
            </p>

            {/* Botão de cancelar inscrição */}
            <button
                className="mt-6 w-full h-[42px] bg-[#FFF2C0] border-2 border-[#CA1F1D] text-[#CA1F1D] font-bold"
                style={{
                    backgroundColor: '#FFF2C0',
                    borderColor: '#CA1F1D',
                    borderWidth: '2px',
                    color: '#CA1F1D',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontFamily: '"all-round-gothic", sans-serif',
                    fontWeight: 'bold',
                    maxWidth: '100%',
                }}
               onClick={async () => {
                const confirmCancel = window.confirm('Tem certeza de que deseja cancelar sua inscrição?');
                if (!confirmCancel) return;

                try {
                    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
                    const token = localStorage.getItem('authToken');
                    await axios.post(
                        `${baseUrl}/event/cancel-subscription/${subscription.id}/`,
                        {},
                        {
                            headers: {
                                Authorization: `Token ${token}`,
                            },
                        }
                    );
                    alert('Inscrição cancelada com sucesso!');
                    onBack(); 
                } catch (error) {
                    console.error('Erro ao cancelar inscrição:', error);
                    alert('Não foi possível cancelar a inscrição. Tente novamente mais tarde.');
                }
            }}
            >
                Cancelar Inscrição
            </button>
    </div>


        
</div>

    );
};
export default TicketDetailView;

