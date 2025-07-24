# Tecnologias usadas

Flask e Flask-cors
Bcrypt

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos

- [Python](https://www.python.org/) (versão 3.8 ou superior)

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/rodrigopuma/hackaton_infinity.git](https://github.com/rodrigopuma/hackaton_infinity.git)
    ```

2.  **Rode o Backend (servidor Flask):**

    ```bash
    # Navegue até a pasta do backend
    cd backend

    # Crie e ative um ambiente virtual (recomendado)
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate

    # Instale as dependências
    pip install -r requirements.txt

    # Inicie o servidor
    flask run
    ```

    _O servidor backend estará rodando em `http://localhost:5000`._
