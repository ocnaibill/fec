import React from 'react';

export default function EventsCard({ children, style }) {
    return (
        <div
            style={{
                width: window.innerWidth >= 768 ? '906px' : '398px', // Largura responsiva (desktop e mobile)
                height: window.innerWidth >= 768 ? '436px' : '262px', // Altura responsiva (desktop e mobile)
                borderRadius: '12px', // Border radius
                border: '2px solid #2B3722', // Contorno (stroke) interno
                backgroundColor: 'transparent', // Fundo transparente
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)', // Drop shadow
                display: 'flex', // Flex container para conteúdo interno
                alignItems: 'center', // Centraliza verticalmente o conteúdo
                justifyContent: 'center', // Centraliza horizontalmente o conteúdo
                ...style, // Permite passar estilos adicionais via props
            }}
        >
            {children}
        </div>
    );
}