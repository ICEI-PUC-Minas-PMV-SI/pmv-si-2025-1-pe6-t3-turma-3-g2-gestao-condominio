# Front-end Móvel

[Inclua uma breve descrição do projeto e seus objetivos.]

## Projeto da Interface
[Descreva o projeto da interface móvel da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]
### ✅ Casos de Teste - Serviço de Ocorrências (Mobile)

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
### 3. Visualizar Detalhes da Ocorrência (Usuário)
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
![img](imgservicoreservas/canceladar_reserva_sucesso.png)
---
### 6. Listagem de Reservas (Admin)
- **Objetivo:** Admin visualiza todas as reservas cadastradas no sistema.
- **Passos:**
  1. Login como admin
  2. Acessar a rota `/reservas`
- **Verificações:** Lista mostra todas as reservas existentes, independente do autor.
![img](imgservicoreservas/listagem_reservas_admin.png)
---

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
