# Introdução

O **Habitare - Gestão de Condomínios** é um sistema distribuído desenvolvido para otimizar a administração condominial, oferecendo funcionalidades como:
- Reservas de áreas comuns
- Registro e acompanhamento de ocorrências
- Controle de visitantes
- Canal de comunicação eficiente entre moradores e administradores

Com a crescente demanda por organização e segurança nos condomínios, a gestão manual ou descentralizada desses processos se torna um desafio, levando a problemas de desorganização, falhas na comunicação e dificuldades na administração eficiente. O **Habitare** surge como uma solução para modernizar e integrar esses processos, proporcionando mais transparência e praticidade no gerenciamento condominial.

## Problema

A administração de condomínios frequentemente enfrenta desafios como:
- Falta de um sistema unificado para reservas de espaços, registros de ocorrências e controle de visitantes.
- Uso de ferramentas desconectadas (planilhas, grupos de mensagens), resultando em perda de informação e falhas na gestão.
- Dificuldades na comunicação entre moradores e administradores.
- Impacto direto na segurança e satisfação dos moradores.

O **Habitare** resolve esses problemas ao centralizar e automatizar esses processos, melhorando a transparência e eficiência da administração.

## Objetivos

### Objetivo Geral
Desenvolver um **software distribuído** para aprimorar a gestão condominial, unificando e automatizando processos essenciais.

### Objetivos Específicos
1. Criar um sistema intuitivo para administração eficiente de reservas de áreas comuns.
2. Implementar um módulo para registro e acompanhamento de ocorrências.
3. Desenvolver um sistema de controle de visitantes para melhorar a segurança.
4. Integrar uma ferramenta de comunicação para facilitar a interação entre moradores e administração.
 
## Justificativa

A gestão ineficiente de condomínios pode gerar:
- Conflitos na utilização de espaços comuns.
- Falhas na segurança e controle de acesso.
- Dificuldades na comunicação entre moradores e administração.

O **Habitare** visa solucionar esses problemas com uma plataforma moderna e integrada, garantindo maior **transparência, eficiência e segurança** na gestão condominial.

## Público-Alvo  

O **Habitare - Gestão de Condomínios** será utilizado por diversos perfis dentro da administração condominial. A seguir, detalhamos os principais usuários, seus conhecimentos prévios e relação com a tecnologia:  

### **1. Administradores de Condomínios**  
- **Perfil:** Profissionais responsáveis pela gestão administrativa do condomínio, incluindo organização financeira, reservas de áreas comuns e comunicação com moradores.  
- **Conhecimentos prévios:** Experiência em administração e gestão de condomínios, familiaridade com planilhas, sistemas de gestão financeira e comunicação digital.  
- **Relação com a tecnologia:** Usuários intermediários, acostumados a utilizar plataformas digitais para controle financeiro e operacional.  

### **2. Síndicos e Conselheiros**  
- **Perfil:** Representantes eleitos pelos moradores, responsáveis pela tomada de decisões estratégicas do condomínio.  
- **Conhecimentos prévios:** Geralmente possuem experiência em administração e gestão condominial, mas nem sempre possuem conhecimento técnico avançado em tecnologia.  
- **Relação com a tecnologia:** Usuários variáveis, podendo ter desde pouca até alta familiaridade com sistemas de gestão.  

### **3. Moradores**  
- **Perfil:** Pessoas que residem ou possuem unidades no condomínio e precisam interagir com a administração.  
- **Conhecimentos prévios:** Diversos níveis de familiaridade com tecnologia, desde usuários básicos até avançados.  
- **Relação com a tecnologia:** A maioria utiliza smartphones e redes sociais para comunicação, mas podem ter dificuldades com sistemas mais complexos.  

### **4. Porteiros e Seguranças**  
- **Perfil:** Profissionais responsáveis pelo controle de acesso e segurança do condomínio.  
- **Conhecimentos prévios:** Experiência com rotinas de segurança, controle de entrada e saída de visitantes.  
- **Relação com a tecnologia:** Usuários básicos, necessitando de um sistema simples e intuitivo para registros e monitoramento.  

---

### **Mapa de Stakeholders**  
Abaixo estão os principais grupos envolvidos no uso do **Habitare**:  

📌 **Usuários Primários**: Administradores de condomínios, síndicos, moradores, porteiros e seguranças.  
📌 **Usuários Secundários**: Empresas terceirizadas de manutenção, visitantes e prestadores de serviço.  
📌 **Influenciadores**: Conselhos condominiais, empresas de administração predial e associações de moradores.  

---

### **Personas (Exemplo)**  
Para melhor entendimento do público-alvo, abaixo estão dois exemplos de **personas** representando os principais usuários do sistema:  

#### **🧑‍💼 João Silva - Administrador de Condomínios**  
- **Idade:** 42 anos  
- **Experiência:** 10 anos na gestão condominial  
- **Dores:** Perde muito tempo conciliando informações espalhadas em planilhas e e-mails.  
- **Objetivo:** Ter um sistema unificado que facilite o gerenciamento do condomínio.  

#### **👩 Maria Souza - Moradora**  
- **Idade:** 35 anos  
- **Ocupação:** Analista de RH  
- **Dores:** Dificuldade em saber se a área de lazer está disponível e problemas na comunicação com a administração.  
- **Objetivo:** Reservar áreas comuns facilmente pelo celular e receber notificações rápidas sobre o condomínio.  

# Especificações do Projeto

## Requisitos

### Requisitos Funcionais

