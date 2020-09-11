# Projeto 1 - Front-end sistema de recomendações de filmes.md

**Objetivo**: Criar uma plataforma de recomendação de filmes baseado nos gostos dos usuários.

![Movielens](https://movielens.org/images/site/main-screen.png)  

Neste projeto você desenvolverá uma plataforma de recomendação de filmes. O principal benchmark é o [Movielens](https://movielens.org).

## Habilidades desenvolvidas

Ao fim deste projeto você terá os seguintes superpoderes, você será capaz de:
* Compreender os principais conceitos do GraphQL e seus benefícios.
* Utilizar Vue Apollo para consumir dados de APIs em GraphQL.
* Utilizar Vue Apollo como store de dados e gerenciador de cache no front-end.
* Criar aplicações front-end, utilizando Vue Apollo para interagir com APIs em GraphQL.

## Funcionalidades

Funcionalidades mínimas da plataforma:
* Usuário pode criar uma conta e gerenciar seus dados (update e delete) pelo seu perfil. Não precisa implementar autenticação, apenas uma forma do usuário logar sem senha e o sistema identificar que é esse usuário.
* Usuário pode avaliar filmes com rating de 1 a 5. Ele pode alterar esses ratings a qualquer momento.
* Sistema recomenda filmes para o usuário baseado em seus ratings. 
* Usuário pode navegar pelos filmes da plataforma, segmentados por gênero.
* Usuário pode buscar filmes na plataforma usando um campo de busca.
* Na página de detalhes de cada filme, ter informações sobre aquele filme, além de mostrar filmes similares aquele.

## Stack e requisitos técnicos

Para este projeto é recomendado que você já saiba os fundamentos de [Vue.js](https://vuejs.org/), assim como já ter conhecimento das bibliotecas Vuetify e Vue Router, se você ainda não tem esses conhecimentos, veja a [Trilha de Aprendizado Vue.js](https://github.com/Jovens-Genios/Trilha-de-Aprendizado-Vue.js). Assim como também é recomendado que você tenha entenda os [fundamentos do GraphQL](https://graphql.org/learn/).

Neste projeto, você usará as seguintes tecnologias:
* Vue.js: para a construção da lógica no front-end.
* Vuetify: como biblioteca de componentes CSS.
* Vue Router: para dar componamento de rotemaneto na sua SPA.
* Vue Apollo: implementação do Apollo Client para Vue.js, para consumir dados da API GraphQL e fazer gerenciamento de cache no front-end.

## Como consumir dados da API GraphQL

A [API GraphQL](https://trilha-de-aprendizado-gvand.herokuapp.com/graphql) está disponível no link: https://trilha-de-aprendizado-gvand.herokuapp.com/graphql. Por lá você encontrará um playground e documentação da API para poder entender melhor como interagir com os dados disponíveis. Você deve usar esse mesmo link nas configurações do Vue Apollo no front-end.

O grafo e estrutura dos dados está representado no diagrama abaixo:
![Grafo](http://guides.neo4j.com/sandbox/recommendations/img/datamodel.png)  

Para receber os filmes recomendados para determinado usuário, você consegue acessar como uma propriedade do objeto User da seguinte forma:
```
query{
  User(filter:{name_contains: "Fernando"}){
    recommendedMovies{
      title
    }
  }
}
```

Para receber os filmes similares a determinado filme, você consegue acessar como uma propriedade do objeto Movie da seguinte forma:
```
query{
  Movie (title: "Toy Story"){
    similarMovies{
      title
    }
  }
}
```

## Materiais e recomendações

**Divida seu projeto em entregáveis!** Ou seja, você deve dividir seu projeto em partes menores, mais fáceis de gerenciar e finalizar, como por exemplo: "Pesquisa por filmes". Isso facilita o andamento do projeto e previne que você se perca no que fazer. Você pode utilizar o [Trello](https://trello.com/) para isso ou, se você gosta de matar algumas árvores, em papel mesmo. Crie 3 colunas: "A fazer", "fazendo" e "feito", onde você gerenciará esses entregáveis durante o fluxo do projeto.

Além disso, crie um repositório no Github para este projeto, com boa documentação. Se você ainda não sabe como utilizar o Git para fazer controle de versão no seu código, esta é uma boa [Introdução ao Git](https://blog.dankicode.com/introducao-ao-git-e-github/).

### Materiais recomendados

* [Introduction to GraphQL](https://graphql.org/learn/)
* [Vue Apollo](https://apollo.vuejs.org/)
