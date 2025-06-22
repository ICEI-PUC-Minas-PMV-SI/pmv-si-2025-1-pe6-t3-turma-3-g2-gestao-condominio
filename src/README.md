# Instruções de utilização

## Instalação do Site

Este projeto possui três ambientes que devem ser executados separadamente:

* **Backend** (`src/backend`)
* **Frontend Web** (`src/frontend`)
* **Aplicativo Mobile** (`src/mobile`)

---

🚀 **Backend**

---

🔧 **Instalação e Execução**

1.  Acesse a pasta do backend:
    ```bash
    cd src/backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente:
   Configure o arquivo `.env` dentro da pasta `backend`.

    Exemplo de conteúdo:

    ```ini
    PORT=3000
    MYSQL_DB=condominio
    MYSQL_USER=auth
    MYSQL_PASSWORD=123456789
    MYSQL_PASSWORD=root
    MYSQL_HOST=127.0.0.1
    JWT_SECRET=chaveautenticacaoJWT
    ```
4.  Execute o backend:
    ```bash
    npm run start
    ```
🔗 O backend estará disponível em: `http://localhost:3001`

---

🌐 **Frontend Web**

---

🔧 **Instalação e Execução**

1.  Acesse a pasta do frontend:
    ```bash
    cd src/frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o frontend:
    ```bash
    npm run dev
    ```
🔗 A aplicação web estará disponível em: `http://localhost:5173` (ou na porta informada no terminal)

---

📱 **Aplicativo Mobile**

---

🔧 **Instalação e Execução**

1.  Acesse a pasta do mobile:
    ```bash
    cd src/mobile
    ```
2.  Instale as dependências:
    ```bash

    ```
3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` dentro da pasta `mobile`.

    Exemplo:

    ```ini
    API_URL=[http://10.0.2.2:3001](http://10.0.2.2:3001)
    ```
    ⚠️ **Atenção**:
    * Para emulador Android, use `10.0.2.2` para acessar o backend local.
    * Para dispositivos físicos, use o IP da sua máquina na rede local. Exemplo:
        ```ini
        API_URL=[http://192.168.0.100:3001](http://192.168.0.100:3001)
        ```
4.  Execute o projeto:
    ```bash
    npm start
    ```
5.  Execute em três opções:
    * 📱 **Dispositivo físico** (via QR Code)
    * 🖥️ **Emulador Android ou iOS**
    * 🌐 **Navegador**


## Histórico de versões

* **[0.1.0] - 22/06/2025**
    * Estrutura inicial do projeto Habitare.
    * Backend com autenticação, cadastro de usuários e gestão de condomínios.
    * Frontend web funcional para administração dos condomínios.
    * Aplicativo mobile para gestão de visitantes.
    * Layout responsivo no web e mobile.
    * Integração completa entre backend, frontend e mobile.