| ID    | Descrição do Requisito  | Prioridade | Responsável |
|------|-----------------------------------------|----|-----|
| RF-001 | O sistema deve prover autenticação de usuários. | ALTA | Jean |
| RF-002 | O sistema deve permitir reservas de recursos. | ALTA | Guilherme |
| RF-003 | O sistema deve permitir o registro de ocorrências. | ALTA | Lívia |
| RF-004 | O sistema deve gerenciar o acesso de visitantes. | ALTA | Gabriel Rodrigues |
| RF-005 | O sistema deve permitir o cadastro de moradores. | ALTA | Gabriel Aredes |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve garantir a segurança dos dados dos usuários. |  ALTA |
|RNF-002| O sistema deve ter uma interface amigável e intuitiva. |  ALTA |
|RNF-003| O sistema deve ser responsivo para rodar em um dispositivos móvel. | MÉDIA | 
|RNF-004| Deve processar requisições do usuário em no máximo 3s. |  BAIXA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |

# Catálogo de Serviços

**1. Serviço de Autenticação**
Características e Funcionalidades:
Login: Permite que os usuários façam login no sistema fornecendo credenciais (usuário e senha).
Logout: Permite que os usuários realizem logout, invalidando suas sessões.
Controle de Sessão: Garante que o usuário esteja autenticado para realizar ações no sistema, fornecendo tokens de autenticação.
Recuperação de Senha: Oferece a funcionalidade de recuperar ou redefinir a senha caso o usuário tenha esquecido.
Segurança: Assegura que apenas usuários autenticados possam acessar os recursos e funcionalidades protegidas.

**2. Serviço de Reserva**
Características e Funcionalidades:
Criação de Reserva: Permite que os usuários criem reservas no sistema, seja para um serviço ou produto específico.
Consulta de Reservas: Permite consultar as reservas realizadas, exibindo detalhes como data, horário e status.
Edição de Reservas: Os usuários podem modificar suas reservas, caso necessário, como alterar o horário ou os detalhes da reserva.
Cancelamento de Reservas: Permite que os usuários cancelem uma reserva, garantindo que o sistema esteja sempre atualizado com as alterações feitas.
Histórico de Reservas: O serviço mantém um histórico completo de todas as reservas feitas, facilitando o rastreamento e auditoria.

**3. Serviço de Visitantes**
Características e Funcionalidades:
Registro de Visitantes: Permite registrar a entrada de novos visitantes no sistema, incluindo informações como nome, contato e horário de chegada.
Consulta de Visitantes: Permite consultar a lista de visitantes presentes no sistema, com a possibilidade de visualizar dados específicos de cada visitante.
Saída de Visitantes: Registra a saída de um visitante, atualizando o sistema com o horário de saída.
Histórico de Visitantes: Mantém um histórico detalhado de todos os visitantes que passaram pelo sistema, o que pode ser útil para auditoria ou controle.

**4. Serviço de Ocorrências**
Características e Funcionalidades:
Registro de Ocorrências: Permite registrar incidentes ou ocorrências dentro do sistema, como problemas, reclamações ou alertas.
Acompanhamento de Ocorrências: Permite acompanhar o status das ocorrências registradas, fornecendo detalhes sobre cada incidente e suas resoluções.
Resolução de Ocorrências: Após investigar ou resolver uma ocorrência, o sistema permite que a situação seja fechada e o status seja atualizado.
Histórico de Ocorrências: Mantém um histórico completo de todas as ocorrências registradas, incluindo detalhes como tipo de problema, data de registro e status de resolução.

**5. Serviço de Moradores**
Características e Funcionalidades: 
Criação de Moradores: Permite o cadastro de novos moradores no sistema, incluindo informações como nome, contato e dados pessoais. 
Consulta de Moradores: Permite consultar a lista de moradores cadastrados, exibindo detalhes como nome, apartamento vinculado e situação atual. 
Edição de Moradores: Os usuários podem modificar os dados dos moradores, como atualizar informações de contato ou corrigir dados pessoais. 
Exclusão de Moradores: Permite remover moradores do sistema quando necessário, mantendo as informações atualizadas.

# Arquitetura da Solução

O sistema é composto por dois clientes: um frontend web (desenvolvido em React.js) voltado para administradores e síndicos, e um aplicativo mobile (em React Native) destinado aos moradores.

Ambos os frontends se comunicam diretamente com um servidor monolítico backend, desenvolvido com Node.js e Express.js. Esse servidor central reúne todos os módulos da aplicação, como autenticação, reservas, visitantes, ocorrências e notificações, funcionando de forma unificada.

A autenticação é realizada por meio de JWT (JSON Web Token), garantindo segurança nas comunicações. Os dados da aplicação são armazenados em um banco de dados MySQL.

Essa estrutura monolítica simplifica a implantação, facilita o desenvolvimento e mantém a integração entre os serviços em um único ponto, promovendo eficiência e coesão no sistema.

![image](https://github.com/user-attachments/assets/18f007ab-90b0-4da6-a67c-135cfe7ef9b6)


## Tecnologias Utilizadas

- **React & React Native**: Desenvolvimento de interfaces modernas, responsivas e interativas.  
- **Node.js + Express**: Backend rápido, eficiente e escalável.  
- **MySQL**: Banco de dados relacional para armazenamento seguro e estruturado.  
- **JWT (JSON Web Token)**: Autenticação segura e confiável dos usuários.  


## Hospedagem  

- O código-fonte é versionado no GitHub, facilitando o controle de versão e a colaboração entre os desenvolvedores.
- A aplicação (frontend e backend integrados) é hospedada no Heroku, utilizando um ambiente Node.js com suporte a rotas estáticas e dinâmicas.
- O deploy é feito diretamente do repositório do GitHub para o Heroku, utilizando pipelines automatizados.

