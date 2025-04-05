# APIs e Web Services

O planejamento de uma aplicação de APIs Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

A API do sistema **Habitare – Gestão de Condomínios** será responsável por viabilizar a comunicação entre os módulos do sistema distribuído, garantindo que as informações fluam corretamente entre moradores, administradores, porteiros e demais usuários. Ela também permitirá futuras integrações com sistemas externos, como serviços de notificação, plataformas de pagamento e sistemas de controle de acesso.

## Objetivos da API

### Objetivo Geral
Desenvolver uma API RESTful para permitir a comunicação entre os módulos do sistema Habitare, de forma segura, escalável e eficiente.

### Objetivos Específicos
- Fornecer endpoints para gerenciamento de usuários (moradores, síndicos, administradores, porteiros).
- Permitir a criação, consulta, atualização e cancelamento de reservas de áreas comuns.
- Gerenciar o registro e o acompanhamento de ocorrências condominiais.
- Prover um canal de comunicação assíncrono entre os moradores.
- Garantir autenticação e autorização de usuários utilizando padrões JWT.


## Modelagem da Aplicação

### Entidades

O modelo de dados é composto por cinco entidades principais que representam a gestão de um condomínio:

1. **Usuários (users)**: Representa os usuários do sistema, que podem ser administradores ou moradores.
2. **Ocorrências (ocorrencias)**: Registra situações ou eventos que precisam ser documentados, como problemas ou incidentes.
3. **Reservas (reservas)**: Gerencia as reservas de espaços ou serviços disponíveis, como salões de festas ou áreas comuns.
4. **Visitantes (visitantes)**: Armazena informações sobre os visitantes que entram no condomínio.
5. **Moradores (moradores)**: Contém dados dos moradores do condomínio, como seus apartamentos e informações de contato.

![Modelo de dados](img/modelagemdados.png)


## Tecnologias Utilizadas

Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.

[Lista das tecnologias principais que serão utilizadas no projeto.]

## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

### Endpoints do Serviço de Ocorrências
### Endpoint 1: Criar Ocorrências (usuário)
- Método: POST
- URL: /api/ocorrencias
- Parâmetros:
  - titulo (string): Título da ocorrência. (Obrigatório)
  - descricao (string): Descrição detalhada da ocorrência. (Obrigatório)
- Resposta:
  - Sucesso (201 Created)
    ```
    {
      "id": 1,
      "titulo": "Título da ocorrência",
      "descricao": "Descrição da ocorrência",
      "status": "aberto",
      "userId": 123,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
    ```

### Endpoint 2: Listar Todas as Ocorrências (admin)
- Método: GET
- URL: /api/listar/ocorrencias
- Parâmetros: Nenhum.
- Resposta:
  - Sucesso (200 OK)
    ```
    [
      {
        "id": 1,
        "titulo": "Título 1",
        "descricao": "Descrição 1",
        "status": "aberto",
        "userId": 123,
        "User": {
          "id": 123,
          "name": "Nome do Usuário",
          "email": "email@example.com"
        }
      },
      ...
    ]
    ```

### Endpoint 3: Listar Ocorrências do Usuário Autenticado
- Método: GET
- URL: /api/ocorrencias
- Parâmetros: Nenhum.
- Resposta:
  - Sucesso (200 OK)
    ```
    [
      {
        "id": 1,
        "titulo": "Título 1",
        "descricao": "Descrição 1",
        "status": "aberto",
        "userId": 123
      },
      ...
    ]
    ```

### Endpoint 4: Obter Detalhes de uma Ocorrência
- Método: GET
- URL: /api/ocorrencias/:id
- Parâmetros:
  - id (path): ID da ocorrência. (Obrigatório)
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "titulo": "Título da ocorrência",
      "descricao": "Descrição da ocorrência",
      "status": "aberto",
      "userId": 123
    }
    ```
  - Erro (404 Not Found)
    ```
    {
      "message": "Ocorrência não encontrada"
    }
    ```

### Endpoint 5: Atualizar Ocorrência
- Método: PUT
- URL: /api/ocorrencias/:id
- Parâmetros:
  - id (path): ID da ocorrência. (Obrigatório)
- Body:
  - titulo (string): Novo título da ocorrência. (Obrigatório)
  - descricao (string): Nova descrição da ocorrência. (Obrigatório)
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "titulo": "Novo título",
      "descricao": "Nova descrição",
      "status": "aberto",
      "userId": 123
    }
    ```
  - Erro (403 Forbidden)
    ```
    {
      "message": "Ocorrência não está aberta para alteração."
    }
    ```

