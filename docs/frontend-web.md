# Front-end Web

[Inclua uma breve descrição do projeto e seus objetivos.]

## Projeto da Interface Web

[Descreva o projeto da interface Web da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

### Wireframes
![img1](imgwireframes/img1.png)
![img1](imgwireframes/img2.png)
![img1](imgwireframes/img3.png)
![img1](imgwireframes/img4.png)

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

### ✅ Casos de Teste - Serviço de Ocorrências 

### 1. Visualizar Detalhes da Ocorrência (Usuário)
- **Objetivo:** Usuário deve conseguir ver os detalhes completos de uma ocorrência que criou.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/ocorrencias`
  3. Clicar em "Detalhes" de uma ocorrência listada
- **Verificações:** Modal renderiza corretamente, exibe título, descrição.

### 2. Criar Ocorrência
- **Objetivo:** Testar criação de nova ocorrência.
- **Passos:**
  1. Login como `usuário`
  2. Ir para `/ocorrencias` clicar no botão de criar ocorrência
  3. Preencher formulário e criar
- **Verificações:** Atualiza página, toast de sucesso, nova ocorrência na lista.

### 3. Editar Ocorrência
- **Objetivo:** Usuário edita ocorrência em status "aberto".
- **Passos:**
  1. Login
  2. Acessar `/ocorrencias` clicar no icon de editar.
  3. Alterar e salvar
- **Verificações:** Dados atualizados visíveis.

### 4. Excluir Ocorrência
- **Objetivo:** Usuário deleta ocorrência criada por ele.
- **Passos:**
  1. Login
  2. Clicar no icon “Excluir” e confirmar
- **Verificações:** Toast e remoção da lista.

### 5. Tentar Editar Ocorrência com Status Não em Aberto
- **Objetivo:** Garantir que usuário não pode editar ocorrência fechada ou em andamento.
- **Passos:**
  1. Acessar `/ocorrencias` e clicar no icon de editar em uma ocorrência com status diferente de `aberto`
- **Verificações:** Toast com mensagem explicativa.

### 6. Criar Ocorrência com Campos Vazios
- **Objetivo:** Formulário deve validar campos obrigatórios.
- **Passos:**
  1. Login
  2. Acessar formulário e tentar enviar vazio
- **Verificações:** Campos com erro.

### 7. Usuário Tentando Editar Ocorrência com Status Alterado no Momento por Admin
- **Objetivo:** Simular conflito de edição entre usuário e admin.
- **Passos:**
  1. Usuário tenta editar enquanto admin muda status
- **Verificações:** Toast de erro.

### 8. Visualizar Detalhes da Ocorrência (Admin)
- **Objetivo:** Admin vê detalhes completos de qualquer ocorrência.
- **Passos:**
  1. Login como admin
  2. Acessar `/admin/ocorrencias`
- **Verificações:** Dados visíveis corretamente.

### 9. Editar Status da Ocorrência (Admin)
- **Objetivo:** Admin altera status de ocorrência.
- **Passos:**
  1. Login admin
  2. Clicar para alterar status na tabela
- **Verificações:** Status atualizado, mensagem de sucesso.

### 10. Admin Tentando Modificar Status de Ocorrência que foi Excluída
- **Objetivo:** Admin tenta mudar status de ocorrência removida.
- **Passos:**
  1. Login como admin
  2. Acessar tela de listagem, tentar mudar status e ao confirmar receber uma mensagem informativa.
- **Verificações:** Exibe mensagem “ocorrência não encontrada”.

### 11. Acessar Rotas sem Token (Usuário/Admin)
- **Objetivo:** Verificar que rotas protegidas bloqueiam acesso sem autenticação.
- **Passos:**
  1. Acessar rotas como `/ocorrencias`, `/admin/ocorrencias` sem estar logado
- **Verificações:** Usuário recebe tela sem dados e toast informativo.
  
# ✅ Casos de Teste – Tela de Reservas

## 🧪 1. Carregamento inicial
- **Descrição**: Verificar se os dados são carregados corretamente ao abrir a tela.
- **Pré-condição**: Usuário autenticado com token válido no `localStorage`.
- **Resultado esperado**: A tabela é renderizada com os dados das reservas vindos da API.

## 🧪 2. Verificação de URL correta
- **Descrição**: Verificar se a rota `/reservas` está presente na URL ao acessar a tela.
- **Pré-condição**: Navegação para a tela de reservas.
- **Resultado esperado**: A URL deve conter `/reservas`.

## 🧪 3. Verificação de permissão de admin
- **Descrição**: Verificar se o botão "CRIAR RESERVA" é exibido apenas para usuários não-admin.
- **Pré-condição**: Token com `id === 1` (admin) ou diferente de 1 (usuário comum).
- **Resultado esperado**: 
  - Se admin: botão **não** é exibido.  
  - Se usuário comum: botão **é** exibido.

## 🧪 4. Abertura do modal de criação
- **Descrição**: Verificar se o modal de criação de reserva abre ao clicar no botão "CRIAR RESERVA".
- **Pré-condição**: Usuário não-admin.
- **Resultado esperado**: ModalCriacaoReservas abre corretamente.

## 🧪 5. Criação de nova reserva
- **Descrição**: Criar uma nova reserva via modal e verificar se ela aparece na tabela.
- **Ações**: Preencher `nome`, `data` e `horário` e clicar em "Criar".
- **Resultado esperado**: 
  - Reserva criada com sucesso (chamada `createReserva`)  
  - Modal fecha  
  - Nova reserva aparece na lista
  
## 🧪 6. Abertura do modal de detalhes
- **Descrição**: Ao clicar no ícone de **informações (FaInfoCircle)**, o modal de detalhes deve abrir.
- **Resultado esperado**: ModalDetalhes mostra o `nome`, `data` e `horário` da reserva selecionada.

## 🧪 7. Edição de reserva ativa
- **Descrição**: Clicar no botão de editar (ícone FaEdit) em uma reserva com status **Ativo**.
- **Resultado esperado**: 
  - Modal de edição (`ModalEdicaoReservas`) é aberto  
  - Campos preenchidos com os dados da reserva  
  - Após edição, os dados são atualizados na tabela

## 🧪 8. Tentativa de edição de reserva inativa
- **Descrição**: Clicar em editar uma reserva **não ativa**.
- **Resultado esperado**: 
  - Modal **não** é aberto  
  - Toast de aviso exibido: _"Não é possível editar uma reserva que não está com status ativo."_

## 🧪 9. Cancelamento de reserva
- **Descrição**: Clicar no ícone de cancelar (`FaTimes`) e confirmar no modal.
- **Resultado esperado**: 
  - Modal de confirmação é aberto  
  - Após confirmação, `status` da reserva na tabela muda para `cancelado`

## 🧪 10. Fechamento dos modais
- **Descrição**: Verificar se os modais fecham corretamente ao clicar no botão de fechar (`onClose`).
- **Resultado esperado**: Todos os modais devem ser fechados corretamente sem erro.

## 🧪 11. Toasts e feedbacks visuais
- **Descrição**: Verificar se os `toasts` aparecem com estilos personalizados ao executar ações como erro, aviso, etc.
- **Resultado esperado**: 
  - Toast visível com fonte 18px e largura de 400px  
  - Posicionado no canto inferior direito


# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
