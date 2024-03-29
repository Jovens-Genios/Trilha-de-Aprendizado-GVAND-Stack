# Projeto 2 - Back-end sistema de recomendação de filmes.md

**Objetivo**: Criar uma API GraphQL para o sistema de recomendação de filmes

![API GraphQL](https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png)

Neste projeto você desenvolverá todo o back-end do sistema de recomendação de filmes, utilizando o Neo4j para seu banco de dados e @neo4j/graphql para a construção da API GraphQL.

O resultado final deve ficar próximo ao que é encontrado aqui: https://trilha-gvand-stack-graphql-api.vercel.app/graphql.

## Habilidades desenvolvidas

Ao fim deste projeto você terá os seguintes superpoderes, você será capaz de:

- Compreender conceitos básicos do Neo4j e seus benefícios como banco de dados em grafos.
- Aplicar algoritmos de similaridade em grafos para recomendação.
- Criar APIs GraphQL com Neo4j como banco de dados, utlizando a biblioteca @neo4j/graphql, a base da GRAND Stack.

## Funcionalidades

Funcionalidades mínimas da API:

- Nós disponíveis para CRUD: User, Director, Actor, Movie e Genre.
- CRUD de relacionamento entre User e Movie. Para salvar um rating que o usuário deu para determinado filme.
- Filmes similares a determinado filme, usando Content-Based Filtering.
- Recomendação de filmes para determinado usuário, usando Collaboritive Filtering.
- Implementar uma query com [full-text search](https://neo4j.com/docs/graphql-manual/current/type-definitions/indexes-and-constraints) e [fuzzy match](https://neo4j.com/labs/apoc/4.3/overview/apoc.text/apoc.text.fuzzyMatch) para encontrar filmes baseado na busca escrita do usuário.

## Stack e requisitos técnicos

Para este projeto é recomendado que você já saiba os fundamentos do [Neo4j](https://neo4j.com/), você pode iniciar sua jornada utilizando o [Neo4j Sandbox de Movie Recommendation](https://neo4j.com/sandbox/). Assim como também é recomendado que você entenda os [fundamentos do GraphQL](https://graphql.org/learn/).

Neste projeto, você usará as seguintes tecnologias:

- Neo4j: como banco de dados em grafo para toda a aplicação.
- Apollo Server: ferramenta consistente para GraphQL no desenvolvimento do lado do servidor.
- @neo4j/graphql: biblioteca para facilitar a criação de APIs em GraphQL + Neo4j, a base para a GRAND stack.

## Materiais e recomendações

Antes de construir a API em si, você precisa entender melhor como funciona o Neo4j. Para isso, o caminho mais fácil é você criar um [Neo4j Sandbox de Movie Recommendations](https://neo4j.com/sandbox/). A sandbox é um espaço criado pelo Neo4j na nuvem, com todos os dados que você precisa e um tutorial. Excelente para começar rápidamente!

Uma vez que você já entenda os fundamentos do Neo4j e do [GraphQL](https://graphql.org/learn/), chegou a hora de entrar na GRANDstack mais a fundo e conhecer o @neo4j/graphql. Para isso, o melhor caminho é seguir os passos da biblioteca [@neo4j/graphql](https://neo4j.com/docs/graphql-manual/current/getting-started/) e adaptar para os dados do sistema de recomendação de filmes que você está construindo.

Recomendamos que você crie uma instância local ou uma instância free do neo4j e popule o seu banco de dados a fim de se familiarizar com os conceitos de CRUD do @neo4j/graphql. Sugestão: Você pode usar o Apollo Studio para popular o banco, o Apollo Studio irá listar todos os types e todas as mutations possíveis da sua API.

### Materiais recomendados

- [Introduction to GraphQL](https://graphql.org/learn/)
- [Neo4j Sandbox](https://neo4j.com/sandbox/): use a sandbox de Movie Recommendations.
- [@neo4j/graphql](https://neo4j.com/docs/graphql-manual/current/)