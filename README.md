# Festival de Economia Criativa (FEC) 🎉

Este repositório contém o projeto completo para o **III Festival de Economia Criativa**, uma plataforma digital robusta e interativa construída com **Django** no backend e **React** no frontend. O sistema foi desenvolvido para gerenciar todos os aspectos do festival, desde a apresentação de informações até a emissão de certificados e validação de ingressos.

## 🎯 Visão Geral

O principal objetivo deste projeto é fornecer uma experiência digital completa para o Festival de Economia Criativa da Universidade Católica de Brasília. Combinamos a escalabilidade e segurança do Django com a interface de usuário dinâmica e moderna do React para criar uma plataforma eficiente e agradável para organizadores e participantes.

### 🛠️ Tecnologias Utilizadas

-   **Backend**: [Django](https://www.djangoproject.com/ "null") (Python)
    
-   **Frontend**: [React](https://reactjs.org/ "null") (JavaScript)
    
-   **Banco de Dados**: Configurável (Atualmente utilizando MySQL)
    
-   **Filas de Tarefas Assíncronas**: [Celery](https://docs.celeryq.dev/en/stable/ "null") (para emissão de certificados e outras tarefas em segundo plano)
    
-   **Broker de Mensagens**: [Redis](https://redis.io/ "null") (utilizado pelo Celery)
    
-   **Outras Ferramentas Backend**: Django REST Framework, CORS Headers
    
-   **Outras Ferramentas Frontend**: Axios, React Router, Tailwind CSS, Font Awesome Icons, Vite
    

### ✨ Funcionalidades Principais

**Backend (Django)**:

-   🚀 API RESTful completa para gerenciar todos os dados do festival: eventos, participantes, certificados, inscrições, autenticações.
    
-   🗄️ Modelos de dados robustos e eficientes integrados com banco de dados MySQL.
    
-   🛡️ Autenticação e autorização de usuários para acesso seguro à área administrativa.
    
-   📧 Emissão de **certificados digitais** personalizados em formato PDF.
    
-   ⚙️ Integração com **Celery e Redis** para processamento assíncrono de tarefas, como a geração e envio de e-mails com certificados.
    
-   🎫 Sistema de **validação de ingressos** através de códigos únicos (UUIDs) gerados para cada inscrição.
    
-   📊 Interface administrativa poderosa (Django Admin) para gerenciamento fácil do conteúdo do festival.
    

**Frontend (React)**:

-   📱 Interface de usuário **responsiva e intuitiva**, otimizada para diferentes dispositivos (desktops, tablets e smartphones).
    
-   🗺️ Exibição detalhada da **programação do festival**, incluindo horários, locais e palestrantes.
    
-   👤 Listagem e detalhes dos **convidados** e palestrantes do evento.
    
-   ✍️ Formulários de **inscrição em eventos** com validação de dados.
    
-   ✅ Página dedicada para **validação de certificados** através de um código único, permitindo que participantes e terceiros verifiquem a autenticidade dos certificados emitidos.
    
-   ℹ️ Seções informativas sobre o **festival, local e acesso**.
    
-   🎨 Design moderno e atraente com a utilização de Tailwind CSS para estilização eficiente e personalizável.



## 🧑‍💻 Criadores do Projeto

Este projeto foi desenvolvido por:

-   **Bianco Da Costa Oliveira** - [GitHub](https://github.com/ocnaibill "null")
    
-   **Jhon Wilker Rodrigues Aquino** - [GitHub](https://github.com/jhhoker "null")

- Prototipação idealizada em conjunto com [Cajuí Collab](https://cajuicollab.com.br)

