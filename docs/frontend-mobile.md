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

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.


VISITANTES:


### 1. Listagem de Visitantes (Usuário)
- **Objetivo:** Checar se o usuário só vê os visitantes que ele mesmo cadastrou.
- **Passos:**
  1. Fazer login com um usuário normal
  2. Ir para a tela de visitantes (/visitantes)
- **Verificações:** A lista só deve mostrar os visitantes desse usuário.
[Listagem Usuário](testemobilevisitantes/listagemvisitantes.png)
---

### 2. Visualizar Detalhes de Visitantes (Usuário)
- **Objetivo:** Garantir que o usuário consegue ver os dados completos de um visitante que ele criou.
- **Passos:**
  1. Estar logado como usuario
  2. Ir pra lista de visitantes
  3. Clicar em “Detalhes” de um item.
- **Verificações:** Tela mostrando nome, documento, data da visita, etc.
[Detalhes Visitante - Usuário](testemobilevisitantes/detalhesvisitantes.png)
---

### 3.  Cadastrar novo visitante
- **Objetivo:** Testar se dá pra cadastrar um novo visitante.
- **Passos:**
  1. Login como usuário
  2. Ir em /visitantes/criar
  3. Preencher os dados e clicar pra salvar
- **Verificações:** Aparece toast de sucesso e visitante entra na lista.
[Formulário para criar](testemobilevisitantes/cadastrarvisitantes.png)

---

### 4. Editar Visitante
- **Objetivo:** Usuário consegue atualizar dados do visitante.
- **Passos:**
  1. Login
  2. Ir em /visitantes/editar/id e tocar no ícone de editar
  3. Alterar os campos e salvar
- **Verificações:** Toast de sucesso e dados atualizados na lista.
[Editar Formulário](testemobilevisitantes/editarvisitantemobile.png)


### 5. Excluir Visitante
- **Objetivo:** O usuário consegue apagar um visitante cadastrado por ele.
- **Passos:**
  1. Login
  2. Clicar no ícone de excluir e confirmar
- **Verificações:** Toast de confirmação e visitante sai da lista.

[Deletar Visitantes](testemobilevisitantes/excluirvisitantes.png)

---

### 6. Tentar Cadastrar com Campos Vazios
- **Objetivo:** Formulário não pode deixar cadastrar sem preencher tudo.
- **Passos:**
  1. Login
  2. Ir no formulário e tentar criar sem preencher
- **Verificações:** Mensagens de erro nos campos.
[Editar Ocorrência Em Andamento](testemobilevisitantes/cadastrarvisitantesempty.png)
---

### 7. Listagem de Visitantes (Admin)
- **Objetivo:** O admin vê todos os visitantes do sistema.
- **Passos:**
  1. Login como admin
  2. Acessar /visitantesAdmin
- **Verificações:** Lista com todos os visitantes cadastrados por qualquer usuário.
[Listar Visitantes Admin](testemobilevisitantes/listarvisitantesvazio.png)
---

### 8. Ver Detalhes do Visitante (Admin)
- **Objetivo:** Admin pode abrir qualquer visitante e ver os dados completos.
- **Passos:**
  1. Login como admin
  2. Acessar /visitantes/detalhesadmin/id
- **Verificações:** Detalhes do visitante renderizam corretamente.

[Lista Admin](testemobilevisitantes/listagemvisitantesadminmobile.png)
---

### 9. Alterar Status do Visitante (Admin)
- **Objetivo:** Admin altera status do visitante (ex: liberado, barrado).
- **Passos:**
  1. Login como adminClicar no botão de status e escolher novo status
- **Verificações:** Status muda e aparece toast de confirmação.
[Detalhes Admin](testemobilevisitantes/editarvisitantesadminmobile.png)
---

# Referências

1. App feito em React Native com Expo, então usamos a documentação oficial do Expo pra configurar no mobile.

2. Pra conectar com o backend, nos baseamos nos exemplos da própria documentação do fetch.

3. Algumas validações e mensagens de erro foram inspiradas em artigos no Stack Overflow, principalmente sobre como tratar resposta de API.

4. Analisamos como apps parecidos funcionam, tipo sistemas de portaria, pra ter ideia de como organizar os processos.

5. O backend foi baseado no modelo que nós já vinhamos usando no projeto, com Node, Express e Sequelize.

6. As imagens dos testes foram tiradas diretamente do app rodando no celular/emulador pra mostrar o que acontece na prática.
