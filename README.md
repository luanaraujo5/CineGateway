
# CineGateway

CineGateway é uma API serverless para listagem de filmes construída usando serviços da AWS. O projeto foi projetado para demonstrar como arquitetar e implementar uma aplicação baseada em microsserviços serverless usando AWS Lambda, API Gateway e DynamoDB. Este é um projeto de aprendizado focado no uso de tecnologias serverless para criar APIs escaláveis e de baixa manutenção.

## Visão Geral do Projeto

CineGateway é uma API que permite aos usuários realizar operações relacionadas a filmes, como listar filmes e adicionar novos filmes a uma tabela no DynamoDB. O projeto utiliza vários serviços da AWS, como Lambda para executar a lógica de backend, API Gateway para roteamento e DynamoDB como banco de dados NoSQL.

## Serviços AWS Utilizados

### 1. AWS Lambda
- **Objetivo**: O AWS Lambda é usado para executar a lógica de backend da API CineGateway em um ambiente serverless. Duas funções Lambda foram criadas para este projeto:
  - **Get Movies Lambda**: Busca todos os filmes armazenados no DynamoDB.
  - **Create Movie Lambda**: Permite adicionar novos registros de filmes à tabela DynamoDB.

- **Principais Benefícios**: 
  - Não há necessidade de gerenciar servidores.
  - Escala automaticamente com base no número de solicitações recebidas.
  - Pagamento apenas pelo tempo de execução usado.

### 2. Amazon API Gateway
- **Objetivo**: O API Gateway é usado para expor as funções Lambda como endpoints RESTful que podem ser consumidos por clientes externos.
  - **/contents (GET)**: Busca todos os filmes no DynamoDB.
  - **/contents/create (POST)**: Adiciona um novo filme à tabela DynamoDB.

- **Principais Benefícios**:
  - Integração perfeita com o Lambda.
  - Gerencia toda a API, incluindo mapeamento de solicitações/respostas, segurança e limitação de taxa.
  - Serviço de API escalável que pode lidar com milhões de solicitações por segundo.

### 3. Amazon DynamoDB
- **Objetivo**: O DynamoDB é um banco de dados NoSQL totalmente gerenciado usado para armazenar registros de filmes.
  - Os dados dos filmes incluem campos como `id`, `title`, `description`, `genre` e `year`.

- **Principais Benefícios**:
  - Banco de dados NoSQL serverless e totalmente gerenciado.
  - Desempenho escalável.
  - Modelo de pagamento por uso.

### 4. AWS CloudWatch Logs
- **Objetivo**: O CloudWatch Logs é usado para monitorar, armazenar e acessar arquivos de log gerados pelas funções Lambda. Isso nos permite rastrear e depurar problemas com as execuções do Lambda.

- **Principais Benefícios**:
  - Log centralizado.
  - Fácil rastreamento de erros e métricas de desempenho.

### 5. AWS IAM (Identity and Access Management)
- **Objetivo**: O IAM é usado para definir e gerenciar permissões para os serviços da AWS. Neste projeto, papéis do IAM são usados para conceder as permissões necessárias para que as funções Lambda interajam com o DynamoDB e o CloudWatch Logs.

- **Principais Benefícios**:
  - Controle de acesso granular aos recursos da AWS.
  - Protege o acesso aos serviços da AWS usados pelo Lambda.

## Endpoints da API

### 1. **GET /contents**
- Busca todos os filmes armazenados na tabela DynamoDB.
  
  **Exemplo de Resposta**:
  ```json
  {
    "content": [
      {
        "id": "1",
        "title": "A Origem",
        "description": "Um ladrão habilidoso que rouba segredos através da tecnologia de compartilhamento de sonhos é encarregado de implantar uma ideia na mente de um CEO.",
        "genre": "Thriller",
        "year": 2010
      },
      {
        "id": "2",
        "title": "Matrix",
        "description": "Um hacker descobre a verdade sobre a realidade e luta para libertar a humanidade de um mundo simulado.",
        "genre": "Ficção Científica",
        "year": 1999
      }
    ]
  }
  ```

### 2. **POST /contents/create**
- Adiciona um novo filme à tabela DynamoDB.
  
  **Exemplo de Corpo da Requisição**:
  ```json
  {
    "title": "Novo Filme",
    "description": "Este é um exemplo de descrição de filme.",
    "genre": "Ação",
    "year": 2023
  }
  ```

  **Exemplo de Resposta**:
  ```json
  {
    "message": "Filme criado com sucesso!",
    "id": "3",
    "created_at": "2023-10-20T14:00:00Z"
  }
  ```

## Diagrama de Arquitetura

O diagrama abaixo mostra a arquitetura detalhada do CineGateway, incluindo todos os serviços AWS envolvidos:

![Arquitetura CineGateway](/detailed_movie_api_architecture.png)

Este diagrama fornece uma visão geral visual de como as funções Lambda interagem com o API Gateway e o DynamoDB, além de outros serviços da AWS, como o CloudWatch Logs e o IAM.

## Como Executar Localmente

1. Clone o repositório.
2. Certifique-se de que o AWS CLI está configurado com as credenciais necessárias.
3. Use `npm install` para instalar as dependências.
4. Use o comando `zip` para empacotar as funções Lambda e implantá-las usando o console da AWS Lambda ou o AWS CLI.
5. Configure o API Gateway e vincule os endpoints às suas funções Lambda.

## Objetivos de Aprendizado

- Entender como construir uma aplicação serverless usando serviços AWS.
- Aprender a usar Lambda, API Gateway e DynamoDB juntos para criar APIs escaláveis.
- Ganhar experiência na gestão de microsserviços serverless e implantações.

## Próximos Passos / Melhorias Futuras

- Adicionar autenticação e autorização para proteger a API.
- Implementar paginação para a listagem de filmes.
- Adicionar capacidades de busca e filtragem ao endpoint GET.
- Otimizar a função Lambda para melhorar o desempenho.
- Adicionar um pipeline CI/CD usando GitHub Actions ou AWS CodePipeline para implantação contínua.

---

**Autor**: Luan Araujo  
**Licença**: MIT  
