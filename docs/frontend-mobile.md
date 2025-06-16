# Front-end Móvel

Este projeto consiste no desenvolvimento do aplicativo móvel do Habitare, sistema de gestão para condomínios, utilizando React Native. O objetivo principal é oferecer aos moradores uma interface intuitiva e acessível para facilitar a comunicação, reserva de espaços comuns, visualização de avisos e controle financeiro, tudo diretamente pelo celular. O app busca melhorar a experiência do usuário, trazendo mobilidade, agilidade e integração direta com o backend em Node.js, garantindo a sincronização dos dados em tempo real.

## Projeto da Interface
## Habitare - Gestão de Condomínios (Aplicativo Mobile)

O aplicativo mobile da plataforma **Habitare - Gestão de Condomínios**, desenvolvido em **React Native**, foi pensado para proporcionar uma experiência otimizada, intuitiva e prática para usuários em dispositivos móveis (iOS e Android). A proposta mantém a essência da interface web, porém, adaptada para navegação touch, com foco em acessibilidade, agilidade e praticidade no dia a dia dos moradores e administradores de condomínios.

---

## 🗺️ Estrutura de Navegação  

- Utilização do **React Navigation**, com navegação do tipo **Stack Navigator** e **Tab Navigator**, proporcionando uma experiência fluida e nativa.  
- A navegação é intuitiva, com menus para acesso rápido às principais seções:  
  - **Início (Dashboard)**  
  - **Moradores**  
  - **Reservas**  
  - **Visitantes**  
  - **Ocorrências**  
  - **Meu Perfil**  

---

## 📄 Layout das Telas  

### 🔐 Tela de Login  
- Campos de **E-mail** e **Senha**  
- Botão **Entrar**  

---

### 👥 Moradores  
- **Para Administrador:**  
  - Lista em formato de **cards roláveis** com informações: **Nome, Apartamento, Bloco, Contato**.  
  - Botão para **Criar Morador**.  
  - Ações em cada card: **Visualizar detalhes**, **Editar**, **Excluir**.  

- **Para Morador:**  
  - Tela exibe apenas os dados do próprio morador em formato de card.  

- **Modais/Telas:**  
  - **Criar Morador**  
  - **Visualizar Detalhes**  
  - **Editar Morador**  
  - **Confirmação de Exclusão**  

---

### 📅 Reservas  
- Lista de reservas em formato de **cards** com informações: **Local, Data, Status**.  
- Botão para **Criar Reserva**.  
- Ações: **Visualizar**, **Editar**, **Excluir**.  

- **Modais/Telas:**  
  - **Criar Reserva**  
  - **Detalhes da Reserva**  
  - **Editar Reserva**  
  - **Confirmar Exclusão**  

---

### 🚪 Visitantes  
- Listagem de visitantes em **cards** com: **Nome, Apartamento, Número Documento**.  
- Botão **Criar Visitante**.  
- Ações rápidas no card: **Visualizar**, **Editar**, **Excluir**.  

- **Modais/Telas:**  
  - **Criar Visitante**  
  - **Detalhes do Visitante**  
  - **Editar Visitante**  
  - **Confirmar Exclusão**  

---

### 📢 Ocorrências  
- Lista de ocorrências em **cards**: **Título, Descrição, Status**.  
- Ações disponíveis: **Visualizar**, **Editar**, **Excluir**.  
- **Admin:** Pode visualizar o  **E-mail** na lista e editar o **Status** após clicar no botão de edição do card.  

- **Modais/Telas:**  
  - **Criar Ocorrência**  
  - **Detalhes da Ocorrência**  
  - **Editar Ocorrência**  
  - **Confirmar Exclusão**  

---

## 🔁 Interações do Usuário Mobile  
- Funcionalidades de **CRUD completo** (Criar, Ler, Atualizar, Excluir) para **Moradores, Reservas, Visitantes e Ocorrências**.  
- Interface com botões para ações de adicionar, proporcionando facilidade no uso com uma mão.  
- **Ícones grandes e áreas de toque ampliadas**, otimizadas para dispositivos móveis.  
- Uso de **Bottom Sheets** e **Modal Views** ao invés de janelas pop-up, garantindo uma navegação mobile-friendly.  
- **Feedback visual** com toasts, loaders e confirmações de ação.  

---