### Endpoint 6: Atualizar Status da Ocorrência (admin)
- Método: PUT
- URL: /api/ocorrencias/status/:id
- Parâmetros:
  - id (path): ID da ocorrência. (Obrigatório)
- Body:
  - status (string): Novo status da ocorrência. (Obrigatório)
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "titulo": "Título da ocorrência",
      "descricao": "Descrição da ocorrência",
      "status": "novo_status",
      "userId": 123
    }
    ```

### Endpoint 7: Deletar Ocorrência
- Método: DELETE
- URL: /api/ocorrencias/:id
- Parâmetros:
  - id (path): ID da ocorrência. (Obrigatório)
- Resposta:
  - Sucesso (200 OK): Sem corpo de resposta.
  - Erro (404 Not Found)
    ```
    {
      "message": "Ocorrência não encontrada"
    }
    ```

### Endpoints do Serviço de Reservas

### Endpoint 1: Criar Reserva (usuário)
- Método: POST
- URL: /api/reserva
- Autenticação: Token do usuário (`verifyToken`)
- Parâmetros (Body):
  - `data` (string, formato ISO 8601): Data da reserva. **Obrigatório**
  - `horaInicio` (string, formato HH:mm): Hora de início da reserva. **Obrigatório**
  - `horaFim` (string, formato HH:mm): Hora de término da reserva. **Obrigatório**
  - `descricao` (string): Descrição opcional da reserva.
- Resposta:
  - Sucesso (201 Created)
    ```
    {
      "id": 1,
      "data": "2024-04-10",
      "horaInicio": "14:00",
      "horaFim": "16:00",
      "descricao": "Reserva da sala de reunião",
      "status": "pendente",
      "userId": 123,
      "createdAt": "2024-04-01T00:00:00.000Z",
      "updatedAt": "2024-04-01T00:00:00.000Z"
    }
    ```

### Endpoint 2: Listar Todas as Reservas (admin)
- Método: GET
- URL: /api/reservas
- Autenticação: Token do administrador (`verifyToken` + `isAdmin`)
- Resposta:
  - Sucesso (200 OK)
    ```
    [
      {
        "id": 1,
        "data": "2024-04-10",
        "horaInicio": "14:00",
        "horaFim": "16:00",
        "descricao": "Reserva da sala de reunião",
        "status": "pendente",
        "userId": 123,
        "User": {
          "id": 123,
          "name": "Nome do Usuário",
          "email": "email@example.com"
        }
      }
    ]
    ```

### Endpoint 3: Obter Detalhes de uma Reserva
- Método: GET
- URL: /api/reservas/:id
- Autenticação: Token do usuário (`verifyToken`)
- Parâmetros:
  - `id` (path): ID da reserva. **Obrigatório**
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "name": "Salão de Festas",
      "data": "2024-04-10",
      "horaInicio": "14:00",
      "horaFim": "16:00",
      "status": "Ativo",
      "userId": 123
    }
    ```
  - Erro (404 Not Found)
    ```
    {
      "message": "Reserva não encontrada"
    }
    ```

### Endpoint 4: Atualizar Reserva
- Método: PUT
- URL: /api/reserva/:id
- Autenticação: Token do usuário (`verifyToken`)
- Parâmetros:
  - `id` (path): ID da reserva. **Obrigatório**
- Body:
  - `data`, `horaInicio`, `horaFim`, `descricao`: Novos dados da reserva. **Obrigatório**
- Condições:
  - Apenas reservas com status **"pendente"** podem ser alteradas pelo usuário que criou.
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "data": "2024-04-12",
      "horaInicio": "10:00",
      "horaFim": "12:00",
      "descricao": "Reserva alterada",
      "status": "ativo",
      "userId": 123
    }
    ```
  - Erro (403 Forbidden)
    ```
    {
      "message": "Reserva não está pendente para alteração."
    }
    ```

### Endpoint 5: Cancelar Reserva
- Método: DELETE
- URL: /api/reserva/:id
- Autenticação: Token do usuário (`verifyToken`)
- Parâmetros:
  - `id` (path): ID da reserva. **Obrigatório**
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "id": 1,
      "nome": "Salão de Festas",
      "data": "2024-04-05",
      "horario": "14:00",
      "status": "cancelado",
      "userId": 123
    }
    ```
  - Erro (403 Forbidden)
    ```
    {
      "message": "Você não tem permissão para cancelar esta reserva."
    }
    ```

