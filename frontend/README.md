# 🚀 Organiza Infinity

**Dashboard de produtividade para o Hackathon Infinity School 2025**

![Status do Projeto: Em Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)

---

## 📝 Descrição do Projeto

O **Organiza Infinity** é um dashboard web de produtividade desenvolvido como solução para o Hackathon Infinity School 2025. O objetivo principal é centralizar e otimizar as tarefas diárias dos funcionários da escola, fornecendo acesso rápido a ferramentas essenciais como planilhas pedagógicas, o portal do aluno e um calendário de tarefas interativo. Tudo isso em uma interface coesa, moderna e alinhada com a identidade visual da Infinity School.

---

## ✨ Funcionalidades Principais

* **Layout Persistente:** Menu lateral para navegação constante e intuitiva entre as seções.
* **Dashboard Central:** Visão geral com cards para acesso rápido a links externos importantes (planilhas, portais, etc.).
* **Autenticação de Usuário:** Fluxo de Login e Cadastro para acesso à plataforma.
* **Modo Escuro e Claro:** Toggle para alternar entre temas, com a preferência salva no navegador.
* **Design Responsivo:** Interface adaptável para diferentes tamanhos de tela.
* **(Em desenvolvimento) Calendário Interativo:** Para gerenciamento de tarefas, eventos e reuniões.
* **(Em desenvolvimento) Área de Anotações:** Espaço para anotações rápidas no estilo "post-it" digital.

---

## 🖥️ Telas do Projeto

*É aqui que vocês vão colocar os prints. Tire prints de cada página e adicione na pasta do projeto para linkar aqui.*

**1. Tela de Login**
*coloque o print da tela de login aqui*

**2. Tela de Cadastro**
*coloque o print da tela de cadastro aqui*

**3. Dashboard (Tema Claro)**
*coloque o print do dashboard no modo claro aqui*

**4. Dashboard (Tema Escuro)**
*coloque o print do dashboard no modo escuro aqui*

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js:** Biblioteca principal para a construção da interface de usuário.
* **Vite:** Ferramenta de build extremamente rápida para o ambiente de desenvolvimento.
* **Tailwind CSS:** Framework CSS utility-first para estilização ágil e customizável.
* **React Router DOM:** Para gerenciamento das rotas da aplicação (navegação entre páginas).
* **React Icons:** Biblioteca para utilização de ícones consistentes na interface.
* **Axios:** (ou Fetch API) para realizar as chamadas HTTP para o backend.

### Backend
* **Python:** Linguagem de programação utilizada para a lógica do servidor.
* **Flask:** Micro-framework web para a criação da API REST.

### Ferramentas e Infra
* **Git & GitHub:** Para versionamento de código e colaboração em equipe.
* **VS Code:** Editor de código principal.
* **Vercel/Netlify:** Para hospedagem e deploy do frontend.
* **Render/PythonAnywhere:** Para hospedagem e deploy do backend.

---

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [Python](https://www.python.org/) (versão 3.8 ou superior)
* Um gerenciador de pacotes como `npm` ou `yarn`.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    ```

2.  **Rode o Backend (servidor Flask):**
    ```bash
    # Navegue até a pasta do backend
    cd NOME-DA-PASTA-BACKEND

    # Crie e ative um ambiente virtual (recomendado)
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate

    # Instale as dependências
    pip install -r requirements.txt

    # Inicie o servidor
    flask run
    ```
    *O servidor backend estará rodando em `http://localhost:5000`.*

3.  **Rode o Frontend (aplicação React):**
    *Abra um novo terminal.*
    ```bash
    # Navegue até a pasta do frontend
    cd NOME-DA-PASTA-FRONTEND

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
    ```
    *A aplicação estará disponível em `http://localhost:5001` (ou a porta que você configurou).*

---

## 👨‍💻 Autores

* **Miguel Melo** - *Desenvolvedor Frontend e UI/UX*
* **Victor Vollney** - *Desenvolvedor Backend*
* **Luiz Rodrigo** - *Desenvolvedor Backend*