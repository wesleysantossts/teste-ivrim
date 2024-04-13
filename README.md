# Teste Prático em Node.js com TypeScript

<div style='width: 100%; height: auto; display: flex; align-items: center; justify-content: center'>
  <img src='https://interviewtests-wesley.s3.amazonaws.com/ivrim/front-teste-ivrim.png' style='width: 80%; height: auto'>
</div>

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
    <li>Depois, vá ao navegagor e entre na rota <code>localhost:3000</code> para acessar a aplicação.</li>
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

Caso queira testar a API isoladamente, deixei um modelo de requisições no Postman. <a href='https://www.postman.com/wesleysantossts/workspace/testes-tcnicos/collection/19735236-12169c74-47dd-4aae-9c11-72fedee169fa?action=share&creator=19735236' target='_blank'>Veja aqui</a>.

Certifique-se de ter iniciado o Docker e a API (diretório **back**).

### Rotas

#### GET /tasks

Essa rota retorna a listagem de todas as tarefas.

Retorna:
<pre>
{
  "data": [
    {
      "id": 2,
      "titulo": "asfasf",
      "descricao": "adfsfa",
      "status": "em progresso",
      "criadoEm": "2024-04-12T21:45:53.797Z"
    },
    {
      "id": 3,
      "titulo": "asfdafs",
      "descricao": "adfasfdf",
      "status": "em progresso",
      "criadoEm": "2024-04-12T21:45:59.959Z"
    }
  ]
}
</pre>

#### GET /task/:id

Retorna uma tarefa específica pelo id.

Retorna:
<pre>
{
  "data": {
    "id": 2,
    "titulo": "asfasf",
    "descricao": "adfsfa",
    "status": "em progresso",
    "criadoEm": "2024-04-12T21:45:53.797Z"
  }
}
</pre>

#### POST /task

Cria um registro de uma nova tarefa. Essa rota espera um titulo, uma descrição e um status ("a fazer", "em progresso" ou "concluido").

Espera:
<pre>
{
  "titulo": "Apagar",
  "descricao": "Atualizar o banco ao deslizar para outro status",
  "status": "em progresso"
}
</pre>

Retorna:
<pre>
{
  "data": {
    "id": 1,
    "titulo": "Apagar",
    "descricao": "Atualizar o banco ao deslizar para outro status",
    "status": "em progresso",
    "criadoEm": "2024-04-12T15:35:06.098Z"
  }
}
</pre>

#### PUT /task/:id

Atualiza uma tarefa. Essa rota espera um titulo, uma descrição e um status ("a fazer", "em progresso" ou "concluido").

Espera:
<pre>
{
  "titulo": "Apagar",
  "descricao": "Atualizar o banco ao deslizar para outro status",
  "status": "em progresso"
}
</pre>

Retorna:
<pre>
{
  "data": {
    "id": 14,
    "titulo": "Teste agora a atualização",
    "descricao": "Teste de update",
    "status": "em progresso",
    "criadoEm": "2024-04-12T23:32:39.313Z"
  }
}
</pre>

#### DELETE /task/:id

Exclui uma tarefa pelo id.

Retorna:
<pre>
{
  "data": true
}
</pre>

## Telas

<div style='width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px'>
  <img src='https://interviewtests-wesley.s3.amazonaws.com/ivrim/front-teste-ivrim.png' style='width: 80%; height: auto; margin-bottom: 8px'>
  <small>Início com cards</small>
</div>
<div style='width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px'>
  <img src='https://interviewtests-wesley.s3.amazonaws.com/ivrim/front-teste-ivrim2.png' style='width: 80%; height: auto; margin-bottom: 8px'>
  <small>Modal de nova tarefa</small>
</div>
<div style='width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px'>
  <img src='https://interviewtests-wesley.s3.amazonaws.com/ivrim/front-teste-ivrim3.png' style='width: 80%; height: auto; margin-bottom: 8px'>
  <small>Modal para editar uma tarefa</small>
</div>
<div style='width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px'>
  <img src='https://interviewtests-wesley.s3.amazonaws.com/ivrim/front-teste-ivrim4.png' style='width: 80%; height: auto; margin-bottom: 8px'>
  <small>Notificação</small>
</div>

## Requisitos do Teste

Os requisitos do teste estão todos no repositório do <a href='https://github.com/matthewsbrandan/test-to-do-ivrim/tree/main' target='_blank'>matthewsbrandan (clique aqui)</a>.

## Tecnologias utilizadas

- [x] Typescript 
- [x] Javascript 
- [x] Node.js 
- [x] Postgres 
- [x] PrismaORM 
- [x] Express 
- [x] Docker 
- [x] Jest 
- [x] Git 
- [x] Husky 

## Desenvolvimento

<table>
  <tr>
    <td style='border=1px solid #ddd; align="center'>
      <a href="https://github.com/wesleysantossts">
        <img src="https://avatars.githubusercontent.com/u/56703526?v=4" width="100px" alt="Wesley Santos"/>
        <br/>
        <sub>Wesley Santos</sub>
      </a>
    </td>
  </tr>
</table>