### Endpoint 6: Histórico de Reservas do Usuário
- Método: GET
- URL: /api/reservas/historico
- Autenticação: Token do usuário (`verifyToken`)
- Resposta:
  - Sucesso (200 OK)
    ```
    [
      {
        "id": 1,
        "nome": "Salão de Festas",
        "data": "2024-04-05",
        "horario": "14:00",
        "userId": 123
      }
    ]
    ```
  - Erro (404 Not Found)
    ```
    {
      "message": "Nenhuma reserva encontrada"
    }
    ```

## Considerações de Segurança

Em aplicações distribuídas como o **Habitare – Gestão de Condomínios**, garantir a segurança da comunicação, dos dados e dos acessos é fundamental. Como diferentes módulos da aplicação interagem por meio de redes, é necessário adotar práticas robustas de segurança para proteger os usuários e o sistema.

### Autenticação
A autenticação será realizada por meio de tokens JWT (JSON Web Token), garantindo que apenas usuários autenticados possam acessar os recursos da aplicação. O processo de login irá gerar um token assinado digitalmente, que será validado em cada requisição subsequente.

### Autorização
A autorização será baseada em perfis de acesso (morador, síndico, administrador, porteiro, etc.), utilizando políticas de controle de acesso (RBAC - Role-Based Access Control). Cada endpoint da API verificará se o usuário possui permissão para realizar a operação requisitada.

### Comunicação Segura
Todo o tráfego entre os módulos da aplicação, bem como entre o frontend e backend, será realizado através de HTTPS com TLS (Transport Layer Security), garantindo confidencialidade e integridade dos dados transmitidos.

### Atualizações e Correções
O ciclo de desenvolvimento incluirá atualizações regulares de bibliotecas e dependências, além de revisões de segurança no código-fonte, com suporte a testes automatizados de vulnerabilidades.

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

### Testes de API para Ocorrências

### 1. Criar Ocorrência
- Método: POST /api/ocorrencias
- Testes:
  - ✅ Criar uma ocorrência válida
    - Enviar um título e uma descrição válidos.
    - **Esperado:** 201 Created e retorno da ocorrência criada.
    ![Criar ocorrência válida](imgservicocorrencias/createocorrencia.png)

  - ❌ Criar ocorrência sem título ou descrição
    - Enviar um corpo incompleto.
    - **Esperado:** 400 Bad Request ou erro de validação.
    ![Criar ocorrência sem título ou descrição](imgservicocorrencias/createocorrenciacamponull.png)

  - ❌ Criar ocorrência sem autenticação
    - Não enviar o token do usuário.
    - **Esperado:** 401 Unauthorized.
    ![Criar ocorrência sem autenticação](imgservicocorrencias/creatocorrenciasemtoken.png)

### 2. Listar Todas as Ocorrências
- Método: GET /listar/ocorrencias
- Testes:
  - ✅ Listar todas as ocorrências como administrador
    - Enviar token de um usuário administrador.
    - **Esperado:** 200 OK e retorno de uma lista de ocorrências.
    ![Listar ocorrências como admin](imgservicocorrencias/listarocorrenciaadmin.png)

  - ❌ Listar todas as ocorrências como usuário comum
    - Enviar token de um usuário não administrador.
    - **Esperado:** 403 Forbidden.
    ![Listar ocorrências como usuário comum](imgservicocorrencias/listarocorrenciasusercomum.png)

  - ❌ Listar todas as ocorrências sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Listar ocorrências sem autenticação](imgservicocorrencias/listarocorrenciaadminsemtoken.png)

### 3. Listar Ocorrências do Usuário Autenticado
- Método: GET /ocorrencias
- Testes:
  - ✅ Listar ocorrências do usuário logado
    - Enviar token de um usuário válido.
    - **Esperado:** 200 OK e retorno apenas das ocorrências do usuário.
    ![Listar ocorrências do usuário logado](imgservicocorrencias/getocorrenciasuser.png)

  - ❌ Listar ocorrências sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Listar ocorrências sem autenticação](imgservicocorrencias/listarocorrenciausersemtoken.png)