### Wireframes
![Captura de tela 1](https://github.com/user-attachments/assets/9397dc98-5aba-459a-900f-c9f94048368e)
![Captura de tela 2](https://github.com/user-attachments/assets/a3fa6727-2a56-4b37-8e55-3b9c4e73064b)
![Captura de tela 3](https://github.com/user-attachments/assets/5e847056-6115-4e0a-a80f-be1041bb6554)
![Captura de tela 4](https://github.com/user-attachments/assets/facb52b4-5f9a-4298-b3e8-65c8dceebfe5)
![Captura de tela 5](https://github.com/user-attachments/assets/810214cc-1543-491c-9610-c3cc360982dc)

### Design Visual

- **Paleta de Cores:** Tons suaves de bege no fundo, com elementos em verde escuro, preservando a identidade visual da versão web e garantindo uma navegação confortável em telas menores.  
- **Tipografia:** Adaptação da fonte para tamanhos legíveis em dispositivos móveis, priorizando boa leitura sem poluição visual.  
- **Ícones:** Ícones interativos, intuitivos e adaptados para toque, representando ações como visualizar, editar, excluir, adicionar e status.

## Fluxo de Dados
### 🔐 1. Autenticação e Autorização

**Cadastro de Usuário**: O usuário realiza o cadastro fornecendo informações como nome, email e senha. Esses dados são enviados para o backend, onde são validados e armazenados no banco de dados.
**Login**:
 Ao efetuar o login, o usuário envia suas credenciais (email e senha) para o backend. Após validação, um token JWT é gerado e retornado ao cliente, sendo armazenado no localStorage para autenticação em requisições futuras.
**Middleware de Autenticação**: 
As rotas protegidas utilizam um middleware que verifica a presença e validade do token JWT. Caso o token seja válido, o userId é extraído e disponibilizado para as próximas operações.
**Controle de Acesso**: 
Determinadas rotas, como as de listagem de moradores e visitantes, são restritas a administradores. Isso é controlado por um middleware adicional que verifica se o userId corresponde ao de um administrador.

### 🏠 2. Módulo de Moradores

**Criação de Perfil de Morador**: 
Usuários autenticados podem criar seu perfil de morador fornecendo dados como nome, apartamento, bloco e contato. O userId é associado ao perfil para identificação futura.
**Listagem de Moradores**: 
Administradores podem listar todos os moradores, com informações detalhadas, incluindo dados do usuário associado.
**Visualização de Perfil**: 
Usuários podem visualizar seu próprio perfil de morador. Administradores têm acesso a todos os perfis.
**Atualização de Perfil**: 
Usuários podem atualizar seu perfil de morador. Administradores podem atualizar qualquer perfil.
**Exclusão de Perfil**: 
Apenas administradores podem excluir perfis de moradores.

### 🚶 3. Módulo de Visitantes

**Registro de Visitante**: 
Moradores podem registrar visitantes fornecendo informações como nome, documento e horário de visita. Esses dados são armazenados no banco de dados e associados ao userId do morador.
**Listagem de Visitantes**: 
Administradores podem listar todos os visitantes registrados, com detalhes completos. Moradores podem visualizar apenas os visitantes que eles registraram.
**Atualização de Visitante**: 
Moradores podem atualizar informações de seus próprios visitantes. Administradores podem atualizar qualquer registro de visitante.
**Exclusão de Visitante**: 
Moradores podem excluir seus próprios registros de visitantes. Administradores podem excluir qualquer registro.

###  ⚠️ 4. Módulo de Ocorrências

**Criação de Ocorrência**: 
Moradores podem registrar ocorrências fornecendo título, descrição e categoria. O status inicial é definido como "aberto".
**Listagem de Ocorrências**: 
Moradores podem visualizar todas as ocorrências que registraram. Administradores têm acesso a todas as ocorrências do sistema.
**Atualização de Ocorrência**: 
Moradores podem atualizar suas próprias ocorrências enquanto o status estiver como "aberto". Administradores podem atualizar o status de qualquer ocorrência.
**Exclusão de Ocorrência**: 
Moradores podem excluir suas próprias ocorrências. Administradores podem excluir qualquer ocorrência.

### 📆 5. Módulo de Reservas 
**Listagem de Reservas**: 
Moradores podem visualizar todas as reservas que registraram. Administradores têm acesso a todas as reservas do sistema.
**Criação de Reservas**: 
Moradores podem registrar reservas fornecendo local, data e horário. O status inicial é definido como "ativo".
**Atualização de Reservas**: 
Moradores podem atualizar suas próprias reservas enquanto o status estiver como "ativo". Administradores podem atualizar qualquer registro de reserva.
**Cancelamento de Reservas**: 
Moradores podem cancelar suas próprias reservas. Administradores podem cancelar qualquer reserva.

## Tecnologias Utilizadas

- **React Native** — Framework para desenvolvimento mobile multiplataforma (iOS e Android).
- **Expo** — Ferramenta para acelerar o desenvolvimento em React Native, com suporte a recursos nativos.
- **React Navigation** — Biblioteca para gerenciamento de navegação entre telas.
- **JWT (JSON Web Token)** — Para autenticação e controle de acesso.
- **TypeScript** — Para tipagem estática e maior segurança no código.

## Considerações de Segurança


Esta aplicação distribuída utiliza práticas modernas de segurança para proteger os dados dos usuários e controlar o acesso às funcionalidades do sistema. Abaixo estão as principais medidas aplicadas:

---

### ✅ Autenticação com JWT (JSON Web Token)

- A autenticação de usuários é realizada através de tokens JWT.
- Após o login, o servidor emite um token que é armazenado localmente no dispositivo do usuário.
- Esse token é incluído no cabeçalho de todas as requisições protegidas no formato:  
  `Authorization: Bearer <token>`.
- O servidor valida o token antes de permitir acesso às rotas protegidas.

---

### ✅ Autorização baseada em ID's

- A aplicação utiliza um sistema de autorização com base em ID's
- Existem dois perfis de usuários:
  - `admin`: pode visualizar, criar, editar e excluir usuários.
  - `usuário`: pode apenas acessar funcionalidades básicas do sistema.
- O menu "Usuários" no aplicativo é exibido somente para quem possui o papel `admin`.
- O backend reforça essa regra, garantindo que usuários comuns não possam acessar rotas de administração mesmo via requisição direta.

---

### ✅ Validação de Token

- Todas as requisições a rotas privadas requerem um token JWT válido.
- Tokens expirados ou inválidos resultam em erro 401 (Unauthorized).
- Ao receber erro de autenticação, o usuário é redirecionado para a tela de login.

---

### ✅ Proteção contra acesso não autorizado

- O backend verifica a presença e validade do token antes de responder a qualquer rota protegida.
- As permissões de cada usuário são validadas no servidor com base no token enviado.
- Requisições sem token, ou com token inválido, não conseguem acessar nem manipular dados protegidos.


## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes 
### ✅ Casos de Teste - Serviço de Ocorrências (Mobile)

**Videos testes do serviço de ocorrências (usuário)**


https://github.com/user-attachments/assets/cadea084-b8e5-4f74-99bc-4491b9ad020b


**Videos testes do serviço de ocorrências (admin)**


https://github.com/user-attachments/assets/14c720f8-917f-4f4f-966e-bff4a956c02d


### 1. Listagem de Ocorrências (Usuário)
- **Objetivo:** Usuário visualiza apenas as ocorrências criadas por ele.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/ocorrencias`
- **Verificações:** Lista exibe somente ocorrências do usuário logado.
![Listagem Usuário](testemobileocorrencias/listagemocorrenciasuser.png)
---

### 2. Visualizar Detalhes da Ocorrência (Usuário)
- **Objetivo:** Usuário deve conseguir ver os detalhes completos de uma ocorrência que criou.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/ocorrencias`
  3. Clicar em "Detalhes" de uma ocorrência listada
- **Verificações:** Tela renderiza corretamente, exibe título, descrição.
![Detalhes Ocorrência - Usuário](testemobileocorrencias/detalhesocorrenciamobile.png)
---

### 3. Criar Ocorrência
- **Objetivo:** Testar criação de nova ocorrência.
- **Passos:**
  1. Login como `usuário`
  2. Ir para `/ocorrencias/criar` clicar no botão de criar ocorrência
  3. Preencher formulário e criar
- **Verificações:** Atualiza página, toast de sucesso, nova ocorrência na lista.
![Formulário Criar](testemobileocorrencias/createocorrenciamobile.png)
![Alerta ao Criar](testemobileocorrencias/createnovaocorrenciaalert.png)
---

### 4. Editar Ocorrência
- **Objetivo:** Usuário edita ocorrência em status "aberto".
- **Passos:**
  1. Login
  2. Acessar `/ocorrencias/editar/id` clicar no icon de editar.
  3. Alterar e salvar
- **Verificações:** Dados atualizados visíveis.
![Editar Formulário](testemobileocorrencias/editarnovaocorrenciamobile.png)
![Editar Alerta](testemobileocorrencias/editarnovaocorrenciaalert.png)
---

### 5. Excluir Ocorrência
- **Objetivo:** Usuário deleta ocorrência criada por ele.
- **Passos:**
  1. Login
  2. Clicar no icon “Excluir” e confirmar
- **Verificações:** Toast e remoção da lista.

![Modal Deletar](testemobileocorrencias/modaldeletemobile.png)
![Confirmação](testemobileocorrencias/deletealertmobile.png)
---

### 6. Tentar Editar Ocorrência com Status Não em Aberto
- **Objetivo:** Garantir que usuário não pode editar ocorrência fechada ou em andamento.
- **Passos:**
  1. Acessar `/ocorrencias/editar/id` e clicar no icon de editar em uma ocorrência com status diferente de `aberto`, alterar os campos e confirmar.
- **Verificações:** Toast com mensagem explicativa.
![Editar Ocorrência Em Andamento](testemobileocorrencias/editarocorrenciaemandamentoalert.png)
---

### 7. Criar Ocorrência com Campos Vazios
- **Objetivo:** Formulário deve validar campos obrigatórios.
- **Passos:**
  1. Login
  2. Acessar formulário e tentar enviar vazio
- **Verificações:** Campos com erro.
![Criar com Erros](testemobileocorrencias/createocorrenciaemptycampo.png)
---

### 8. Listagem de Ocorrências (Admin)
- **Objetivo:** Admin visualiza todas as ocorrências cadastradas no sistema.
- **Passos:**
  1. Login como admin
  2. Acessar a rota `/ocorrenciasAdmin`
- **Verificações:** Lista mostra todas as ocorrências existentes, independente do autor.

![Listagem Admin](testemobileocorrencias/listagemocorrenciasadminmobile.png)
---

### 9. Visualizar Detalhes da Ocorrência (Admin)
- **Objetivo:** Admin vê detalhes completos de qualquer ocorrência.
- **Passos:**
  1. Login como admin
  2. Acessar `ocorrencias/detalhesadmin/id`
- **Verificações:** Dados visíveis corretamente.
![Detalhes Admin](testemobileocorrencias/detalhesocorrenciadminmobile.png)
---

### 10. Editar Status da Ocorrência (Admin)
- **Objetivo:** Admin altera status de ocorrência.
- **Passos:**
  1. Login admin
  2. Clicar para alterar status
- **Verificações:** Status atualizado, mensagem de sucesso.
![Formulário Admin](testemobileocorrencias/editocorrenciastatusmobile.png)
![Editar Status Admin](testemobileocorrencias/editocorrenciadminalert.png)


## ✅ Casos de Teste - Gerenciamento de Usuários (Mobile)

https://github.com/user-attachments/assets/f9c96687-dec6-4a6f-9b6a-9d181c3ff645

### 1. Acesso ao Menu de Usuários (Admin)
- **Objetivo:** Apenas o administrador pode visualizar e acessar o menu de "Usuários".
- **Passos:**
  1. Login como `admin`
  2. Verificar a presença do menu `Usuários`
- **Verificações:** O item "Usuários" aparece no menu apenas para administradores.
![image](https://github.com/user-attachments/assets/7a211270-ee30-492c-8f62-08896f391aeb)
![image](https://github.com/user-attachments/assets/38db5af8-273b-4d83-b4db-cb31b93ad2c6)
---

### 2. Acesso Restrito ao Menu de Usuários (Usuário Comum)
- **Objetivo:** Usuário comum **não** deve ver nem acessar o menu de "Usuários".
- **Passos:**
  1. Login como `usuário`
- **Verificações:** O item "Usuários" **não** aparece no menu.
![image](https://github.com/user-attachments/assets/eac7d5d8-d88a-4178-9be9-c2c50a6f2e89)
![image](https://github.com/user-attachments/assets/7a3b85c9-b299-407c-b005-65d614f4ea45)
---

### 3. Listagem de Usuários (Admin)
- **Objetivo:** Admin visualiza todos os usuários cadastrados.
- **Passos:**
  1. Login como `admin`
  2. Acessar o menu `Usuários`
- **Verificações:** Lista contendo id, nome, email e botão de editar/excluir.
  
![image](https://github.com/user-attachments/assets/ba587e7b-4988-4091-b8da-ef08b9000c77)
---

### 4. Criar Novo Usuário (Admin)
- **Objetivo:** Admin deve conseguir cadastrar um novo usuário.
- **Passos:**
  1. Login como `admin`
  2. Acessar `/usuarios/criarUsuario`
  3. Preencher nome, email, senha e clicar em "Salvar"
- **Verificações:**
  - Toast ou Alert de sucesso
  - Novo usuário aparece na listagem
  - Logs exibidos no console:
    ```
    Iniciando criação de usuário: { nome, email }
    Resposta da API: { message, status }
    ```
![image](https://github.com/user-attachments/assets/98eaeb59-a7d0-44f1-96ff-cc5e5e6c91f1)
![image](https://github.com/user-attachments/assets/68a2c706-129d-4e53-93be-c79faaa96168)
---

### 5. Editar Usuário (Admin)
- **Objetivo:** Admin pode editar nome, email e senha de um usuário.
- **Passos:**
  1. Login como `admin`
  2. Acessar `/usuarios`, clicar no botão de editar
  3. Atualizar dados e salvar
- **Verificações:**
  - Toast ou Alert de sucesso
  - Dados atualizados na lista
  - Logs no console:
    ```
    Iniciando edição do usuário: { id, nome, email }
    Enviando dados para API...
    Resposta da API: { ... }
    ```
![image](https://github.com/user-attachments/assets/b9ca1724-82fc-4883-89ae-1c9116076c82)
---

### 6. Excluir Usuário (Admin)
- **Objetivo:** Admin pode excluir qualquer usuário da lista.
- **Passos:**
  1. Login como `admin`
  2. Acessar `/usuarios`, clicar em "Excluir" e confirmar
- **Verificações:**
  - Toast ou Alert de sucesso
  - Usuário removido da lista
  - Logs no console:
    ```
    Excluindo usuário: ID do usuário
    Resposta da API: { message, status }
    ```
![image](https://github.com/user-attachments/assets/f5a56387-677e-4681-b926-319351ddd499)
![image](https://github.com/user-attachments/assets/265349fc-a128-4f00-a09b-cd3326aab0ff)
---

### ✅ Casos de Teste - Serviço de Reservas (Mobile)
### 1. Criar Reserva
- **Objetivo:** Testar criação de nova reserva.
- **Passos:**
  1. Login como `usuário`
  2. Ir para `/reservas/criar` clicando no botão de criar reservas
  3. Preencher formulário e criar
- **Verificações:** Atualiza página, toast de sucesso, nova reserva na lista.
![Formulário Criar](imgservicoreservas/criar_reserva.png)
![Alerta Criar](imgservicoreservas/criar_reserva_sucess.png)
---
### 2. Listagem de Reservas (Usuário)
- **Objetivo:** Usuário visualiza apenas as ocorrências criadas por ele.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/reservas`
- **Verificações:** Lista exibe somente reservas do usuário logado.
![Listagem Usuário](imgservicoreservas/listagem_reservas_usuário.png)
---
### 3. Visualizar Detalhes da Reserva (Usuário)
- **Objetivo:** Usuário deve conseguir ver os detalhes completos de uma ocorrência que criou.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/reservas`
  3. Clicar em uma reserva listada
- **Verificações:** Tela renderiza corretamente, exibe título, descrição.
![Detalhes Ocorrência - Usuário](imgservicoreservas/detalhes_reserva.png)
---
### 4. Editar Reserva
- **Objetivo:** Usuário edita reserva em status "aberto".
- **Passos:**
  1. Login
  2. Acessar `/reservas/editar/id` clicar no icon de editar.
  3. Alterar e salvar
- **Verificações:** Dados atualizados visíveis.
![Editar Formulário](imgservicoreservas/editar_reserva.png)
![Editar Alerta](imgservicoreservas/editar_reserva_sucess.png)
---
### 5. Cancelar Reserva
- **Objetivo:** Usuário cancela a reserva criada por ele.
- **Passos:**
  1. Login
  2. Clicar no icon “Cancelar” e confirmar
- **Verificações:** Toast e remoção da lista.
![img](imgservicoreservas/cancelar_reserva.png)
![img](imgservicoreservas/cancelar_reserva_sucesso.png)
---
### 6. Listagem de Reservas (Admin)
- **Objetivo:** Admin visualiza todas as reservas cadastradas no sistema.
- **Passos:**
  1. Login como admin
  2. Acessar a rota `/reservas`
- **Verificações:** Lista mostra todas as reservas existentes, independente do autor.
![img](imgservicoreservas/listagem_reservas_admin.png)
---
#### Teste telas do serviço de Reservas
https://github.com/user-attachments/assets/b54e5f91-4dc6-41b7-9f75-43433177faef

### ✅ Casos de Teste - Serviço de Moradores (Mobile)

### 1. Criar Morador
- **Objetivo:** Testar criação de novo morador.
- **Passos:**
  1. Login como `admin`
  2. Ir para `/moradores/criar`
  3. Preencher formulário e clicar em "Salvar"
- **Verificações:** Toast de sucesso, novo morador aparece em `/moradores`
![Criar Morador](imgservicomoradores/mobile_criar_morador.png)
![Criar Morador](imgservicomoradores/mobile_criar_morador_sucesso.png)
---

### 2. Listagem de Moradores (Admin)
- **Objetivo:** Admin visualiza todos os moradores cadastrados.
- **Passos:**
  1. Login como `admin`
  2. Acessar `/moradores`
- **Verificações:** Lista completa exibida com nome, bloco, apartamento, contato, e botões de editar/excluir
![Listar Moradores Admin](imgservicomoradores/mobile_listar_moradores_admin.png) 

---

### 3. Listagem de Morador (Usuário Comum)
- **Objetivo:** Usuário comum vê seu próprio perfil de morador (caso tenha criado).
- **Passos:**
  1. Login como `usuário`
  2. Acessar `/moradores`
- **Verificações:**
  - Se tiver perfil: exibe dados e botão de editar
  - Se não tiver: mostra mensagem e botão "Criar Perfil"
![Listar Usuario](imgservicomoradores/mobile_listar_moradores_user.png)
![Listar Usuario Sem Perfil](imgservicomoradores/mobile_listar_moradores_user_sem_perfil.png)
---

### 4. Editar Morador
- **Objetivo:** Testar edição de dados do morador.
- **Passos:**
  1. Login como admin ou usuário com morador criado
  2. Acessar `/moradores/editar?id=<id>`
  3. Editar campos e salvar
- **Verificações:** Toast de sucesso, dados atualizados exibidos
![Editar Morador](imgservicomoradores/mobile_editar_morador.png)
![Editar Morador](imgservicomoradores/mobile_editar_morador_sucesso.png)

---

### 5. Excluir Morador
- **Objetivo:** Admin pode excluir moradores da lista.
- **Passos:**
  1. Login como `admin`
  2. Acessar `/moradores`, clicar no ícone de excluir e confirmar
- **Verificações:** Toast de sucesso, morador removido da lista
![Excluir Morador](imgservicomoradores/mobile_excluir_morador.png) 
![Excluir Morador](imgservicomoradores/mobile_excluir_morador_sucesso.png)

---

### 6. Visualizar Detalhes do Morador
- **Objetivo:** Ver os dados completos de um morador específico
- **Passos:**
  1. Login como admin ou usuário
  2. Acessar `/moradores/detalhes?id=<id>`
- **Verificações:** Nome, apartamento, bloco e contato exibidos corretamente
![Detalhes Morador](imgservicomoradores/mobile_detalhes_morador.png)

#### Teste telas do serviço de Moradores

https://github.com/user-attachments/assets/6303a4cd-7977-46d6-bcb2-a092879a2f98



# Referências

### Microfundamentos PUC

- Microfundamento: Desenvolvimento de Aplicações Móveis

### React Native (Framework Mobile)  
- Documentação oficial do React Native:  
🔗 [https://reactnative.dev/docs](https://reactnative.dev/docs)  

### Expo (Framework para acelerar o desenvolvimento mobile)  
- Documentação oficial do Expo:  
🔗 [https://docs.expo.dev/](https://docs.expo.dev/)  

### React Navigation (Navegação no App)  
- Documentação oficial do React Navigation:  
🔗 [https://reactnavigation.org/docs/getting-started](https://reactnavigation.org/docs/getting-started)  

### Axios (Requisições HTTP)  
- Documentação do Axios:  
🔗 [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)  

### JWT (JSON Web Tokens) — Autenticação  
- Introdução ao JWT:  
🔗 [https://jwt.io/introduction/](https://jwt.io/introduction/)  
- Como usar JWT com React Native (Exemplos aplicáveis ao front-end e backend):  
🔗 [https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)  

### TypeScript
- Documentação oficial do TypeScript:  
🔗 [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)  

### Git e GitHub   
- Documentação do Git:  
🔗 [https://git-scm.com/doc](https://git-scm.com/doc)  
- Documentação do GitHub:  
🔗 [https://docs.github.com/en](https://docs.github.com/en)  

### REST API (Consumo das APIs)  
- Introdução ao REST API:  
🔗 [https://restfulapi.net/](https://restfulapi.net/)  

