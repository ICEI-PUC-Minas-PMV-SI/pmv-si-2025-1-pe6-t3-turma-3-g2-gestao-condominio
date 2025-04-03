# APIs e Web Services

O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

Aqui estão algumas etapas importantes que devem ser consideradas no planejamento de uma aplicação de APIS Web.

[Inclua uma breve descrição do projeto.]

## Objetivos da API

O primeiro passo é definir os objetivos da sua API. O que você espera alcançar com ela? Você quer que ela seja usada por clientes externos ou apenas por aplicações internas? Quais são os recursos que a API deve fornecer?

[Inclua os objetivos da sua api.]


## Modelagem da Aplicação
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]


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

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