### 4. Obter Detalhes de uma Ocorrência
- Método: GET /ocorrencias/:id
- Testes:
  - ✅ Obter detalhes de uma ocorrência existente do usuário
    - Enviar token de um usuário e buscar uma ocorrência de sua propriedade.
    - **Esperado:** 200 OK e detalhes da ocorrência.
    ![Obter detalhes de uma ocorrência](imgservicocorrencias/listarocorrenciaunica.png)

  - ❌ Tentar acessar uma ocorrência de outro usuário
    - Enviar token de um usuário tentando acessar a ocorrência de outro usuário.
    - **Esperado:** 403 Forbidden.
    ![Acessar ocorrência de outro usuário](imgservicocorrencias/ocorrenciaoutrouser.png)

  - ❌ Tentar acessar uma ocorrência inexistente
    - Passar um ID inválido ou que não existe.
    - **Esperado:** 404 Not Found.
    ![Acessar ocorrência inexistente](imgservicocorrencias/ocorrenciainexistente.png)

  - ❌ Acessar ocorrência sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Acessar ocorrência sem autenticação](imgservicocorrencias/listarocorrenciausersemtoken.png)

### 5. Atualizar Ocorrência
- Método: PUT /ocorrencias/:id
- Testes:
  - ✅ Atualizar uma ocorrência do próprio usuário quando está aberta
    - Enviar um título e descrição novos para uma ocorrência que pertence ao usuário e está no status "aberto".
    - **Esperado:** 200 OK e ocorrência atualizada.
    ![Atualizar ocorrência válida](imgservicocorrencias/updateocorrenciauser.png)

  - ❌ Tentar atualizar uma ocorrência fechada
    - Enviar atualização para uma ocorrência com status diferente de "aberto".
    - **Esperado:** 403 Forbidden.
    ![Atualizar ocorrência fechada](imgservicocorrencias/updateocorrenciafechad.png)

  - ❌ Tentar atualizar uma ocorrência de outro usuário
    - Enviar token de um usuário tentando modificar ocorrência de outro.
    - **Esperado:** 403 Forbidden.
    ![Atualizar ocorrência de outro usuário](imgservicocorrencias/sempermissaoupdate.png)

  - ❌ Atualizar ocorrência inexistente
    - Passar um ID inválido.
    - **Esperado:** 404 Not Found.
    ![Atualizar ocorrência inexistente](imgservicocorrencias/updateocorrenciainexiste.png)

  - ❌ Atualizar ocorrência sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Atualizar ocorrência sem autenticação](imgservicocorrencias/updatesemtoken.png)

### 6. Atualizar Status da Ocorrência
- Método: PUT /ocorrencias/status/:id
- Testes:
  - ✅ Alterar status de uma ocorrência como administrador
    - Enviar um novo status para uma ocorrência.
    - **Esperado:** 200 OK e status atualizado.
    ![Alterar status como admin](imgservicocorrencias/updateocorrenciadmin.png)

  - ❌ Tentar alterar status sem ser admin
    - Enviar token de um usuário comum.
    - **Esperado:** 403 Forbidden.
    ![Alterar status sem ser admin](imgservicocorrencias/updatesemseradmin.png)

  - ❌ Alterar status de uma ocorrência inexistente
    - Passar um ID inválido.
    - **Esperado:** 404 Not Found.
    ![Alterar status de ocorrência inexistente](imgservicocorrencias/updatesemocorrenciadmin.png)

  - ❌ Alterar status sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Alterar status sem autenticação](imgservicocorrencias/updateadminsemtoken.png)

### 7. Deletar Ocorrência
- Método: DELETE /ocorrencias/:id
- Testes:
  - ✅ Deletar uma ocorrência do próprio usuário
    - Enviar token do usuário dono da ocorrência.
    - **Esperado:** 200 OK.
    ![Deletar ocorrência válida](imgservicocorrencias/deleteocorrencia.png)

  - ❌ Tentar deletar uma ocorrência de outro usuário
    - Enviar token de um usuário tentando apagar a ocorrência de outro.
    - **Esperado:** 403 Forbidden.
    ![Deletar ocorrência de outro usuário](imgservicocorrencias/deleteocorrenciaoutrouser.png)

  - ❌ Tentar deletar uma ocorrência inexistente
    - Passar um ID inválido.
    - **Esperado:** 404 Not Found.
    ![Deletar ocorrência inexistente](imgservicocorrencias/deletenotfound.png)

  - ❌ Deletar ocorrência sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Deletar ocorrência sem autenticação](imgservicocorrencias/deletesemtoken.png)

### Testes de API para Reservas

### 1. Criar Reserva
- Método: POST /api/reservas
- Testes:
  - ✅ Criar uma reserva válida
    - Enviar nome, data e horário válidos.
    - **Esperado:** 201 Created e retorno da reserva criada.
    ![Criar reserva válida](imgservicoreservas/create_reserva_valida.png)

  - ❌ Criar reserva sem nome, data ou horário
    - Enviar corpo incompleto.
    - **Esperado:** 400 Bad Request ou erro de validação.
    ![Criar reserva com campos faltando](imgservicoreservas/create_reserva_invalida.png)

  - ❌ Criar reserva sem autenticação
    - Não enviar token do usuário.
    - **Esperado:** 401 Unauthorized.
    ![Criar reserva sem autenticação](imgservicoreservas/create_reserva_sem_token.png)

