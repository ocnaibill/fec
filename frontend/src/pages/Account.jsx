import React, { useState } from 'react';
import fundo2 from '../assets/images/fundo2_fec.svg';
import usuarioSemFoto from '../assets/images/usuarioSemFoto.svg';
import AccountCard from '../components/AccountCard';

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
    const user = {
        name: 'Nome Sobrenome',
        photo: null, 
    };

    const [selectedOption, setSelectedOption] = useState('meusEventos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(user.photo || usuarioSemFoto); 
    const [isEditingData, setIsEditingData] = useState(false); 
    const [institution, setInstitution] = useState('UCB');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setPreviewPhoto(user.photo || usuarioSemFoto); 
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewPhoto(e.target.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); 
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.charAt(10));
    };

    const [cpf, setCpf] = useState('');

    const cpfMask = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
            .replace(/(-\d{2})\d+?$/, '$1'); 
    };

    // Dados de exemplo
    const events = [
        { title: 'Palestra 1', date: '21/06/2025', time: '10:00', location: 'Auditório A' },
        { title: 'Oficina 2', date: '22/06/2025', time: '14:00', location: 'Sala B' },
    ];
    const certificates = [
        { title: 'Certificado Palestra 1', date: '21/06/2025', time: '10:00', location: 'Auditório A' },
    ];

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-start pt-[50px] bg-cover bg-center"
            style={{ backgroundImage: `url(${fundo2})` }}
        >
            {!isEditingData ? (
                <>
                    <div className="w-[142px] h-[142px] rounded-full overflow-hidden mb-3">
                        <img
                            src={user.photo || usuarioSemFoto}
                            alt="Foto do usuário"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-[#2B3722] text-center" style={{ fontFamily: '"all-round-gothic", sans-serif' }}>
                        {user.name}
                    </h1>


                    {/* SEUS BOTÕES E OPÇÕES, EXATAMENTE COMO VOCÊ PEDIU */}
                    <div className="user-buttons" style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                        <button className="meus-dados-button" style={{ width: '160px', height: '40px', backgroundColor: '#F06F37', borderRadius: '12px', border: 'none', color: '#FFFEFC', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }} onClick={() => setIsEditingData(true)}>
                            Meus Dados
                        </button>
                        <button className="editar-foto-button" style={{ width: '160px', height: '40px', backgroundColor: '#F06F37', borderRadius: '12px', border: 'none', color: '#FFFEFC', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }} onClick={openModal}>
                            Editar Foto
                        </button>
                    </div>

                    <div className="user-options" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                        <button onClick={() => setSelectedOption('meusEventos')} style={{ fontSize: '16px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#2B3722', background: 'none', border: 'none', cursor: 'pointer', borderBottom: selectedOption === 'meusEventos' ? '3px solid #2B3722' : 'none', borderRadius: 0 }}>
                            Meus eventos
                        </button>
                        <button onClick={() => setSelectedOption('certificados')} style={{ fontSize: '16px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#2B3722', background: 'none', border: 'none', cursor: 'pointer', borderBottom: selectedOption === 'certificados' ? '3px solid #2B3722' : 'none', borderRadius: 0 }}>
                            Certificados
                        </button>
                    </div>

                    {/* Lista de eventos ou certificados */}
                    <div className="mt-6 w-full flex flex-col items-center gap-4 mb-8">
                        {(selectedOption === 'meusEventos' ? events : certificates).map((item, index) => (
                            <AccountCard
                                key={index}
                                title={item.title}
                                date={item.date}
                                time={item.time}
                                location={item.location}
                                isCertificate={selectedOption === 'certificados'}
                            />
                        ))}
                    </div>
                </>
            ) : (
                     // --- MODO DE EDIÇÃO (com seu formulário completo restaurado) ---
                <div className="edit-data-container" style={{ width: 'calc(100% - 16px)', maxWidth: '400px', backgroundColor: '#2B3722', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
                    <h2 className="text-center" style={{ fontSize: '24px', fontFamily: '"all-round-gothic", sans-serif', fontWeight: 'bold', color: '#FFF1BF', textAlign: 'center', marginBottom: '24px' }}>
                        Editar Dados
                    </h2>
                    {/* Campos do formulário */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="name" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Nome</label>
                        <input id="name" type="text" placeholder="Beatriz Caju"style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="email" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>E-mail</label>
                        <input id="email" type="email" placeholder="email@festival.com" style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} />
                    </div>

                    {/* CPF */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="cpf" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>CPF</label>
                        <input 
                            id="cpf" 
                            type="text" 
                            value={cpf}
                            onChange={(e) => setCpf(cpfMask(e.target.value))}
                            onBlur={(e) => {
                                if (e.target.value && !validateCPF(e.target.value)) {
                                    alert('CPF inválido!');
                                }
                            }}
                            placeholder="000.000.000-00"
                            maxLength="14"
                            style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} 
                        />
                    </div>                  
                    
                    {/* Data de Nascimento */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="birthdate" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Data de Nascimento</label>
                        <input 
                            id="birthdate" 
                            type="date" 
                            style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} 
                        />
                    </div>

                    {/* Instituição de Ensino */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="institution" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>Instituição de Ensino</label>
                        <select 
                            id="institution" 
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF', appearance: 'none' }}
                        >
                            <option value="UCB">Universidade Católica de Brasília</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    {/* Matrícula ou Nome da Instituição */}
                    <div style={{ marginBottom: '14px' }}>
                        <label htmlFor="dynamicField" style={{ fontSize: '18px', fontFamily: '"quicksand", sans-serif', fontWeight: 'bold', color: '#FFF1BF', marginLeft: '4px', marginBottom: '4px', display: 'block' }}>
                            {institution === 'UCB' ? 'Matrícula' : 'Nome da Instituição'}
                        </label>
                        <input 
                            id="dynamicField" 
                            type="text"
                            placeholder={institution === 'UCB' ? 'Digite sua matrícula' : 'Digite o nome da instituição'}
                            style={{ width: '100%', height: '50px', borderRadius: '12px', border: '2px solid #2F2F2F', padding: '8px', fontSize: '16px', fontFamily: '"quicksand", sans-serif', color: '#2F2F2F', backgroundColor: '#FFF1BF' }} 
                        />
                    </div>

                {/* Container para os botões de ação do formulário */}
                <div className="w-full flex items-center justify-center gap-4 mt-8">
                    
                    {/* Botão Cancelar */}
                    <button
                        type="button"
                        onClick={() => setIsEditingData(false)}
                        className="h-[40px] px-6 py-2 bg-transparent border-2 border-[#F06F37] rounded-xl text-[#FFFEFC] font-bold text-base cursor-pointer hover:bg-white/10"
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 700,
                            backgroundColor: '#F06F37',
                        }}
                    >
                        Cancelar
                    </button>

                    {/* Botão Salvar*/}
                    <button
                        type="button"
                        onClick={() => setIsEditingData(false)} // No futuro, aqui iria a função de salvar os dados
                        className="h-[40px] px-6 py-2 bg-[#F06F37] rounded-xl border-none text-[#FFFEFC] font-bold text-base cursor-pointer hover:bg-orange-600"
                        style={{
                            fontFamily: '"all-round-gothic", sans-serif',
                            fontWeight: 700,
                            backgroundColor: '#F06F37',
                        }}
                    >
                        Salvar
                    </button>
                </div>
                </div>
            )}

            {/* --- CHAMADA PARA O MODAL DE EDIÇÃO DE FOTO --- */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <button
                    className="self-end text-[#FFF2C0] text-2xl font-bold"
                    onClick={closeModal}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}
                >
                    &times; {/* Um 'X' mais elegante */}
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
                    onClick={closeModal} // Aqui viria a lógica para salvar a foto
                >
                    Salvar Alterações
                </button>
            </Modal>
        </div>
    );
}