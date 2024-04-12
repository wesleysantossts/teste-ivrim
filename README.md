# Teste Prático em Node.js com TypeScript

## Como iniciar este projeto

### Docker

<details>
  <summary>Passo a Passo - Inicialização da aplicação com Docker</summary>
  <ul>
    <li>Clone o repositório na sua máquina.</li>
    <li>Na pasta <strong>back</strong> e na pasta <strong>front</strong> renomeie o arquivo <code>.env.example</code>, apagando a extensão <code>.example</code>.</li>
    <li>Caso não tenha, instale o Docker de acordo com seu sistema operacional <a href='https://docs.docker.com/engine/install/ubuntu/' target='_blank'>clicando aqui</a> e seguindo os passos.</li>
    <li>Depois instale o Docker Compose <a href='https://docs.docker.com/engine/install/ubuntu/' target='_blank'>clicando aqui</a> e seguindo os passos.</li>
    <li>Em seguida, na pasta raíz do projeto, rode o comando <code>docker compose up --build -d</code>. Este comando iniciará o Docker Compose e fará o build das etapas necessárias para que a aplicação rode localmente.</li>
  </ul>
</details>

### Etapas da inicialização

### Backend

Antes de iniciar, certifique-se de ter instalado o Docker e ter seguido todos os passos anteriores e deixar a aplicação rodando, porque o banco está persistindo nele.

<details>
  <summary>Passo a Passo - Iniciando da api</summary>
  <ul>
    <li>Na pasta <strong>back</strong>, rode o comando <code>npm install</code> para instalar as dependências.</li>
    <li>Caso ainda não tenha feito, renomeie o arquivo <code>.env.example</code>, apagando a extensão <code>.example</code>.</li>
    <li>Depois, na linha de comando, digite o comando <code>npm run dev</code> para iniciar em ambiente de desenvolvimento a aplicação na rota <code>localhost:8181</code>.</li>
    <li>Por fim, para testar a API faça uma requisição do tipo <strong>GET</strong> para a rota <code>http://localhost:8181/api/tasks</code>. Mais detalhes sobre testes serão abordados no próximo tópico.</li>
  </ul>
</details>

### Frontend

<details>
  <summary>Passo a Passo - Executar o frontend</summary>
  <ul>
    <li>Na pasta <strong>front</strong>, rode o comando <code>npm install</code> para instalar as dependências.</li>
    <li>Caso ainda não tenha feito, renomeie o arquivo <code>.env.example</code>, apagando a extensão <code>.example</code>.</li>
    <li>Depois, na linha de comando, digite o comando <code>npm run dev</code> para iniciar em ambiente de desenvolvimento a aplicação na rota <code>localhost:5173</code>.</li>
  </ul>
</details>

### Testes Unitários

#### Observação sobre os testes unitários

Se você clonar o repositório na sua máquina e tentar subir no seu sistema de versionamento com Git, ao tentar realizar o commit o sistema roda os testes unitários e faz o build do projeto localmente. Se não passar em todos os testes, você não conseguirá "commitar", nem subir para o repositório, até ajustar o backend para passar em todos os testes.

<details>
  <summary>Passo a Passo - Executar os testes</summary>
  <ul>
    <li>Com as dependências instaladas, entre na pasta <code>back</code> e rode o comando <code>npm run test</code>.</li>
  </ul>
</details>

### Teste isolado de API

Caso queira testar a API isoladamente, deixei um modelo de requisições no Postman. <a href='https://www.postman.com/wesleysantossts/workspace/testes-tcnicos/collection/19735236-12169c74-47dd-4aae-9c11-72fedee169fa?action=share&creator=19735236' target='_blank'>Veja aqui</>.

Certifique-se de ter iniciado o Docker e a API (diretório **back**).

## Descrição do Teste

### Objetivo:
O objetivo deste teste é avaliar suas habilidades como programador full stack utilizando as tecnologias Node.js, TypeScript e React.js. O teste consiste em utilizar um layout de lista de tarefas (Todo List) no formato Kanban, pré-desenvolvido em React.js, e criar o back-end em Node.js para implementar funcionalidades de adicionar, atualizar e excluir tarefas.

### Instruções:
Neste teste, você receberá um layout de front-end pré-desenvolvido em React.js que representa uma lista de tarefas no formato Kanban, com colunas para tarefas "A Fazer", "Em Progresso" e "Concluído". Sua tarefa é criar o back-end em Node.js, e implementar as funcionalidades de adicionar, editar e excluir tarefas.

### Requisitos:
- Criar uma API RESTful em Node.js com TypeScript para gerenciar as tarefas;
- Utilizar um ORM para persistir os dados no banco de dados (MySQL, PostgreSQL ou MongoDB);
- Implementar as funcionalidades de listar, adicionar, atualizar e excluir tarefas;
- Defina os seguintes campos para cada tarefa: id, título, descrição, status (A Fazer, Em Progresso ou Concluído) e data de criação;

### Front-End (React.js):
- Utilize o layout fornecido para criar uma interface de usuário onde as tarefas são exibidas no formato Kanban.
- Conecte o front-end ao back-end para realizar operações CRUD nas tarefas.
- Implemente a funcionalidade de editar tarefas, permitindo que o usuário modifique o título, descrição e status da tarefa.
- Implemente a funcionalidade de excluir tarefas.

### Critérios de Avaliação:
- Integração correta entre front-end e back-end.
- Funcionalidade completa de adicionar, editar e excluir tarefas.
- Criação de testes unitários no back-end para as funcionalidades principais, utilizando o framework Jest.
- Manipulação adequada das requisições e respostas entre as camadas front-end e back-end.
- Código limpo e organizado.
- Utilização de boas práticas de programação.

### Prazo:
Você terá até o dia 12/04/2024 - 23:59 para concluir o teste.