### 2. Listar Todas as Reservas (Admin)
- Método: GET /api/reservas
- Testes:
  - ✅ Listar todas as reservas como administrador
    - Enviar token de usuário com perfil de administrador.
    - **Esperado:** 200 OK e retorno da lista de reservas.
    ![Listar reservas como admin](imgservicoreservas/listar_reservas_admin.png)

  - ❌ Listar todas as reservas como usuário comum
    - Enviar token de usuário não administrador.
    - **Esperado:** 403 Forbidden.
    ![Listar reservas como usuário comum](imgservicoreservas/listar_reservas_user_comum.png)

  - ❌ Listar todas as reservas sem autenticação
    - Não enviar token.
    - **Esperado:** 401 Unauthorized.
    ![Listar reservas sem autenticação](imgservicoreservas/listar_reservas_sem_token.png)

### 3. Obter Detalhes de uma Reserva
- Método: GET /reserva/:id
- Testes:
  - ✅ Obter detalhes de uma reserva do próprio usuário
    - Enviar token e buscar uma reserva de sua propriedade.
    - **Esperado:** 200 OK com detalhes da reserva.
    ![Obter detalhes de uma reserva](imgservicoreservas/detalhe_reserva_user.png)

  - ❌ Acessar reserva inexistente
    - Passar um ID inválido ou que não existe.
    - **Esperado:** 404 Not Found.
    ![Reserva inexistente](imgservicoreservas/reserva_inexistente.png)

  - ❌ Acessar reserva sem autenticação
    - Não enviar token.
    - **Esperado:** 401 Unauthorized.
    ![Acessar reserva sem token](imgservicoreservas/detalhe_reserva_sem_token.png)

### 4. Atualizar Reserva
- Método: PUT /reserva/:id
- Testes:
  - ✅ Atualizar uma reserva do próprio usuário
    - Enviar dados válidos para reserva que o usuário possui.
    - **Esperado:** 200 OK e reserva atualizada.
    ![Atualizar reserva válida](imgservicoreservas/update_reserva_valida.png)

  - ❌ Atualizar reserva de outro usuário
    - Tentar atualizar reserva que não pertence ao usuário logado.
    - **Esperado:** 403 Forbidden.
    ![Atualizar reserva de outro usuário](imgservicoreservas/update_reserva_outro_user.png)

  - ❌ Atualizar reserva sem autenticação
    - Não enviar token.
    - **Esperado:** 401 Unauthorized.
    ![Atualizar reserva sem token](imgservicoreservas/update_reserva_sem_token.png)

### 5. Cancelar Reserva
- Método: DELETE /reserva/:id
- Testes:
  - ✅ Cancelar uma reserva do próprio usuário
    - Enviar token e cancelar reserva válida do próprio usuário.
    - **Esperado:** 200 OK com status "cancelado".
    ![Cancelar reserva válida](imgservicoreservas/delete_reserva_valida.png)

  - ❌ Cancelar reserva de outro usuário
    - Tentar cancelar reserva de outro usuário.
    - **Esperado:** 403 Forbidden.
    ![Cancelar reserva de outro usuário](imgservicoreservas/delete_reserva_outro_user.png)

  - ❌ Cancelar reserva sem autenticação
    - Não enviar token.
    - **Esperado:** 401 Unauthorized.
    ![Cancelar reserva sem autenticação](imgservicoreservas/delete_reserva_sem_token.png)

### 6. Histórico de Reservas do Usuário
- Método: GET /api/reservas/historico
- Testes:
  - ✅ Listar reservas do usuário logado
    - Enviar token de um usuário válido.
    - **Esperado:** 200 OK e retorno das reservas do usuário.
    ![Histórico do usuário](imgservicoreservas/historico_reservas_user.png)

  - ❌ Listar reservas sem autenticação
    - Não enviar o token.
    - **Esperado:** 401 Unauthorized.
    ![Histórico sem autenticação](imgservicoreservas/historico_sem_token.png)

  - ❌ Nenhuma reserva encontrada
    - Usuário autenticado, mas sem histórico.
    - **Esperado:** 404 Not Found.
    ![Nenhuma reserva encontrada](imgservicoreservas/historico_vazio.png)


# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
