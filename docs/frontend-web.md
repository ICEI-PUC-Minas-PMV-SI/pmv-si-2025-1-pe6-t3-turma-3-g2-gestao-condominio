# Front-end Web

[Inclua uma breve descrição do projeto e seus objetivos.]

## Projeto da Interface Web

[Descreva o projeto da interface Web da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

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

### ✅ Casos de Teste - Serviço de Ocorrências 

### 1. Visualizar Detalhes da Ocorrência (Usuário)
- **Objetivo:** Usuário deve conseguir ver os detalhes completos de uma ocorrência que criou.
- **Passos:**
  1. Login como `usuário`
  2. Acessar a rota `/ocorrencias`
  3. Clicar em "Detalhes" de uma ocorrência listada
- **Verificações:** Modal renderiza corretamente, exibe título, descrição.
- **Vídeo:**  
  ![Detalhes da ocorrência](front-teste-servico-ocorrencias/detalhes_ocorrencias.mp4)

### 2. Criar Ocorrência
- **Objetivo:** Testar criação de nova ocorrência.
- **Passos:**
  1. Login como `usuário`
  2. Ir para `/ocorrencias` clicar no botão de criar ocorrência
  3. Preencher formulário e criar
- **Verificações:** Atualiza página, toast de sucesso, nova ocorrência na lista.
- **Vídeo:**  
  ![Criar ocorrência](front-teste-servico-ocorrencias/create_ocorrencias.mp4)

### 3. Editar Ocorrência
- **Objetivo:** Usuário edita ocorrência em status "aberto".
- **Passos:**
  1. Login
  2. Acessar `/ocorrencias` clicar no icon de editar.
  3. Alterar e salvar
- **Verificações:** Dados atualizados visíveis.
- **Vídeo:**  
  ![Ocorrência editada](front-teste-servico-ocorrencias/update_ocorrencias.mp4)

### 4. Excluir Ocorrência
- **Objetivo:** Usuário deleta ocorrência criada por ele.
- **Passos:**
  1. Login
  2. Clicar no icon “Excluir” e confirmar
- **Verificações:** Toast e remoção da lista.
- **Vídeo:**  
  ![Ocorrência excluida](front-teste-servico-ocorrencias/excluir_ocorrencias.mp4)

### 5. Tentar Editar Ocorrência com Status Não em Aberto
- **Objetivo:** Garantir que usuário não pode editar ocorrência fechada ou em andamento.
- **Passos:**
  1. Acessar `/ocorrencias` e clicar no icon de editar em uma ocorrência com status diferente de `aberto`
- **Verificações:** Toast com mensagem explicativa.
- **Vídeo:**  
  ![Tentativa de editar ocorrência não aberta](front-teste-servico-ocorrencias/edit_status_nao_aberto_user.mp4)

### 6. Criar Ocorrência com Campos Vazios
- **Objetivo:** Formulário deve validar campos obrigatórios.
- **Passos:**
  1. Login
  2. Acessar formulário e tentar enviar vazio
- **Verificações:** Campos com erro, mensagem de validação.
- **Vídeo:**  
  ![Tentativa de criar ocorrência com campos vazios](front-teste-servico-ocorrencias/empty_fields.mp4)

### 7. Usuário Tentando Editar Ocorrência com Status Alterado no Momento por Admin
- **Objetivo:** Simular conflito de edição entre usuário e admin.
- **Passos:**
  1. Usuário tenta editar enquanto admin muda status
- **Verificações:** Toast de erro.
- **Vídeo:**  
  ![Tentativa de editar status alterado no momento por admin](front-teste-servico-ocorrencias/tentandoupdateparaocorrenciacomstatusalteradonomoment.mp4)

### 8. Visualizar Detalhes da Ocorrência (Admin)
- **Objetivo:** Admin vê detalhes completos de qualquer ocorrência.
- **Passos:**
  1. Login como admin
  2. Acessar `/admin/ocorrencias`
- **Verificações:** Dados visíveis corretamente.
- **Vídeo:**  
  ![Detalhes ocorrências admin](front-teste-servico-ocorrencias/detalhes_ocorrencias_admin.mp4)

### 9. Editar Status da Ocorrência (Admin)
- **Objetivo:** Admin altera status de ocorrência.
- **Passos:**
  1. Login admin
  2. Clicar para alterar status na tabela
- **Verificações:** Status atualizado, mensagem de sucesso.
- **Vídeo:**  
  ![Editar status com admin](front-teste-servico-ocorrencias/edit_status_admin.mp4)

### 10. Admin Tentando Modificar Status de Ocorrência que foi Excluída
- **Objetivo:** Admin tenta mudar status de ocorrência removida.
- **Passos:**
  1. Login como admin
  2. Acessar tela de listagem, tentar mudar status e ao confirmar receber uma mensagem informativa.
- **Verificações:** Exibe mensagem “ocorrência não encontrada”.
- **Vídeo:**  
  ![Tentativa de modificação de status com ocorrência excluida admin](front-teste-servico-ocorrencias/admintentandomodificarstatusquefoiexcludonomoment.mp4)

### 11. Acessar Rotas sem Token (Usuário/Admin)
- **Objetivo:** Verificar que rotas protegidas bloqueiam acesso sem autenticação.
- **Passos:**
  1. Acessar rotas como `/ocorrencias`, `/admin/ocorrencias` sem estar logado
- **Verificações:** Usuário recebe tela sem dados e toast informativo.
- **Vídeo:**  
  ![Rotas sem token](front-teste-servico-ocorrencias/rotas_sem_token.mp4)
  
[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
