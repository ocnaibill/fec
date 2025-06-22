import React, { useState, useEffect, useCallback } from 'react';
import fundo2 from '../assets/images/fundo2_fec.svg';
import usuarioSemFoto from '../assets/images/usuarioSemFoto.svg';
import AccountCard from '../components/AccountCard';
import TicketDetailView from '../components/TicketDetailView';
import axios from 'axios';
import {toast} from 'react-toastify';
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-[#2B3722] rounded-xl p-6 w-[90%] max-w-lg flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} 
            >
                {children}
            </div>
        </div>
    );
};

export default function Account() {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(usuarioSemFoto);
    const [selectedOption, setSelectedOption] = useState('meusEventos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingData, setIsEditingData] = useState(false);
    const [institutionChoice, setInstitutionChoice] = useState('UCB');
    const [mySubscriptions, setMySubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    
    const handleViewTicket = (subscription) => {
        setSelectedSubscription(subscription);
    };
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setPreviewPhoto(user.photo || usuarioSemFoto);
        setSelectedFile(null);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setPreviewPhoto(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    
    const handleSavePhoto = async () => {
        if (!selectedFile) {
            toast.error("Por favor, selecione uma nova imagem.");
            return;
        }

        const token = localStorage.getItem('authToken');
        const photoFormData = new FormData();
        photoFormData.append('photo', selectedFile);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await axios.patch(`${baseUrl}/users/me/update/`, photoFormData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            
            await fetchUserData(); 
            
            toast.success("Foto de perfil atualizada com sucesso!");
            closeModal(); 

        } catch (error) {
            console.error("Erro ao salvar a foto:", error.response?.data || error);
            toast.error("Não foi possível salvar a foto. Tente novamente.");
        }
    };

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "institution_choice") {
            const choice = value;
            setInstitutionChoice(choice);
            if (choice === 'Outros') {
                setFormData(prevState => ({ ...prevState, registration_number: '' }));
            } else {
                setFormData(prevState => ({ ...prevState, institution: 'Universidade Católica de Brasília' }));
            }
        } else {
            const finalValue = name === 'cpf' ? cpfMask(value) : value;
            setFormData(prevState => ({ ...prevState, [name]: finalValue }));
        }
    };

    const handleUpdateUser = async () => {
        const dataToSend = { ...formData };
            delete dataToSend.photo;


        if (institutionChoice === 'UCB') {
            dataToSend.institution = 'Universidade Católica de Brasília';
        } else {
            dataToSend.registration_number = ''; 
        }

        if (dataToSend.cpf) {
            dataToSend.cpf = dataToSend.cpf.replace(/[^\d]/g, '');
        }

        try {
            const token = localStorage.getItem('authToken');
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await axios.patch(`${baseUrl}/users/me/update/`, dataToSend, {
                headers: { Authorization: `Token ${token}` },
            });
            await fetchUserData();
            
        
            setIsEditingData(false); 
            toast.success("Dados atualizados com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar dados:", error.response?.data || error);
            toast.error("Erro ao atualizar os dados. Verifique as informações.");
        }
    };

    const cpfMask = (value) => {
        if (!value) return "";
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };
    
    const fetchUserData = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) return;
            
            const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/users/me`;
            
            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Token ${token}` },
            });

            const userData = response.data;
            const publicBaseUrl = 'https://feconomiacriativa.catolica.edu.br';
            const internalBaseUrl = 'http://172.17.0.110'; 

            if (userData.photo) {
                userData.photo = userData.photo.replace(internalBaseUrl, publicBaseUrl);
            }

            setUser(userData);
            setPreviewPhoto(userData.photo || usuarioSemFoto);
            
        } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
        }
    }, []); 

    const fetchMySubscriptions = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) return;
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await axios.get(`${baseUrl}/event/mysubs/`, {
                headers: { Authorization: `Token ${token}` },
            });
            setMySubscriptions(response.data); 
        } catch (error) {
            console.error('Erro ao buscar as inscrições do usuário:', error);
        }
    }, []);

     useEffect(() => {
        fetchUserData();
        fetchMySubscriptions();
    }, [fetchUserData, fetchMySubscriptions]); 


    const dataToShow = selectedOption === 'meusEventos' 
        ? mySubscriptions 
        : mySubscriptions.filter(sub => sub.status === 'emitida'); 

    const events = [];
    const certificates = [];

    
    return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-[50px] bg-cover bg-center" style={{ backgroundImage: `url(${fundo2})` }}>
        
        {/* --- LÓGICA DE EXIBIÇÃO PRINCIPAL --- */}
        {selectedSubscription ? (
            <TicketDetailView 
                subscription={selectedSubscription} 
                onBack={() => setSelectedSubscription(null)} 
            />
        ) : !isEditingData ? (
            <>
                    {/* MODO DE VISUALIZAÇÃO  */}
                    <div className="w-[142px] h-[142px] rounded-full overflow-hidden mb-3">
                         <img src={user.photo || usuarioSemFoto} alt="Foto do usuário" className="w-full h-full object-cover"/>

                     </div>
                     <h1 className="text-3xl font-bold text-[#2B3722] text-center" style={{ fontFamily: '"all-round-gothic", sans-serif', fontSize:'35px' }}>
                         {user.name}
                     </h1>
                    <div className="user-buttons" style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                        <button className="meus-dados-button" style={{ width: '160px', height: '40px', backgroundColor: '#F06F37', borderRadius: '12px', border: 'none', color: '#FFFEFC', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }} onClick={() => {
                                const userData = { ...user, cpf: cpfMask(user.cpf) };
                                setFormData(userData);
                                
                                if (user.institution === 'Universidade Católica de Brasília') {
                                    setInstitutionChoice('UCB');
                                } else {
                                    setInstitutionChoice('Outros');
                                }
                                
                                setIsEditingData(true);
                            }}
                        >
                            Editar Dados
                        </button>
                        <button className="editar-foto-button" style={{ width: '160px', height: '40px', backgroundColor: '#F06F37', borderRadius: '12px', border: 'none', color: '#FFFEFC', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                            onClick={openModal}
                        >
                            Editar Foto
                        </button>
                    </div>
                            <div className="user-options" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                        <button onClick={() => setSelectedOption('meusEventos')} style={{ fontSize: '16px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#2B3722', background: 'none', border: 'none', cursor: 'pointer', borderBottom: selectedOption === 'meusEventos' ? '3px solid #2B3722' : 'none', borderRadius: 0 }}>
                              Meus eventos
                        </button>
                        <button onClick={() => setSelectedOption('certificados')} style={{ fontSize: '16px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#2B3722', background: 'none', border: 'none', cursor: 'pointer', borderBottom: selectedOption === 'certificados' ? '3px solid #2B3722' : 'none', borderRadius: 0 }}> Certificados
                        </button>
                    </div>
                    {/* <<-- LISTA DE EVENTOS OU CERTIFICADOS ATUALIZADA -->> */}
                    <div className="mt-6 w-full flex flex-col items-center gap-4 mb-8">
                        {dataToShow.length > 0 ? (
                            dataToShow.map((item) => (
                                <AccountCard
                                    key={item.id} 
                                    title={item.activity.title}
                                    date={item.activity.date}
                                    time={item.activity.start_time}
                                    location={item.activity.local} 
                                    isCertificate={selectedOption === 'certificados'}
                                    onViewTicket={() => handleViewTicket(item)} 
                                />
                            ))
                        ) : (
                            <p className="text-[#2B3722] font-bold mt-10">
                                {selectedOption === 'meusEventos' ? 'Você não está inscrito em nenhum evento.' : 'Nenhum certificado disponível.'}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <div className="edit-data-container" style={{ width: 'calc(100% - 32px)', maxWidth: '400px', backgroundColor: '#2B3722', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
                    <h2 className="text-center" style={{ fontSize: '24px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#FFF1BF', textAlign: 'center', marginBottom: '24px' }}>
                        Editar Dados
                    </h2>


                    {/* Campos do formulário */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="name" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Nome</label>
                        <input id="name" name="name" type="text" value={formData.name || ''} onChange={handleChange} style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '0 8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="email" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>E-mail</label>
                        <input id="email" name="email" type="email" value={formData.email || ''} onChange={handleChange} style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '0 8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="cpf" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>CPF</label>
                        <input id="cpf" name="cpf" type="text" value={formData.cpf || ''} onChange={handleChange} maxLength="14" style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '0 8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="birthdate" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Data de Nascimento</label>
                        <input id="birthdate" name="birthdate" type="date" value={formData.birthdate || ''} onChange={handleChange} style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '0 8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>

                       {/* Instituição de Ensino  */}
                        <div style={{ marginBottom: '14px' }}>
                            <label htmlFor="institution_choice" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Instituição de Ensino</label>
                            <select 
                                id="institution_choice" 
                                name="institution_choice" 
                                value={institutionChoice} 
                                onChange={handleChange}    
                                style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF', appearance: 'none' }}
                            >
                                <option value="UCB">Universidade Católica de Brasília</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        {/* Matrícula ou Nome da Instituição */}
                        <div style={{ marginBottom: '14px' }}>
                            <label htmlFor="dynamicField" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>
                                {institutionChoice === 'UCB' ? 'Matrícula' : 'Nome da Instituição'}
                            </label>
                            <input 
                                id="dynamicField" 
                                name={institutionChoice === 'UCB' ? 'registration_number' : 'institution'} 
                                type="text"
                                placeholder={institutionChoice === 'UCB' ? 'Digite sua matrícula' : 'Digite o nome da instituição'}
                                value={institutionChoice === 'UCB' ? (formData.registration_number || '') : (formData.institution || '')} 
                                onChange={handleChange}
                                style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} 
                            />
                        </div>
   
                    
                    {/* Botões de Salvar e Cancelar */}
                    <div className="w-full flex items-center justify-end gap-4 mt-8">
                        <button type="button" onClick={() => setIsEditingData(false)} className="h-[40px] px-6 py-2 bg-transparent border-2 border-gray-400 rounded-xl text-white font-bold text-base cursor-pointer hover:bg-white/10" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight:'700', backgroundColor:'#F06F37' }}>
                            Cancelar
                        </button>
                        <button type="button" onClick={handleUpdateUser} className="h-[40px] px-6 py-2 bg-[#F06F37] rounded-xl border-none text-[#FFFEFC] font-bold text-base cursor-pointer hover:bg-orange-600" style={{ fontFamily: '"all-round-gothic", sans-serif', fontWeight:'700', backgroundColor:'#F06F37' }}>
                            Salvar
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DE EDIÇÃO DE FOTO */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <button
                    className="self-end text-[#FFF2C0] text-2xl font-bold"
                    onClick={closeModal}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}
                >
                    &times; 
                </button>

                <h2 className="text-[#FFF2C0] font-bold text-xl mb-4" style={{ fontFamily: '"all-round-gothic", sans-serif' }}>Editar Foto de Perfil</h2>
                
                <div className="w-[142px] h-[142px] rounded-full overflow-hidden mb-4">
                    <img src={previewPhoto} alt="Preview da foto" className="w-full h-full object-cover" />
                </div>
                
                <input
                    type="file"
                    accept="image/*"
                    className="mb-4 w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#F06F37] file:text-white hover:file:bg-orange-600"
                    style={{ alignItems: 'center', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700 }}

                    onChange={handlePhotoChange}
                />
                
                <button
                    className="bg-[#FFFEFC]  text-white font-bold text-base rounded-xl px-6 py-2"
                    style={{ marginTop: '12px', backgroundColor: '#F06F37', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 700 }}
                    onClick={handleSavePhoto}
                >
                    Salvar Alterações
                </button>
            </Modal>
        </div>
    );
}